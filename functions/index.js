const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.fillOutUsersProfile = functions.auth.user().onCreate(user => {
	const db = admin.firestore();

	// const names = user.displayName.split(' ');
	// const firstName = names[0] || null;
	// const lastName = names[names.length - 1] || null;
	const email = user.email || null;
	const photoUrl = user.photoUrl || null;

	db.collection('profiles')
		.doc(user.uid)
		.set({
			// firstName,
			// lastName,
			email,
			photoUrl
		});
});

exports.updateDogLeagues = functions.firestore
	.document('leagues/{leagueId}')
	.onUpdate((change, context) => {
		const originalData = change.before.data();
		const newData = change.after.data();

		//Something probably went wrong...
		if (!originalData || !newData) return { error: 'noData' };

		const leagueId = context.params.leagueId;
		const originalDogs = originalData.dogs || {};
		const newDogs = newData.dogs || {};

		const originalDogEntries = Object.entries(originalDogs);
		const newDogEntries = Object.entries(newDogs);

		console.log('original dogs', originalDogEntries);
		console.log('new dogs', newDogEntries);

		const originalDogIds = new Set(originalDogEntries.map(([id]) => id));
		const newDogIds = new Set(newDogEntries.map(([id]) => id));

		//Added dogs are dogs which ARE in new dogs, but are not in original dogs
		const addedDogs = newDogEntries.filter(
			([id]) => !originalDogIds.has(id)
		);

		//Removed dogs are dogs which ARE in original dogs, but are not in new dogs.
		const removedDogs = originalDogEntries.filter(
			([id]) => !newDogIds.has(id)
		);

		const db = admin.firestore();

		addedDogs.forEach(([id, data]) => {
			const doc = db.collection('dogs').doc(id);
			//Set their initial points to 0 so they appear in the league right away
			data.points = 0;
			doc.update({
				leagues: {
					[leagueId]: data
				}
			});
		});

		removedDogs.forEach(([id]) => {
			const doc = db.collection('dogs').doc(id);

			const leagues = doc.update({
				[`leagues.${leagueId}`]: admin.firestore.FieldValue.delete()
			});
		});

		return {
			added: addedDogs.length,
			removed: removedDogs.length
		};
	});

function convertPlaceToPoints(place) {
	const pointsMap = {
		1: 20,
		2: 19,
		3: 18,
		4: 17,
		5: 16,
		6: 15,
		7: 14,
		8: 13,
		9: 12,
		10: 11
	};

	// any valid place gets 10 points minimum
	return pointsMap[place] || 10;
}

function recalculateScore(league, dogSnap) {
	//run through all of the logged points scores and generate a new score for the user
	const runs = dogSnap.get(`leagues.${league}.runs`);
	return Object.values(runs).reduce((prev, { points }) => {
		return (prev += points);
	}, 0);
}

exports.dogScoreAdded = functions.firestore
	.document('dogs/{dogId}/runs/{runId}')
	.onCreate(async (snap, context) => {
		//Get dog doc
		const { dogId, runId } = context.params;
		const dog = admin
			.firestore()
			.collection('dogs')
			.doc(dogId);

		//Add 'runs' object to the specific league entry in users profile, e.g. leagues.2019.runs
		const runData = snap.data();

		const { league } = runData;
		const newPoints = convertPlaceToPoints(runData.place);

		//Add a prop in the runs object of [run.id]: points
		await dog.update({
			[`leagues.${league}.runs.${runId}`]: {
				points: newPoints,
				id: runId,
				place: runData.place
			}
		});

		const dogSnap = await dog.get();
		// const dogData = dogSnap.data();

		//Add the points score for this run to their total
		const recalculatedScore = recalculateScore(league, dogSnap);
		return dog.update({
			[`leagues.${league}.points`]: recalculatedScore
		});
	});

exports.dogScoreUpdated = functions.firestore
	.document('dogs/{dogId}/runs/{runId}')
	.onUpdate(async (change, context) => {
		const { dogId, runId } = context.params;
		const dog = admin
			.firestore()
			.collection('dogs')
			.doc(dogId);

		const runData = change.after.data();
		const { league } = runData;

		//Update the points for this run in the dogs league point score
		const newPoints = convertPlaceToPoints(runData.place);

		await dog.update({
			[`leagues.${league}.runs.${runId}`]: {
				points: newPoints,
				id: runId,
				place: runData.place
			}
		});

		const dogSnap = await dog.get();

		const recalculatedScore = recalculateScore(league, dogSnap);

		return dog.update({
			[`leagues.${league}.points`]: recalculatedScore
		});
	});

exports.dogScoreDeleted = functions.firestore
	.document('dogs/{dogId}/runs/{runId}')
	.onDelete(async (snap, context) => {
		const { dogId, runId } = context.params;
		const dog = admin
			.firestore()
			.collection('dogs')
			.doc(dogId);

		const runData = snap.data();

		const { league } = runData;

		//Remove the run from the runs object
		await dog.update({
			[`leagues.${league}.runs.${runId}`]: admin.firestore.FieldValue.delete()
		});

		const dogSnap = await dog.get();
		const recalculatedScore = recalculateScore(league, dogSnap);

		return dog.update({
			[`leagues.${league}.points`]: recalculatedScore
		});
	});
