const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.fillOutUsersProfile = require('./funcs/fillOutUsersProfile');
exports.updateDogLeagues = require('./funcs/updateDogLeagues');
const {
	dogScoreAdded,
	dogScoreUpdated,
	dogScoreDeleted
} = require('./funcs/dogScores');
exports.dogScoreAdded = dogScoreAdded;
exports.dogScoreUpdated = dogScoreUpdated;
exports.dogScoreDeleted = dogScoreDeleted;

//HTTP
exports.addRun = require('./funcs/addRun');
