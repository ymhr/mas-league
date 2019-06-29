import { useAuthState } from 'react-firebase-hooks/auth';
import firebase, { firestore } from 'firebase/app';
import { useDocument } from 'react-firebase-hooks/firestore';

export function useDoc(collection: string, id: any) {
	const db = firebase.firestore();
	let doc;

	try {
		doc = db.collection(collection).doc(id);
	} catch {
		doc = null;
	}
	const res = useDocument(doc);

	return res;
}

function hasRequiredProfileData(value?: firestore.DocumentSnapshot) {
	//Make sure that we can get the data out of the value
	const data = value && value.data && value.data();

	//If, for whatever reason, we cannot get the data, then return false
	if (!data) return false;

	//Make sure that these required fields exist
	return ['firstName', 'lastName']
		.map((fieldName) => !!data[fieldName])
		.every((f) => f);
}

export function useProfile(): {
	profile: void | firestore.DocumentSnapshot;
	loading: boolean;
	error: void | Error;
	hasRequiredProfileData: () => any;
} {
	const [user] = useAuthState(firebase.auth());
	const [profile, loading, error] = useDoc('profiles', user && user.uid);

	if (loading || error || !profile)
		return {
			profile: profile,
			loading: true,
			error: error,
			hasRequiredProfileData: () => {}
		};

	return {
		profile,
		loading,
		error,
		hasRequiredProfileData: hasRequiredProfileData.bind(null, profile)
	};
}
