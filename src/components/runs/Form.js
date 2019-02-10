import React from 'react';
import { Form, Input, DatePicker, Button, Select, InputNumber } from 'antd';
import firebase from 'firebase/app';
import useReactRouter from 'use-react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useDocument } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Show from '../../routes/Show';
import moment from 'moment';

const { TextArea } = Input;

function RunForm({ form, dog, show, onSave }) {
	const { getFieldDecorator } = form;
	const { match } = useReactRouter();
	const { user } = useAuthState(firebase.auth());
	// const dog = useDocument(dogDoc);

	const { dogId } = match.params;

	function submit(e) {
		e.preventDefault();
		// form.validateFields((err, values) => {
		// 	if (!err) {
		// 		const docToUse =
		// 			doc ||
		// 			firebase
		// 				.firestore()
		// 				.collection(`dogs/${dogId}/shows`)
		// 				.doc();
		// 		const data = {
		// 			startDate: values['start-end'][0].format(),
		// 			endDate: values['start-end'][1].format(),
		// 			name: values.name,
		// 			description: values.description,
		// 			uid: user.uid,
		// 			league: values.league
		// 		};

		// 		if (doc) {
		// 			docToUse.update(data);
		// 		} else {
		// 			docToUse.set(data);
		// 		}

		// 		onSave();
		// 	}
		// });
	}

	let data = {};
	// if (doc) data = doc.data();
	// if (dog.loading) return <Loading />;
	// if (dog.error) return <Error error={dog.error} />;
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
