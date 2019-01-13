import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import Loading from 'components/Loading';

function ProtectedRoute({ component: Component, isAllowed, ...props }) {
	const [showLoading, setShowLoading] = useState(false);
	const { initialising, user } = useAuthState(firebase.auth());

	useEffect(() => {
		setTimeout(() => {
			if (!user) {
				setShowLoading(true);
			}
		}, 1000);
	}, []);

	if (initialising) {
		return showLoading && <Loading />;
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

export default ProtectedRoute;
