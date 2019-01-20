import React from 'react';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from 'components/Loading';

function Dog({ doc, click }) {
	const data = doc.data();

	return (
		<div onClick={click}>
			{data.name} (Grade: {data.grade})
		</div>
	);
}

export default function DogSelector({ leagueId, onSelect }) {
	const { loading, error, value } = useCollection(
		firebase.firestore().collection('dogs')
	);

	function selected(doc) {
		console.log('clicked');
		onSelect(doc);
	}

	if (loading) return <Loading />;

	//List all dogs who are not in the 2019 league
	return value.docs
		.filter(
			doc =>
				doc &&
				doc.data &&
				doc.data() &&
				(!doc.data().leagues || !doc.data().leagues.includes(leagueId))
		)
		.map(doc => (
			<Dog key={doc.id} doc={doc} click={selected.bind(null, doc)} />
		));
}
