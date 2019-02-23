import React from 'react';
import { Form, Input, DatePicker, Button, Select, InputNumber } from 'antd';
import firebase from 'firebase/app';
import useReactRouter from 'use-react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';
import currentLeague from '@/utils/currentLeague';

const { TextArea } = Input;

function RunForm({ form, doc, dog, run, onSave }) {
	const { getFieldDecorator } = form;
	const { match } = useReactRouter();
	const { user } = useAuthState(firebase.auth());

	const { dogId } = match.params;

	function submit(e) {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				const db = firebase
					.firestore()
					.collection(`dogs/${dogId}/runs`);

				const docToUse = doc && doc.id ? db.doc(doc.id) : db.doc();

				const data = {
					date: values['date'].format(),
					description: values.description || '',
					uid: user.uid,
					league: docToUse.league || currentLeague(),
					place: values.place,
					showName: values.showName,
					grade: values.grade,
					gradedOrCombined: values.gradedOrCombined,
					type: values.type
				};

				if (doc) {
					docToUse.update(data);
				} else {
					docToUse.set(data);
				}

				form.resetFields();

				onSave && typeof onSave === 'function' && onSave();
			}
		});
	}

	let data = {};
	if (doc) data = doc.data();

	return (
		<Form onSubmit={submit} layout="vertical">
			<Form.Item label="Show name">
				{getFieldDecorator('showName', {
					rules: [
						{
							required: true,
							message: 'You must enter the name of the show.'
						}
					],
					initialValue: data.showName
				})(<Input />)}
			</Form.Item>

			<Form.Item label="Class grade">
				{getFieldDecorator('grade', {
					rules: [
						{
							required: true,
							message: 'What grade was the class?'
						}
					],
					initialValue: data.grade
				})(<Input />)}
			</Form.Item>

			<Form.Item label="Class type">
				{getFieldDecorator('type', {
					rules: [
						{
							required: true,
							message: 'What type of class was it?'
						}
					],
					initialValue: data.type
				})(
					<Select>
						<Select.Option value="agility">Agility</Select.Option>
						<Select.Option value="jumping">Jumping</Select.Option>
						<Select.Option value="special">Special</Select.Option>
					</Select>
				)}
			</Form.Item>

			<Form.Item label="Graded or combined">
				{getFieldDecorator('gradedOrCombined', {
					rules: [
						{
							required: true,
							message: 'Graded or combined?'
						}
					],
					initialValue: data.gradedOrCombined
				})(
					<Select>
						<Select.Option value="graded">Graded</Select.Option>
						<Select.Option value="combined">Combined</Select.Option>
					</Select>
				)}
			</Form.Item>

			<Form.Item label="Date">
				{getFieldDecorator('date', {
					rules: [
						{
							required: true,
							message: 'Which day was the run on?'
						}
					],
					initialValue: moment(data.date)
				})(<DatePicker format="YYYY-MM-DD" />)}
			</Form.Item>

			<Form.Item label="Place">
				{getFieldDecorator('place', {
					rules: [
						{
							required: true,
							message: 'What place did you get?'
						}
					],
					initialValue: data.place
				})(
					<Select>
						<Select.Option value={1}>1st</Select.Option>
						<Select.Option value={2}>2nd</Select.Option>
						<Select.Option value={3}>3rd</Select.Option>
						<Select.Option value={4}>4th</Select.Option>
						<Select.Option value={5}>5th</Select.Option>
						<Select.Option value={6}>6th</Select.Option>
						<Select.Option value={7}>7th</Select.Option>
						<Select.Option value={8}>8th</Select.Option>
						<Select.Option value={9}>9th</Select.Option>
						<Select.Option value={10}>10th</Select.Option>
						<Select.Option value={'10+'}>10+</Select.Option>
						<Select.Option value={'upc'}>
							Un-placed clear (UPC)
						</Select.Option>
					</Select>
				)}
			</Form.Item>

			<Form.Item label="Description">
				{getFieldDecorator('description', {
					initialValue: data.description
				})(<TextArea />)}
			</Form.Item>
			<Button block htmlType="submit">
				Save
			</Button>
		</Form>
	);
}

export default Form.create({ name: 'runForm' })(RunForm);
