import React from 'react';
import League from 'components/leagues/League';
import Loading from 'components/Loading';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function List() {
	const { loading, error, value } = useCollection(
		firebase.firestore().collection('leagues')
	);

	if (loading || error) return <Loading />;

	return value.docs.map(doc => <League key={doc.id} doc={doc} />);
}
