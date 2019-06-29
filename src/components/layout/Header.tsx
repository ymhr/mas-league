import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginButton from '@/components/layout/LoginButton';
import { Menu, Affix } from 'antd';
import useRouter from 'use-react-router';
import AdminButton from '@/components/layout/AdminButton';
import Container from './Container';

const HeaderBar = styled.header`
	width: 100%;
	background-color: #eee;
`;

const H1 = styled.h1`
	margin: 0;
	padding: 0;
	font-family: 'Staatliches', cursive;
`;

function Header() {
	const { location } = useRouter();

	return (
		<HeaderBar>
			<Container mobilePadding="20px">
				<H1>MAS Agility League</H1>
			</Container>
			<Container mobilePadding="0">
				<Affix offsetTop={0}>
					<Menu
						mode="horizontal"
						selectedKeys={[location.pathname]}
						style={{ backgroundColor: '#eee' }}
					>
						<Menu.Item key="/">
							<Link to="/">Home</Link>
						</Menu.Item>

						<Menu.Item key="/leagues">
							<Link to="/leagues">Tables</Link>
						</Menu.Item>
						<Menu.Item key="/dogs">
							<Link to="/dogs">Your dogs</Link>
						</Menu.Item>
						<Menu.Item key="/profile">
							<Link to="/profile">Profile</Link>
						</Menu.Item>
						<Menu.Item key="/login">
							<LoginButton />
						</Menu.Item>
						<Menu.Item key="/admin">
							<AdminButton />
						</Menu.Item>
					</Menu>
				</Affix>
			</Container>
		</HeaderBar>
	);
}

export default Header;
