import React from 'react';
import { Form, Input, DatePicker, Button, Select, message } from 'antd';
import firebase from 'firebase/app';
import useReactRouter from 'use-react-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';
import posed, { PoseGroup } from 'react-pose';
import AgilityFields from '@/components/runs/sports/Agility';
import FlyballFields from '@/components/runs/sports/Flyball';

const ExtraFields = posed.div({
	enter: {
		y: 0,
		opacity: 1,
		delay: 300,
		transition: {
			y: { type: 'spring', stiffness: 1000, dampning: 15 },
			default: { duration: 300 }
		}
	},
	exit: {
		y: 50,
		opacity: 0,
		transition: { duration: 150 }
	}
});

const { TextArea } = Input;

function RunForm({ form, doc, dog, run, onSave }) {
	const { getFieldDecorator } = form;
	const { match } = useReactRouter();
	const { user } = useAuthState(firebase.auth());
	const { dogId } = match.params;
	const [loading, setLoading] = React.useState(false);
	const [sport, setSport] = React.useState('');

	const sportSpecificFields = {
		agility: AgilityFields,
		flyball: FlyballFields
	};

	const SpecificFields = sportSpecificFields[sport] || null;

	function submit(e) {
		e.preventDefault();
		form.validateFields(async (err, values) => {
			if (!err) {
				setLoading(true);
				const addRun = firebase.functions().httpsCallable('addRun');

				const data = {
					...values,
					date: values['date'].format(),
					description: values.description || '',
					uid: user.uid,
					docId: (doc && doc.id) || null,
					dogId
				};

				console.log(data);
				try {
					const success = await addRun(data);
					console.log('successfully added run', success);
				} catch (e) {
					console.error(e);
					message.error('Saving your run failed, please try again');
				} finally {
					setLoading(false);
				}

				form.resetFields();

				onSave && typeof onSave === 'function' && onSave();
			}
		});
	}

	let data = {};
	if (doc) data = doc.data();

	const dogData = dog.value.data();
	const dogLeagues = Object.entries(dogData.leagues);

	React.useEffect(() => {
		if (data.league) {
			const selectedLeague = dogLeagues.find(
				([leagueId]) => leagueId === data.league
			);

			if (selectedLeague && selectedLeague[1]) {
				setSport(selectedLeague[1].sport);
			}
		}
	}, [data.league, dogLeagues]);

	function handleLeagueChange(e) {
		const selectedLeague = dogLeagues.find(
			([leagueId, data]) => leagueId === e
		);
		if (selectedLeague && selectedLeague[1]) {
			setSport(selectedLeague[1].sport);
		}
	}

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
			<Form.Item label="League">
				{getFieldDecorator('league', {
					rules: [
						{
							required: true,
							message: 'You must select a league.'
						}
					],
					initialValue: data.league
				})(
					<Select onChange={handleLeagueChange}>
						<Select.Option key="none" value={null} />
						{dogLeagues.map(([id, data]) => {
							return (
								<Select.Option key={id} value={id}>
									{data.name} ({data.sport})
								</Select.Option>
							);
						})}
					</Select>
				)}
			</Form.Item>
			<div>
				{/* This is where sport-specific fields go, if they exist */}
				{/* The custom fields are loading, but their data is not bound, and the validation is not working */}
				{/* https://ant.design/components/form/#components-form-demo-dynamic-form-item */}
				<PoseGroup>
					{SpecificFields && (
						<ExtraFields key="fields">
							<SpecificFields
								form={form}
								getFieldDecorator={getFieldDecorator}
								data={data}
							/>
						</ExtraFields>
					)}
				</PoseGroup>
			</div>
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
			<Button block htmlType="submit" loading={loading}>
				Save
			</Button>
		</Form>
	);
}

export default Form.create({ name: 'runForm' })(RunForm);
