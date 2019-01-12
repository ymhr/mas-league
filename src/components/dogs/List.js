import React from 'react';
import useFirestore from 'hooks/useFirestore';
import firebase from 'firebase/app';

export default function List() {
	const db = firebase.firestore();
	const dogsRef = db.collection('dogs');
	// .where('uid', '==', firebase.auth().currentUser.uid);
	const results = useFirestore(dogsRef);
	console.log(results);

	return <h1>Dogs list</h1>;
}
