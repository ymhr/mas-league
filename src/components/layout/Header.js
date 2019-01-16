import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginButton from 'components/layout/LoginButton';
import { Row, Col, Menu, Affix } from 'antd';
import useRouter from 'use-react-router';
import AdminButton from 'components/layout/AdminButton';

const HeaderBar = styled.header`
	width: 100%;
	background-color: #eee;
`;

const H1 = styled.h1`
	padding: 0 20px;
	margin: 20px 0;
`;

function Header({ dispatch }) {
	const { location } = useRouter();

	return (
		<HeaderBar>
			<Row>
				<Col xs={24}>
					<H1>MAS Agility League</H1>
				</Col>
			</Row>
			<Row>
				<Col xs={24}>
					<Affix offsetTop={0}>
						<Menu
							mode="horizontal"
							selectedKeys={[location.pathname]}
						>
							<Menu.Item key="/">
								<Link to="/">Home</Link>
							</Menu.Item>
							<Menu.Item key="/dogs">
								<Link to="/dogs">Your dogs</Link>
							</Menu.Item>
							<Menu.Item key="/login">
								<LoginButton />
							</Menu.Item>
							<Menu.Item key="/admin">
								<AdminButton />
							</Menu.Item>
						</Menu>
					</Affix>
				</Col>
			</Row>
		</HeaderBar>
	);
}

export default Header;
