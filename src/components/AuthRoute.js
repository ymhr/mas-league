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

	function hasCompleteProfile() {
		console.log(
			'has',
			profile && profile.data && Object.keys(profile.data()).length >= 2
		);
		return (
			profile && profile.data && Object.keys(profile.data()).length >= 2
		);
	}

	// if(!profileLoading && !profile) return <Redirect to="/onboard" />;

	// if (!initialising && !user) return <Redirect to="/login" />;

	// if (initialising || profileLoading) {
	// 	return <Loading />;
	// }

	// const hasProfile =
	// 	profile && profile.data && Object.keys(profile.data()).length >= 2;

	return (
		<Route
			{...props}
			render={(props) => {
				if (!initialising && !user) return <Redirect to="/login" />;

				if (
					!profileLoading &&
					(!profile || !hasCompleteProfile()) &&
					props.match.path !== '/onboard'
				) {
					return <Redirect to="/onboard" />;
				}

				if (initialising || profileLoading) return <Loading />;

				return <Component {...props} />;
			}}
		/>
	);
}
