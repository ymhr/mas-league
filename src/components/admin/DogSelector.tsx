import React from 'react';
import firebase, { firestore } from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import styled from 'styled-components';

const DogWrapper = styled.div`
	cursor: pointer;

	&:hover {
		background-color: #eee;
	}
`;

interface DogProps {
	doc: firebase.firestore.DocumentSnapshot;
	click: (arg0: React.MouseEvent) => any;
}

function Dog({ doc, click }: DogProps) {
	const data = doc.data();

	if (data) {
		return (
			<DogWrapper onClick={click}>
				{data.name} (Grade: {data.grade})
			</DogWrapper>
		);
	}

	return null;
}

interface DogSelectorProps {
	leagueId: string;
	onSelect: (doc: firebase.firestore.DocumentSnapshot) => void;
}

export default function DogSelector({ leagueId, onSelect }: DogSelectorProps) {
	const [value, loading] = useCollection(
		firebase.firestore().collection('dogs')
	);

	function selected(doc: firebase.firestore.DocumentSnapshot) {
		onSelect(doc);
	}

	if (loading || !value) return <Loading />;

	//List all dogs who are not in the 2019 league
	const dogs = value.docs
		.filter(
			(doc) =>
				doc &&
				doc.data &&
				doc.data() &&
				(!doc.data().leagues || !doc.data().leagues[leagueId])
		)
		.map((doc: firestore.DocumentSnapshot) => (
			<Dog key={doc.id} doc={doc} click={selected.bind(null, doc)} />
		));

	return <>{dogs}</>;
}
