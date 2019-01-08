import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export default function useFirebaseAuth() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		//This returns the unsubscribe function
		return firebase.auth().onAuthStateChanged((user) => {
			localStorage.setItem('user', JSON.stringify(user));
			setUser(user);
		});
	}, []);

	return user;
}
