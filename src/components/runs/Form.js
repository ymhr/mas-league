import React from 'react';
import { Form, Input, DatePicker, Button, Select, InputNumber } from 'antd';
import firebase from 'firebase/app';
import useReactRouter from 'use-react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';

const { TextArea } = Input;

function RunForm({ form, doc, dog, show, onSave }) {
	const { getFieldDecorator } = form;
	const { match } = useReactRouter();
	const { user } = useAuthState(firebase.auth());
	// const dog = useDocument(dogDoc);

	const { dogId, showId } = match.params;

	function submit(e) {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				const docToUse =
					doc ||
					firebase
						.firestore()
						.collection(`dogs/${dogId}/shows/${showId}/runs`)
						.doc();
				const data = {
					date: values['date'].format(),
					description: values.description || '',
					uid: user.uid,
					league: values.league,
					place: values.place,
					name: values.name
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
	let dogData = {};
	let showData = {};

	if (dog.value) dogData = dog.value.data();
	if (show.value) showData = show.value.data();

	function disabledDate(current) {
		if (!showData.startDate || !showData.endDate) return true;
		if (!current) return true;

		const showStartDate = moment(showData.startDate);
		const showEndDate = moment(showData.endDate);

		return !(current >= showStartDate && current <= showEndDate);
	}

	const availableLeagues = Object.keys(dogData.leagues);

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

			<Form.Item label="League">
				{getFieldDecorator('league', {
					rules: [
						{
							required: true,
							message: 'You must pick the league this is for'
						}
					],
					initialValue: data.league
				})(
					<Select>
						{availableLeagues.map((league) => (
							<Select.Option key={league} value={league}>
								{league}
							</Select.Option>
						))}
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
					initialValue: data.date
				})(
					<DatePicker
						format="YYYY-MM-DD"
						disabledDate={disabledDate}
					/>
				)}
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
				})(<InputNumber min={1} />)}
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
