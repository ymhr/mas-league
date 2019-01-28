import React from 'react';
import { Form, Input, DatePicker, Button } from 'antd';
import firebase from 'firebase/app';
import useReactRouter from 'use-react-router';
import { useAuthState } from 'react-firebase-hooks/auth';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function ShowForm({ doc, form, dog }) {
	const { getFieldDecorator } = form;
	const { match } = useReactRouter();
	const { user } = useAuthState(firebase.auth());

	const { dogId } = match.params;

	function submit(e) {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				const docToUse =
					doc ||
					firebase
						.firestore()
						.collection(`dogs/${dogId}/shows`)
						.doc();
				const data = {
					startDate: values['start-end'][0].format(),
					endDate: values['start-end'][1].format(),
					name: values.name,
					description: values.description,
					uid: user.uid
				};

				if (doc) {
					docToUse.update(data);
				} else {
					docToUse.set(data);
				}
			}
			console.log(err, values);
		});
	}

	let data = {};
	if (doc) data = doc.data();

	return (
		<Form onSubmit={submit} layout="vertical">
			<Form.Item label="Name">
				{getFieldDecorator('name', {
					rules: [
						{
							required: true,
							message: 'You must enter the name of the show.'
						}
					],
					initialValue: data.name
				})(<Input />)}
			</Form.Item>

			<Form.Item label="Dates">
				{getFieldDecorator('start-end', {
					type: 'array',
					required: true,
					message: 'You must pick the start and end date of the show'
				})(<RangePicker format="YYYY-MM-DD" />)}
			</Form.Item>

			<Form.Item label="Description">
				{getFieldDecorator('description', {})(<TextArea />)}
			</Form.Item>
			<Button block htmlType="submit">
				Save
			</Button>
		</Form>
	);
}

export default Form.create({ name: 'showForm' })(ShowForm);
