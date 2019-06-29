import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'antd';

const Bar = styled.footer`
	padding: 10px;

	& ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
`;

export default function Footer() {
	return (
		<Bar>
			<Row>
				<Col xs={24} sm={8}>
					Copyright &copy; 2019
				</Col>
				<Col xs={24} sm={16}>
					<ul>
						<li>
							<Link to="/privacy">Privacy Policy</Link>
						</li>
					</ul>
				</Col>
			</Row>
		</Bar>
	);
}
