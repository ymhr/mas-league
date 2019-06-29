import React, { FormEvent } from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import { useProfile } from '@/hooks/firebase';
import Loading from '@/components/Loading';
import { FormComponentProps } from 'antd/lib/form';
import firebase from 'firebase/app';

function ProfileForm({ form }: FormComponentProps) {
	const { getFieldDecorator, validateFields } = form;
	const { loading, error, profile } = useProfile();

	if (error) {
		return <p>An error occurred</p>;
	}

	if (loading || !profile) return <Loading />;

	function onSubmit(e: FormEvent) {
		if (!profile) return;
		const doc = firebase
			.firestore()
			.collection('profiles')
			.doc(profile.id);
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				if (profile.data()) {
					doc.update(values);
				} else {
					doc.set(values);
				}
			}
		});
	}

	const data = profile.data() || {};

	return (
		<>
			<Row>
				<Col xs={24} sm={12} md={8}>
					<Form onSubmit={onSubmit}>
						<Form.Item label="First name">
							{getFieldDecorator('firstName', {
								rules: [
									{
										required: true,
										message: 'You must enter a first name'
									}
								],
								initialValue: data.firstName
							})(<Input />)}
						</Form.Item>

						<Form.Item label="Last name">
							{getFieldDecorator('lastName', {
								rules: [
									{
										required: true,
										message: 'You must enter a last name'
									}
								],
								initialValue: data.lastName
							})(<Input />)}
						</Form.Item>
						<Form.Item>
							<Button block type="primary" htmlType="submit">
								Submit
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	);
}

export default Form.create({ name: 'onboard' })(ProfileForm);
