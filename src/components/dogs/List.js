import React from 'react';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from 'components/Loading';
import Dog from 'components/dogs/Dog';

export default function List() {
	const db = firebase.firestore();
	const dogsRef = db
		.collection('dogs')
		.where('uid', '==', firebase.auth().currentUser.uid);
	const { error, loading, value } = useCollection(dogsRef);

	if (loading) return <Loading />;
	if (error) return <h1>Something went wrong</h1>;
	return (
		<ul>
			{value.docs.map((doc) => {
				return (
					<li key={doc.id}>
						<Dog dog={doc} />
					</li>
				);
			})}
		</ul>
	);
}
