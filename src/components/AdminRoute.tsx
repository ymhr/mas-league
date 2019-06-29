import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Loading from '@/components/Loading';
import useIsAdmin from '@/hooks/useIsAdmin';

interface Props {
	component: React.ElementType<any>;
	[x: string]: any;
}

function AuthRoute({ component: Component, ...props }: Props) {
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
