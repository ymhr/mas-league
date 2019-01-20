import React from 'react';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import Loading from 'components/Loading';
import Error from 'components/Error';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute';
import Show from 'routes/Show';

export default function LogPoints({ match }) {
	const { dogId } = match.params;
	const dogDoc = firebase
		.firestore()
		.collection('dogs')
		.doc(dogId);

	const showsCollection = dogDoc.collection('shows');

	const {
		loading: showsLoading,
		error: showsError,
		value: showsValue
	} = useCollection(showsCollection);

	if (showsError) return <Error error={showsError} />;

	if (showsLoading) return <Loading />;

	return (
		<>
			<h1>Shows</h1>
			<AuthRoute path="/points/:dogId/:showId" component={Show} />
			{showsValue.docs.map(show => {
				const { name } = show.data();
				return (
					<Link key={show.id} to={`/points/${dogId}/${show.id}`}>
						{name}
					</Link>
				);
			})}
		</>
	);
}
