import React from 'react';
import 'firebase/init';
import Header from 'components/layout/Header';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from 'components/ProtectedRoute';
import Home from 'routes/Home';
import YourDogs from 'routes/YourDogs';
import Login from 'routes/Login';
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
						<ProtectedRoute path="/dogs" component={YourDogs} />
						<Route path="/login" component={Login} />
					</Switch>
				</Container>
			</div>
		</Router>
	);
}

export default App;
