import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { auth } from 'store/actions';
import { connect } from 'react-redux';

const HeaderBar = styled.header`
	width: 100%;
	height: 200px;
	background-color: #ccc;
`;

const TitleWrapper = styled.div`
	display: flex;
	justify-content: left;
	align-items: center;
	height: 100%;
	padding-left: 20px;
`;

function Header({ dispatch }) {
	function logout() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				dispatch(auth.logout());
			});
	}

	return (
		<HeaderBar>
			<TitleWrapper>
				<h1>MAS Agility League</h1>
				<Link to="/">Home</Link>
				<Link to="/protect/">Protect</Link>
				<button onClick={logout}>Logout</button>
			</TitleWrapper>
		</HeaderBar>
	);
}

export default connect()(Header);
