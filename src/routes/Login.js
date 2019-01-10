import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';

const uiConfig = {
	signInFlow: 'popup',
	signInOptions: [
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
	],
	callbacks: {
		signInSuccessWithAuthResult: (data) => {
			//
		}
	}
};

export default function Login() {
	return (
		<StyledFirebaseAuth
			uiConfig={uiConfig}
			firebaseAuth={firebase.auth()}
		/>
	);
}
