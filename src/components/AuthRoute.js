import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import Loading from 'components/Loading';
import { useProfile } from 'hooks/firebase';

export default function AuthRoute({ component: Component, ...props }) {
	const { initialising, user } = useAuthState(firebase.auth());
	const {
		loading: profileLoading,
		value: profile,
		error: profileError
	} = useProfile();

	if (initialising || profileLoading) {
		return <Loading />;
	}

	const hasProfile =
		profile && profile.data && Object.keys(profile.data()).length >= 2;

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
