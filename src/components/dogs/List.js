import React from 'react';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function List() {
	const db = firebase.firestore();
	const dogsRef = db
		.collection('dogs')
		.where('uid', '==', firebase.auth().currentUser.uid);
	const { error, loading, value } = useCollection(dogsRef);

	if (loading) return <>Loading...</>;
	if (error) return <h1>Something went wrong</h1>;
	return (
		<ul>
			{value.docs.map((doc) => {
				return (
					<li key={doc.id}>
						<div>{doc.data().name}</div>
					</li>
				);
			})}
		</ul>
	);
}
