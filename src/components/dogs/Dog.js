import React, { useState } from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
// import { Form, Text } from 'informed';
import { Button, Form, Input, InputNumber } from 'antd';
import firebase from 'firebase/app';

const BoxPosed = posed.div({
	open: {
		height: 'auto',
		'background-color': '#eee',
		// 'box-shadow': '0px 0px 20px 5px rgba(0, 0, 0, 0.3)',
		'margin-bottom': '20px',
		position: 'relative',
		flip: true,
		duration: 300
	},
	closed: {
		height: 'auto',
		'background-color': '#fff',
		// 'box-shadow': '0px 0px 0px 0px rgba(0, 0, 0, 0.0)',
		'margin-bottom': '0px',
		position: 'relative',
		padding: '20px',
		flip: true,
		duration: 300
	}
});

const NamePosed = posed.h2({
	small: {
		'font-size': '16px',
		'font-weight': 'normal',
		padding: '0px',
		duration: 300
	},
	large: {
		'font-size': '30px',
		'font-weight': 'light',
		duration: 300
	}
});

const AppearingForm = posed.div({
	enter: {
		opacity: 1,
		height: 'auto',
		transform: 'translateY(0px)'
	},
	exit: {
		opacity: 0,
		height: '1px',
		transform: 'translateY(-20px)',
		transition: {
			duration: 0
		}
	}
});

const OverlayPosed = posed.div({
	visible: {
		opacity: 1
	},
	hidden: {
		opacity: 0
	}
});

const Box = styled(BoxPosed)`
	&.closed {
		z-index: 0;
		cursor: pointer;
		&:hover {
			background-color: #eee !important;
		}
	}

	&.open {
		z-index: 10;
	}
`;

const Name = styled(NamePosed)`
	margin: 0;
`;

const Close = styled(Button)`
	position: absolute;
	top: 5px;
	right: 5px;
`;

const Overlay = styled(OverlayPosed)`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);

	&.hidden {
		pointer-events: none;
		z-index: 0;
	}

	&.visible {
		z-index: 9;
	}
`;

const Label = styled.label`
	display: block;
`;

function Dog({ dog, form }) {
	const { getFieldDecorator } = form;
	const db = firebase.firestore();
	const [isOpen, setIsOpen] = useState(false);
	const data = dog.data();
	const dogDoc = db.collection('dogs').doc(dog.id);

	function close() {
		setIsOpen(false);
	}

	function open() {
		if (isOpen) return;
		setIsOpen(true);
	}

	function submit(e) {
		e.preventDefault();
		form.validateFields((err, values) => {
			console.log(err, values);
		});
		// dogDoc.update(data);
	}

	return (
		<>
			<Overlay
				pose={isOpen ? 'visible' : 'hidden'}
				className={isOpen ? 'visible' : 'hidden'}
				onClick={close}
			/>
			<Box
				className={isOpen ? 'open' : 'closed'}
				onClick={open}
				pose={isOpen ? 'open' : 'closed'}
			>
				{isOpen && (
					<Close onClick={close} shape="circle" icon="close" />
				)}
				<Name pose={isOpen ? 'large' : 'small'}>{data.name}</Name>
				<PoseGroup>
					{isOpen && (
						<AppearingForm key="form">
							<Form onSubmit={submit} layout="vertical">
								<Form.Item label="Name">
									{getFieldDecorator('name', {
										rules: [
											{
												required: true,
												message:
													'You must enter the name of your dog.'
											}
										],
										initialValue: data.name
									})(<Input />)}
								</Form.Item>
								<Form.Item label="Grade">
									<InputNumber
										name="grade"
										defaultValue={parseInt(data.grade, 10)}
										min={1}
										max={7}
									/>
								</Form.Item>
								<Button htmlType="submit">Submit</Button>
							</Form>
						</AppearingForm>
					)}
				</PoseGroup>
			</Box>
		</>
	);
}

export default Form.create({ name: 'dog' })(Dog);
