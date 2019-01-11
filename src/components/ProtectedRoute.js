import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

function ProtectedRoute({ component: Component, authed, ...props }) {
	return (
		<Route
			{...props}
			render={(props) => {
				return authed ? (
					<Component {...props} />
				) : (
					<Redirect to="/login" />
				);
			}}
		/>
	);
}

function mapStateToProps(state) {
	return {
		authed: !!state.auth.user,
		user: state.auth.user
	};
}

export default withRouter(connect(mapStateToProps)(ProtectedRoute));
