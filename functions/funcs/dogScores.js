const functions = require('firebase-functions');
const admin = require('firebase-admin');

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
		10: 11,
		'10+': 10,
		upc: 2
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
