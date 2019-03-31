const functions = require('firebase-functions');
const admin = require('firebase-admin');

module.exports = functions.firestore
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
		console.log(addedDogs);
		addedDogs.forEach(([id, data]) => {
			const doc = db.collection('dogs').doc(id);
			//Set their initial points to 0 so they appear in the league right away
			data.points = 0;
			data.name = newData.name || context.params.leagueId;
			data.sport = newData.sport || 'agility';
			console.log({ [`leagues.${leagueId}`]: data });
			doc.update({
				[`leagues.${leagueId}`]: data
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
