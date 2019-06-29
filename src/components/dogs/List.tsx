import React from 'react';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import Dog from '@/components/dogs/Dog';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';

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
	const [user, userLoading] = useAuthState(firebase.auth());
	const dogsRef = db
		.collection('dogs')
		.where('uid', '==', user && user.uid)
		.orderBy('name', 'asc');
	const [value, loading, error] = useCollection(dogsRef);

	if (!user || userLoading) return <Loading />;

	const newDoc = db.collection('dogs').doc();

	if (loading || !value) return <Loading />;
	if (error) return <h1>Something went wrong</h1>;

	return (
		<>
			<p>
				Once added here, your dog will not appear in the league tables
				until it has been approved. Please be patient.
			</p>
			<ListContainer>
				{value.docs.map((doc) => {
					return (
						<ListItem key={doc.id}>
							<Dog dog={doc} />
						</ListItem>
					);
				})}
				<ListItem key={newDoc.id}>
					<Dog newDoc={newDoc} />
				</ListItem>
			</ListContainer>
		</>
	);
}
