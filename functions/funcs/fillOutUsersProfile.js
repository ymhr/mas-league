const functions = require('firebase-functions');
const admin = require('firebase-admin');

module.exports = functions.auth.user().onCreate(async user => {
	const db = admin.firestore();

	// const names = user.displayName.split(' ');
	// const firstName = names[0] || null;
	// const lastName = names[names.length - 1] || null;
	const email = user.email || null;
	const photoUrl = user.photoUrl || null;

	const document = db.collection('profiles').doc(user.uid);

	const profile = await document.get();

	const doesProfileExist = profile.exists;

	if (doesProfileExist) {
		document.update({
			// firstName,
			// lastName,
			email,
			photoUrl
		});
	} else {
		document.set({
			// firstName,
			// lastName,
			email,
			photoUrl
		});
	}
});
