import { useRef } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';

export function useDoc(collection, id) {
	const db = firebase.firestore();
	const res = { loading: true, error: null, value: null };
	try {
		return useDocument(db.collection(collection).doc(id));
	} catch (e) {
		console.log('whoops doc error');
		res.loading = false;
		return res;
	}
}

export function useQuery(collection, ...rest) {
	const db = firebase.firestore();
	const query = db.collection(collection).where(...rest);
	return useCollection(query);
}

export function useProfile() {
	function hasRequiredProfileData(value) {
		//Make sure that we can get the data out of the value
		const data = value && value.data && value.data();

		//If, for whatever reason, we cannot get the data, then return false\
		if (!data) return false;

		//Make sure that these required fields exist
		return ['firstName', 'lastName']
			.map(fieldName => !!data[fieldName])
			.every(f => f);
	}

	const response = useRef({
		loading: false,
		doc: null,
		value: null,
		error: null,
		hasRequiredProfileDat: () => false
	});

	const { initialising, user } = useAuthState(firebase.auth());
	const { loading, error, value, doc } = useDoc('profiles', user && user.uid);

	if (initialising || loading) {
		response.current.loading = true;
	} else {
		response.current.loading = false;
	}
	if (error) response.current.error = error;

	response.current.doc = doc;
	response.current.value = value;

	response.current.hasRequiredProfileData = hasRequiredProfileData.bind(
		null,
		response.current.value
	);
	return response.current;
}

// export function useHasProfile() {
// 	const requiredValues = ['firstName', 'lastName'];
// 	const hasProfile = useRef(null);
// 	const { loading, error, value } = useProfile();

// 	if (hasProfile.current) return hasProfile.current;

// 	if (loading) hasProfile.current = null;
// 	if (error) hasProfile.current = false;
// 	if (!value) {
// 		hasProfile.current = false;
// 		return hasProfile.current;
// 	}

// 	const data = value.data();
// 	const doesHaveValues = requiredValues.map((key) => {
// 		return !!data[key];
// 	});

// 	if (!doesHaveValues.every((val) => val)) {
// 		return false;
// 	}

// 	hasProfile.current = !!value;
// 	return hasProfile.current;
// }
