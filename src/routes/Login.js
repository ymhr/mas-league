import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from 'components/Loading';

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

function Login({ history }) {
	const { initialising, user } = useAuthState(firebase.auth());

	if (initialising) return <Loading />;

	if (user) return <Redirect to="/" />;

	return (
		<StyledFirebaseAuth
			uiConfig={uiConfig}
			firebaseAuth={firebase.auth()}
		/>
	);
}

export default Login;
