import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';

export function useDoc(collection, id) {
	const db = firebase.firestore();
	const [loading, setLoading] = useState(true);
	const [value, setValue] = useState(undefined);
	const [doc, setDoc] = useState(undefined);

	useEffect(() => {
		if (!collection || !id) return;

		setLoading(true);
		if (collection && id) {
			const doc = db.collection(collection).doc(id);
			setDoc(doc);
			doc.onSnapshot((snap) => {
				setValue(snap);
				setLoading(false);
			});
		}
	}, [collection, db, id]);

	return { loading, doc, value };
}

function hasRequiredProfileData(value) {
	//Make sure that we can get the data out of the value
	const data = value && value.data && value.data();

	//If, for whatever reason, we cannot get the data, then return false
	if (!data) return false;

	//Make sure that these required fields exist
	return ['firstName', 'lastName']
		.map((fieldName) => !!data[fieldName])
		.every((f) => f);
}

export function useProfile() {
	const [user] = useAuthState(firebase.auth());
	const profile = useDoc('profiles', user && user.uid);

	return {
		...profile,
		hasRequiredProfileData: hasRequiredProfileData.bind(null, profile.value)
	};
}
