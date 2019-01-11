import React from 'react';
import { connect } from 'react-redux';
import 'firebase/init';
import Header from 'components/layout/Header';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { auth } from 'store/actions';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute';
import Home from 'routes/Home';
import Protect from 'routes/Protect';
import Login from 'routes/Login';
import store from 'store';

function setUserFromFirebase(user) {
	if (user) {
		store.dispatch(auth.login(user));
	} else {
		store.dispatch(auth.logout());
	}
}

function App({ user, dispatch }) {
	useFirebaseAuth(setUserFromFirebase);

	function isLoggedIn() {
		return !!user;
	}

	return (
		<Router>
			<Switch>
				<div className="app">
					<Header />
					<Route path="/" exact component={Home} />
					<ProtectedRoute
						isAllowed={isLoggedIn}
						path="/protect/"
						component={Protect}
					/>
					<Route path="/login" component={Login} />
				</div>
			</Switch>
		</Router>
	);
}

function mapStateToProps(state) {
	return {
		user: state.auth.user
	};
}

export default connect(mapStateToProps)(App);
