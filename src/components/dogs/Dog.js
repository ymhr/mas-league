import React, { useState } from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import { Form, Text } from 'informed';

const Box = posed.div({
	open: {
		height: '400px',
		'background-color': '#cccccc',
		// 'box-shadow': '0px 0px 20px 5px rgba(0, 0, 0, 0.3)',
		'margin-bottom': '20px',
		transform: 'scale(1.01)',
		position: 'relative'
	},
	closed: {
		height: '30px',
		'background-color': '#fff',
		// 'box-shadow': '0px 0px 0px 0px rgba(0, 0, 0, 0.0)',
		'margin-bottom': '0px',
		transform: 'scale(1)',
		position: 'relative'
	}
});

const Name = posed.h2({
	small: {
		'font-size': '16px',
		'font-weight': 'normal',
		padding: '0px'
	},
	large: {
		'font-size': '30px',
		'font-weight': 'light',
		padding: '20px'
	}
});

const Close = styled.div`
	position: absolute;
	top: 5px;
	right: 5px;
	cursor: pointer;
	font-size: 30px;
`;

export default function Dog({ dog }) {
	const [isOpen, setIsOpen] = useState(false);
	const data = dog.data();

	function close() {
		setIsOpen(false);
	}

	function open() {
		if (isOpen) return;
		setIsOpen(true);
	}

	return (
		<Box onClick={open} pose={isOpen ? 'open' : 'closed'}>
			{isOpen && <Close onClick={close}>&times;</Close>}
			<Name pose={isOpen ? 'large' : 'small'}>{data.name}</Name>
			{isOpen && (
				<Form>
					<Text field="name" />
				</Form>
			)}
		</Box>
	);
}
