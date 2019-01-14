import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';

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

function Login({ history, loggedIn }) {
	if (loggedIn) return <Redirect to="/" />;
	return (
		<StyledFirebaseAuth
			uiConfig={uiConfig}
			firebaseAuth={firebase.auth()}
		/>
	);
}

function mapStateToProps(state) {
	return {
		loggedIn: !!state.auth.user
	};
}
export default connect(mapStateToProps)(Login);
