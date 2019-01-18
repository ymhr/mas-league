import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Loading from 'components/Loading';
import useIsAdmin from 'hooks/useIsAdmin';

function AuthRoute({ component: Component, isAllowed, ...props }) {
	const { isAdmin, error, loading } = useIsAdmin();

	if (loading || error) {
		return <Loading />;
	}

	return (
		<Route
			{...props}
			render={(props) => {
				return !!isAdmin ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}
		/>
	);
}

export default AuthRoute;
