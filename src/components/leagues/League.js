import React, { useState } from 'react';
import { useDoc } from 'hooks/firebase';
import Loading from 'components/Loading';
import { Button, Col, Row, Modal } from 'antd';
import DogSelector from 'components/admin/DogSelector';
import firebase from 'firebase/app';

function Dog({ id, grade }) {
	const { loading, error, value } = useDoc('dogs', id);

	if (loading || error || !value) return <Loading />;

	const data = value.data();

	return (
		<p>
			{data.name} (Grade: {grade})
		</p>
	);
}

export default function League({ doc }) {
	const [modalOpen, setModalOpen] = useState(false);
	const { loading, error, value } = useDoc('leagues', doc.id);

	if (loading || error) return <Loading />;

	const data = doc.data();

	const dogs = (data && data.dogs && Object.keys(data.dogs)) || [];
	const details = (data && data.dogs && Object.values(data.dogs)) || [];

	function openModal() {
		setModalOpen(true);
	}

	function closeModal() {
		setModalOpen(false);
	}

	function onSelect(dog) {
		const dogData = dog.data();
		const leagueData = doc.data();

		const entry = { grade: dogData.grade };

		const leagueDogs = { ...leagueData.dogs, [dog.id]: entry };

		firebase
			.firestore()
			.collection('leagues')
			.doc(doc.id)
			.update({ dogs: leagueDogs });
	}

	return (
		<>
			<Row>
				<Col xs={24} sm={12}>
					<h2>{doc.id}</h2>
				</Col>
				<Col xs={24} sm={12}>
					<Button type="primary" icon="plus" onClick={openModal}>
						Add dogs
					</Button>
				</Col>
			</Row>
			<ul>
				{dogs.map((dog, i) => (
					<Dog key={dog} id={dog} grade={details[i].grade} />
				))}
			</ul>
			<Modal
				title="Select a dog"
				visible={modalOpen}
				onOk={closeModal}
				onCancel={closeModal}
			>
				<DogSelector leagueId={doc.id} onSelect={onSelect} />
			</Modal>
		</>
	);
}
