import React from 'react';
import { connect } from 'react-redux';
import 'firebase/init';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Header from 'components/layout/Header';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { auth } from 'store/actions';

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

function App({ user, dispatch }) {
	const firebaseUser = useFirebaseAuth();

	if (!user && firebaseUser) {
		dispatch(auth.login(firebaseUser));
	} else {
		dispatch(auth.loading);
	}

	return (
		<>
			{!user && (
				<StyledFirebaseAuth
					uiConfig={uiConfig}
					firebaseAuth={firebase.auth()}
				/>
			)}

			{user && (
				<div className="App">
					<Header />
				</div>
			)}
		</>
	);
}

function mapStateToProps(state) {
	return {
		user: state.auth.user
	};
}

export default connect(mapStateToProps)(App);
