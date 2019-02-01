const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.fillOutUsersProfile = functions.auth.user().onCreate((user) => {
	const db = admin.firestore();

	const names = user.displayName.split(' ');
	const firstName = names[0] || null;
	const lastName = names[names.length - 1] || null;
	const email = user.email || null;
	const photoUrl = user.photoUrl || null;

	db.collection('profiles')
		.doc(user.uid)
		.set({
			firstName,
			lastName,
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
			doc.update({
				leagues: {
					[leagueId]: data
				}
			});
		});

		removedDogs.forEach(([id]) => {
			const doc = db.collection('dogs').doc(id);

			const leagues = 
//TODO: James, this is where you were last!
			doc.update([
				`leagues.${leagueId}`: admin.firestore.FieldValue.delete()
			]);
		});

		return {
			added: addedDogs.length,
			removed: removedDogs.length
		};
	});
