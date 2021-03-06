import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

var config = {
	apiKey: 'AIzaSyAJt8h2MCL8cbM2PNp49kUrC_lmG_uqlyg',
	authDomain: 'mas-league.firebaseapp.com',
	databaseURL: 'https://mas-league.firebaseio.com',
	projectId: 'mas-league',
	storageBucket: 'mas-league.appspot.com',
	messagingSenderId: '663624185341'
};

firebase.initializeApp(config);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const firestore = firebase.firestore();

firestore.enablePersistence({ synchronizeTabs: true }).catch((err) => {
	if (err.code === 'failed-precondition') {
		console.error('Multiple tabs open');
	} else if (err.code === 'unimplemented') {
		console.error('The browser does not support offline mode');
	}
});
