import React from 'react';
import firebase from 'firebase/app';
import League from 'components/leagues/League';
import Loading from 'components/Loading';
import { useQuery } from 'hooks/firebase';

export default function Admin() {
	const { loading, error, value } = useQuery('leagues', 'test', '==', '');

	if (loading || error || !value) return <Loading />;

	return value.docs.map((doc) => <League key={doc.id} doc={doc} />);
}
