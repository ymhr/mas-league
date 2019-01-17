import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import Loading from 'components/Loading';

function Dog({ id }) {
	const db = firebase.firestore();
	const { loading, error, value } = useCollection(
		db.collection('dogs').doc(id)
	);

	if (loading || error || !value) return <Loading />;

	const data = value.data();

	return <p>{data.name}</p>;
}

export default function League({ doc }) {
	const { dogs } = doc.data();

	return (
		<>
			{doc.id}
			<ul>
				{dogs.map((dog) => (
					<Dog key={dog} id={dog} />
				))}
			</ul>
		</>
	);
}
