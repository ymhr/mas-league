const functions = require('firebase-functions');
const admin = require('firebase-admin');

module.exports = functions.https.onCall(async (postData, context) => {
	const db = admin.firestore();
	const docId = postData.docId;
	const data = { ...postData };
	delete data.docId;

	const leagueRef = db.collection('leagues').doc(data.league);
	const dogRef = db.collection('dogs').doc(data.dogId);

	let docRef;

	if (docId) {
		docRef = db.collection(`dogs/${data.dogId}/runs`).doc(docId);
	} else {
		docRef = db.collection(`dogs/${data.dogId}/runs`).doc();
	}

	const leagueSnap = await leagueRef.get();
	const leagueData = leagueSnap.data();
	// If the league is closed, then points can no longer be added
	if (!leagueData.open) {
		throw new functions.https.HttpsError(
			'league-closed',
			'The league is closed, you cannot add points'
		);
	}

	data.leagueName = leagueData.name;
	data.leagueSport = leagueData.sport;

	const dogSnap = await dogRef.get();
	const dogData = dogSnap.data();

	// If the dog is now owned by the current user, abort
	if (dogData.uid !== context.auth.uid) {
		throw new functions.https.HttpsError(
			'not-your-dog',
			'You are trying to edit a dog that is not your own'
		);
	}

	if (docId) {
		docRef.update(data);
	} else {
		docRef.set(data);
	}

	return true;
});
