import React from 'react';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import styled from 'styled-components';

const DogWrapper = styled.div`
	cursor: pointer;

	&:hover {
		background-color: #eee;
	}
`;

function Dog({ doc, click }) {
	const data = doc.data();

	return (
		<DogWrapper onClick={click}>
			{data.name} (Grade: {data.grade})
		</DogWrapper>
	);
}

export default function DogSelector({ leagueId, onSelect }) {
	const [value, loading] = useCollection(
		firebase.firestore().collection('dogs')
	);

	function selected(doc) {
		onSelect(doc);
	}

	if (loading) return <Loading />;

	//List all dogs who are not in the 2019 league
	return value.docs
		.filter(
			(doc) =>
				doc &&
				doc.data &&
				doc.data() &&
				(!doc.data().leagues || !doc.data().leagues[leagueId])
		)
		.map((doc) => (
			<Dog key={doc.id} doc={doc} click={selected.bind(null, doc)} />
		));
}
