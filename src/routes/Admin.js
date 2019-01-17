import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import League from 'components/leagues/League';
import Loading from 'components/Loading';

export default function Admin() {
	const db = firebase.firestore();

	const query = db.collection('leagues').where('test', '==', '');

	const { loading, error, value } = useCollection(query);

	if (loading || error || !value) return <Loading />;

	return value.docs.map((doc) => <League key={doc.id} doc={doc} />);
}
