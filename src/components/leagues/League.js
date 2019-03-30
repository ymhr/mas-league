import React, { useState } from 'react';
import { useDoc } from '@/hooks/firebase';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { Button, Modal, List, Popconfirm, Collapse } from 'antd';
import DogSelector from '@/components/admin/DogSelector';
import firebase from 'firebase/app';

function Dog({ id, grade, remove }) {
	const { loading, error, value } = useDoc('dogs', id);

	if (loading || error || !value) return <Loading />;

	const data = value.data();

	if (!data) return <Error error={`No dog with for ${id}`} />;

	return (
		<p>
			{data.name} (Grade: {grade}){' '}
			<Popconfirm
				title="Are you sure you want to delete this dog? It is not possible to reverse this."
				onConfirm={remove.bind(null, value)}
			>
				<Button icon="delete" type="danger" shape="circle" />
			</Popconfirm>
		</p>
	);
}

export default function League({ doc }) {
	const [modalOpen, setModalOpen] = useState(false);
	// const { loading, error, value } = useDoc('leagues', doc.id);

	// if (loading || error) return <Loading />;

	const data = doc.data();
	const dogs = (data && data.dogs && Object.entries(data.dogs)) || [];
	// const details = (data && data.dogs && Object.values(data.dogs)) || [];

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

	function removeDogFromLeague(dog) {
		const leagueData = doc.data();

		const leagueDogs = { ...leagueData.dogs };

		delete leagueDogs[dog.id];

		firebase
			.firestore()
			.collection('leagues')
			.doc(doc.id)
			.update({ dogs: leagueDogs });
	}

	return (
		<Collapse>
			<Collapse.Panel
				header={
					<h2>
						{data.name} ({data.sport})
					</h2>
				}
			>
				<Button
					type="primary"
					icon="plus"
					onClick={openModal}
					block
					disabled={!data.open}
				>
					Add dogs
				</Button>
				<List
					dataSource={dogs}
					renderItem={([dog, details]) => (
						<Dog
							id={dog}
							grade={details.grade}
							remove={removeDogFromLeague}
						/>
					)}
				/>
				<Modal
					title="Select a dog"
					visible={modalOpen}
					onOk={closeModal}
					onCancel={closeModal}
				>
					<DogSelector leagueId={doc.id} onSelect={onSelect} />
				</Modal>
			</Collapse.Panel>
		</Collapse>
	);
}
