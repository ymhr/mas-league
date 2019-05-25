const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.deleteUserData = functions.auth.user().onDelete(user => {
	return admin.firestore().runTransaction(async transaction => {
		await deleteUsersProfile(transaction, user.uid);
	});
});

async function deleteUsersProfile(transaction, uid) {
	const docRef = transaction.get(`profiles/${uid}`);

	return transaction.delete(docRef);
}

async function deleteUsersDogs(transaction, uid) {
	const dogs = admin
		.firestore()
		.collection('dogs')
		.where('uid', '==', uid);

	dogs.get()
		.then(snapshots => {
			return snapshots.forEach(dog =>
				deleteDogRuns(transaction, uid, dog).then(() =>
					deleteDog(transaction, uid, dog)
				)
			);
		})
		.catch(e => console.error('Could not delete dogs', uid, e));
}

function deleteDog(transaction, uid, dog) {
	return transaction.delete(dog);
}

function deleteDogRuns(transaction, uid, dog) {
	return admin
		.firestore()
		.collection(`dogs/${dog.id}/runs`)
		.get()
		.then(runs => {
			return runs.forEach(run => {
				console.log('Deleting run', run.id);
				return transaction.delete(run);
			});
		})
		.catch(e => console.error('Could not delete runs', uid, e));
}

async function removeUsersDogsFromLeagues(transaction, uid) {}

async function removeAsAdmin(transaction, uid) {}
