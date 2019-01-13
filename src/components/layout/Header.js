import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { Grid, Row, Col } from 'react-flexbox-grid';

const HeaderBar = styled.header`
	width: 100%;
	background-color: #ccc;
	padding: 20px;
`;

function Header({ dispatch }) {
	function logout() {
		firebase.auth().signOut();
	}

	return (
		<HeaderBar>
			<Grid fluid>
				<Row>
					<Col xs={12}>
						<h1>MAS Agility League</h1>
					</Col>
				</Row>
				<Row>
					<Col xs={10}>
						<Link to="/">Home</Link>
						<Link to="/dogs">Your dogs</Link>
					</Col>
					<Col xs={2}>
						<button onClick={logout}>Logout</button>
					</Col>
				</Row>
			</Grid>
		</HeaderBar>
	);
}

export default Header;
