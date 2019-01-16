import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import Loading from 'components/Loading';

function AuthRoute({ component: Component, isAllowed, ...props }) {
	const { initialising, user } = useAuthState(firebase.auth());

	if (initialising) {
		return <Loading />;
	}

	return (
		<Route
			{...props}
			render={(props) => {
				return !!user ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}
		/>
	);
}

export default AuthRoute;
