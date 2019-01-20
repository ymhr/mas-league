const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!');
});

// exports.createUserProfileDocument = functions.auth.user().onCreate((user) => {
// 	const db = admin.firestore();
// 	db.collection('profiles')
// 		.doc(user.uid)
// 		.set({});
// });

exports.updateDogLeagues = functions.firestore
	.document('leagues/{leagueId}')
	.onUpdate((change, context) => {
		const originalData = change.before.data();
		const newData = change.after.data();

		//Something probably went wrong...
		if (!originalData || !newData) return;

		const leagueId = context.params.leagueId;
		const originalDogs = originalData.dogs || {};
		const newDogs = newData.dogs || {};

		const originalDogIds = new Set(Object.keys(originalDogs));
		const newDogIds = new Set(Object.keys(newDogs));

		//Added dogs are dogs which ARE in new dogs, but are not in original dogs
		const addedDogs = [...newDogIds].filter(d => !originalDogIds.has(d));

		//Removed dogs are dogs which ARE in original dogs, but are not in new dogs.
		const removedDogs = [...originalDogIds].filter(d => !newDogIds.has(d));

		const db = admin.firestore();

		addedDogs.forEach(id => {
			const doc = db.collection('dogs').doc(id);
			doc.update({
				leagues: admin.firestore.FieldValue.arrayUnion(leagueId)
			});
		});

		removedDogs.forEach(id => {
			const doc = db.collection('dogs').doc(id);
			doc.update({
				leagues: admin.firestore.FieldValue.arrayRemove(leagueId)
			});
		});
	});
