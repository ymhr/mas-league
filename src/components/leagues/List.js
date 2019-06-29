import React, { useState } from 'react';
import League from '@/components/leagues/League';
import Loading from '@/components/Loading';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, Modal } from 'antd';
import Form from '@/components/leagues/Form';

export default function List({ form, doc }) {
	const [value, loading, error] = useCollection(
		firebase.firestore().collection('leagues')
	);
	const [modalOpen, setModalOpen] = useState(false);

	if (loading || error) return <Loading />;

	function toggleModal() {
		setModalOpen(!modalOpen);
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
			>
				<Form onSave={toggleModal} doc={doc} />
			</Modal>
			<br />
			<br />
			{value.docs.map((doc) => (
				<League doc={doc} key={doc.id} />
			))}
		</>
	);
}
