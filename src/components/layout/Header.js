import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import LoginButton from 'components/layout/LoginButton';
import { Row, Col, Button } from 'antd';

const HeaderBar = styled.header`
	width: 100%;
	background-color: #ccc;
	padding: 20px;
`;

function Header({ dispatch }) {
	return (
		<HeaderBar>
			<Row>
				<Col xs={24}>
					<h1>MAS Agility League</h1>
				</Col>
			</Row>
			<Row>
				<Col xs={22}>
					<Link to="/">Home</Link>
					<Link to="/dogs">Your dogs</Link>
				</Col>
				<Col xs={2}>
					<LoginButton />
				</Col>
			</Row>
		</HeaderBar>
	);
}

export default Header;
