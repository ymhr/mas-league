import React from 'react';
import { Form, Button, Input, Select, Switch } from 'antd';
import { types } from '@/utils/sportTypes';
import firebase from 'firebase/app';

function LeagueForm({ form, doc, onSave }) {
	const { getFieldDecorator } = form;

	function submit(e) {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				console.log(values);
				const db = firebase.firestore().collection(`leagues`);

				const docToUse = doc && doc.id ? db.doc(doc.id) : db.doc();
				const open = typeof values.open === undefined ? false : true;

				const data = { ...values, open };

				if (doc) {
					docToUse.update(data);
				} else {
					docToUse.set(data);
				}

				form.resetFields();
				if (onSave && typeof onSave === 'function') {
					onSave();
				}
			}
		});
	}

	return (
		<Form onSubmit={submit} layout="vertical">
			<Form.Item label="League name">
				{getFieldDecorator('name', {
					rules: [
						{
							required: true,
							message: 'You must provide a name'
						}
					]
				})(<Input />)}
			</Form.Item>

			<Form.Item label="Sport">
				{getFieldDecorator('sport', {
					rules: [
						{
							required: true,
							message: 'Please pick a sport'
						}
					]
				})(
					<Select>
						{types.map(type => (
							<Select.Option key={type} value={type}>
								{type}
							</Select.Option>
						))}
					</Select>
				)}
			</Form.Item>
			<Form.Item label="Open or closed">
				{getFieldDecorator('open')(
					<Switch checkedChildren="Open" unCheckedChildren="Closed" />
				)}
			</Form.Item>
			<Button htmlType="submit" type="primary" block>
				Save
			</Button>
		</Form>
	);
}

export default Form.create({ name: 'leagueForm' })(LeagueForm);
