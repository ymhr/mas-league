import React from 'react';
import styled from 'styled-components';

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

export default function Header() {
	return (
		<HeaderBar>
			<TitleWrapper>
				<h1>MAS Agility League</h1>
			</TitleWrapper>
		</HeaderBar>
	);
}
