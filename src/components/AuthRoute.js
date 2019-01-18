import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import Loading from 'components/Loading';
import { useHasProfile } from 'hooks/firebase';

function AuthRoute({ component: Component, ...props }) {
	const { initialising, user } = useAuthState(firebase.auth());
	const hasProfile = useHasProfile();

	if (initialising) {
		return <Loading />;
	}

	return (
		<Route
			{...props}
			render={(props) => {
				if (!user) return <Redirect to="/login" />;
				if (!hasProfile && props.match.path !== '/onboard') {
					return <Redirect to="/onboard" />;
				}

				return <Component {...props} />;
			}}
		/>
	);
}

export default AuthRoute;
