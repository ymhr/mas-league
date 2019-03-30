import React, { useState } from 'react';
import League from '@/components/leagues/League';
import Loading from '@/components/Loading';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, Modal, Form, Input, Select, Switch } from 'antd';
import { types } from '@/utils/sportTypes';

function List({ form, doc }) {
	const { getFieldDecorator } = form;
	const { loading, error, value } = useCollection(
		firebase.firestore().collection('leagues')
	);
	const [modalOpen, setModalOpen] = useState(false);

	if (loading || error) return <Loading />;

	function toggleModal() {
		setModalOpen(!modalOpen);
	}

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
				setModalOpen(false);
			}
		});
	}

	return (
		<>
			<Button icon="plus" block onClick={toggleModal}>
				Create new league
			</Button>
			<Modal
				title="Add a new league"
				visible={modalOpen}
				onOk={toggleModal}
				onCancel={toggleModal}
				footer=""
				// footer={<Button htmlType="submit">Save</Button>}
			>
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
							<Switch
								checkedChildren="Open"
								unCheckedChildren="Closed"
							/>
						)}
					</Form.Item>
					<Button htmlType="submit" type="primary" block>
						Save
					</Button>
				</Form>
			</Modal>
			<br />
			<br />
			{value.docs.map(doc => (
				<League doc={doc} key={doc.id} />
			))}
		</>
	);
}

export default Form.create({ name: 'NewLeagueForm' })(List);
