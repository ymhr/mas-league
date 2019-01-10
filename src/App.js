import React from 'react';
import { connect } from 'react-redux';
import 'firebase/init';
import firebase from 'firebase/app';
import Header from 'components/layout/Header';
import useFirebaseAuth from 'hooks/useFirebaseAuth';
import { auth } from 'store/actions';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute';
import Home from 'routes/Home';
import Protect from 'routes/Protect';
import Login from 'routes/Login';

function App({ user, dispatch }) {
	const firebaseUser = useFirebaseAuth();

	if (!user && firebaseUser) {
		dispatch(auth.login(firebaseUser));
	} else {
		dispatch(auth.loading);
	}

	function isLoggedIn() {
		console.log('called');
		return !!user;
	}

	return (
		<Router>
			<Switch>
				<div className="app">
					<Header />
					<Route path="/" exact component={Home} />
					<Route
						// isAllowed={isLoggedIn}
						path="/protect/"
						component={Protect}
					/>
					<Route path="/login" component={Login} />
					{/* {!user && (
				<StyledFirebaseAuth
					uiConfig={uiConfig}
					firebaseAuth={firebase.auth()}
				/>
			)}

			{user && (
				<div className="App">
					<Header />
				</div>
			)} */}
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
