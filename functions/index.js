const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send('Hello from Firebase!');
});

exports.createUserProfileDocument = functions.auth.user().onCreate((user) => {
	const db = admin.firestore();
	db.collection('profiles')
		.doc(user.uid)
		.set({});
});
