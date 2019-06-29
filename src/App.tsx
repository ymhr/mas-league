import React from 'react';
import { hot } from 'react-hot-loader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Loading from '@/components/Loading';
import AuthRoute from '@/components/AuthRoute';
import AdminRoute from '@/components/AdminRoute';
import Container from '@/components/layout/Container';

const Admin = React.lazy(() => import('@/routes/Admin'));
const Home = React.lazy(() => import('@/routes/Home'));
const Leagues = React.lazy(() => import('@/routes/Leagues'));
const YourDogs = React.lazy(() => import('@/routes/YourDogs'));
const Login = React.lazy(() => import('@/routes/Login'));
const Profile = React.lazy(() => import('@/routes/Profile'));
const Onboard = React.lazy(() => import('@/routes/Onboard'));
const LogPoints = React.lazy(() => import('@/routes/LogPoints'));
const Privacy = React.lazy(() => import('@/routes/Privacy'));

function App() {
	return (
		<Router>
			<div className="app">
				<Header />
				<React.Suspense fallback={Loading}>
					<Container mobilePadding="20px">
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/leagues" component={Leagues} />
							<AuthRoute path="/dogs" component={YourDogs} />
							<AuthRoute path="/profile" component={Profile} />
							<Route path="/login" component={Login} />
							<AdminRoute path="/admin" component={Admin} />
							<AuthRoute path="/onboard" component={Onboard} />
							<AuthRoute
								path="/points/:dogId"
								component={LogPoints}
							/>
							<Route path="/privacy" component={Privacy} />
						</Switch>
					</Container>
				</React.Suspense>
				<Footer />
			</div>
		</Router>
	);
}

export default hot(module)(App);
