import React from 'react';
import 'firebase/init';
import Header from 'components/layout/Header';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute';
import Home from 'routes/Home';
import YourDogs from 'routes/YourDogs';
import Login from 'routes/Login';
function App({ dispatch }) {
	return (
		<Router>
			<div className="app">
				<Header />

				<Switch>
					<Route path="/" exact component={Home} />
					<ProtectedRoute path="/dogs" component={YourDogs} />
					<Route path="/login" component={Login} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
