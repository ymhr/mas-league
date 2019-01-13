import React from 'react';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from 'components/Loading';
import Dog from 'components/dogs/Dog';
import styled from 'styled-components';

const ListContainer = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const ListItem = styled.li`
	padding: 0;
	margin: 0;
`;

export default function List() {
	const db = firebase.firestore();
	const dogsRef = db
		.collection('dogs')
		.where('uid', '==', firebase.auth().currentUser.uid);
	const { error, loading, value } = useCollection(dogsRef);

	if (loading) return <Loading />;
	if (error) return <h1>Something went wrong</h1>;
	return (
		<ListContainer>
			{value.docs.map(doc => {
				return (
					<ListItem key={doc.id}>
						<Dog dog={doc} />
					</ListItem>
				);
			})}
		</ListContainer>
	);
}
