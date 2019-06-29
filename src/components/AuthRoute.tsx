import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import Loading from '@/components/Loading';
import { useProfile } from '@/hooks/firebase';

interface Props {
	component: React.ElementType<any>;
	[x: string]: any;
}

export default function AuthRoute({ component: Component, ...props }: Props) {
	const [user, initialising] = useAuthState(firebase.auth());
	const { loading: profileLoading, hasRequiredProfileData } = useProfile();

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
