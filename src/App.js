import React from 'react';
import 'firebase/init';
import Header from 'components/layout/Header';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute';
import AdminRoute from 'components/AdminRoute';
import Admin from 'routes/Admin';
import Home from 'routes/Home';
import YourDogs from 'routes/YourDogs';
import Login from 'routes/Login';
import Onboard from 'routes/Onboard';
import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
`;

function App() {
	return (
		<Router>
			<div className="app">
				<Header />
				<Container>
					<Switch>
						<Route path="/" exact component={Home} />
						<AuthRoute path="/dogs" component={YourDogs} />
						<Route path="/login" component={Login} />
						<AdminRoute path="/admin" component={Admin} />
						<AuthRoute path="/onboard" component={Onboard} />
					</Switch>
				</Container>
			</div>
		</Router>
	);
}

export default App;
