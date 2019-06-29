import React, { useState, FormEvent } from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import { Button, Form, Input, InputNumber, Icon } from 'antd';
import firebase, { firestore } from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '@/components/Loading';
import { FormComponentProps } from 'antd/lib/form';
import useRouter from 'use-react-router';
import Error from '@/components/Error';

const BoxPosed = posed.div({
	open: {
		height: 'auto',
		'background-color': '#eee',
		'margin-bottom': '20px',
		position: 'relative',
		flip: true,
		duration: 300
	},
	closed: {
		height: 'auto',
		'background-color': '#fff',
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
		transform: 'translateY(-20px)'
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
	overflow: hidden;

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

interface DogProps {
	dog?: firestore.QueryDocumentSnapshot;
	newDoc?: firebase.firestore.DocumentReference;
}

function Dog({ dog, newDoc, form }: DogProps & FormComponentProps) {
	const isNew = !!newDoc;
	const { history } = useRouter();
	const { getFieldDecorator } = form;
	const [isOpen, setIsOpen] = useState(false);
	const [user, initialising] = useAuthState(firebase.auth());

	if (initialising || !user) return <Loading />;
	if (!dog && !newDoc) {
		return <Error error="exiting dog AND new dog missing" />;
	}

	let data: firestore.DocumentData = {};
	if (!isNew && dog) {
		const docData = dog.data();
		if (docData) data = docData;
	}

	function close() {
		setIsOpen(false);
	}

	function open() {
		if (isOpen) return;
		setIsOpen(true);
	}

	function submit(e: FormEvent<HTMLElement>) {
		e.preventDefault();
		form.validateFields((err, values) => {
			const id = (dog && dog.id) || (newDoc && newDoc.id);
			const dogDoc = firebase
				.firestore()
				.collection('dogs')
				.doc(id);

			if (!err) {
				if (isNew) {
					dogDoc.set(values);
				} else {
					dogDoc.update(values);
				}
				close();
			}
		});
	}

	function deleteDog(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		if (!dog) return;
		const dogDoc = firebase
			.firestore()
			.collection('dogs')
			.doc(dog.id);

		e.preventDefault();
		dogDoc.delete();
	}

	function goToLogPoints(): void {
		if (!dog) return;
		history.push(`/points/${dog.id}`);
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
				<Name pose={isOpen ? 'large' : 'small'}>
					{isNew ? (
						<>
							<Icon type="plus" />
							<span>Add a new dog</span>
						</>
					) : (
						<>
							{data.name}{' '}
							{!isOpen && (
								<Button
									style={{ float: 'right' }}
									onClick={goToLogPoints}
								>
									Log points
								</Button>
							)}
						</>
					)}
				</Name>
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
									{getFieldDecorator('grade', {
										rules: [
											{
												required: true,
												message:
													'You must enter the name of your dog.'
											}
										],
										initialValue: data.grade
									})(<InputNumber min={1} max={7} />)}
								</Form.Item>
								{getFieldDecorator('uid', {
									initialValue: user.uid
								})(<Input type="hidden" />)}
								<Button htmlType="submit">Submit</Button>
								{!isNew && (
									<Button type="danger" onClick={deleteDog}>
										Delete
									</Button>
								)}
							</Form>
						</AppearingForm>
					)}
				</PoseGroup>
			</Box>
		</>
	);
}

export default Form.create<DogProps & FormComponentProps>({ name: 'dog' })(Dog);
