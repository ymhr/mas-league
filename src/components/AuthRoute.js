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
		error: profileError,
		hasRequiredProfileData
	} = useProfile();

	// function hasCompleteProfile() {
	// 	return (
	// 		profile &&
	// 		profile.data &&
	// 		profile.data() &&
	// 		Object.keys(profile.data()).length >= 2
	// 	);
	// }

	return (
		<Route
			{...props}
			render={(props) => {
				// If the user is done loading, but they are not logged in, send them to the login page
				if (!initialising && !user) return <Redirect to="/login" />;

				// If the profile is done loading, but either they have none, or do not have the required info, send them to the onboarding page
				if (
					!profileLoading &&
					!hasRequiredProfileData() &&
					props.match.path !== '/onboard'
				) {
					return <Redirect to="/onboard" />;
				}

				// If we are stil loading either bit of info, display the loading icon
				if (initialising || profileLoading) return <Loading />;

				return <Component {...props} />;
			}}
		/>
	);
}
