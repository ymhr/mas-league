import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';
import { useProfile } from '@/hooks/firebase';
import Loading from '@/components/Loading';

function ProfileForm({ form }) {
	const { getFieldDecorator, validateFields } = form;
	const { loading, error, doc, value } = useProfile();

	if (error) {
		return <p>An error occurred</p>;
	}

	if (loading || value === null) return <Loading />;

	function onSubmit(e) {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				if (value.data()) {
					doc.update(values);
				} else {
					doc.set(values);
				}
			}
		});
	}

	const data = value.data() || {};

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
						{/* <Form.Item label="Email">
							{getFieldDecorator('email', {
								rules: [
									{
										required: true,
										message:
											'Please enter your email address',
										pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi
									}
								],
								initialValue: data.lastName
							})(<Input />)}
						</Form.Item> */}
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
