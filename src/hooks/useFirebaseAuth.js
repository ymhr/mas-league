import { useEffect, useState } from 'react';
import firebase from 'firebase/app';

export default function useFirebaseAuth(callback = () => {}) {
	useEffect(() => {
		//This returns the unsubscribe function
		return firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				localStorage.setItem('user', JSON.stringify(user));
				callback(user);
			}
		});
	}, []);
}
