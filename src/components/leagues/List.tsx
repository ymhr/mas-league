import React, { useState } from 'react';
import League from '@/components/leagues/League';
import Loading from '@/components/Loading';
import firebase, { firestore } from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Button, Modal } from 'antd';
import Form from '@/components/leagues/Form';

interface Props {
	doc?: firestore.DocumentReference;
}

export default function List({ doc }: Props) {
	const [value, loading, error] = useCollection(
		firebase.firestore().collection('leagues')
	);
	const [modalOpen, setModalOpen] = useState(false);

	if (loading || error || !value) return <Loading />;

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
