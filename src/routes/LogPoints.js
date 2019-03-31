import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import firebase from 'firebase/app';
import { List, Button, Modal, Popconfirm } from 'antd';
import Form from '@/components/runs/Form';
import { useDoc } from '@/hooks/firebase';
// import isDogInCurrentLeague from '@/utils/isDogInCurrentLeague';

export default function LogPoints({ match }) {
	const { dogId } = match.params;

	const [addModalOpen, setAddModelOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState({});

	const dog = useDoc('dogs', dogId);

	const runs = useCollection(
		firebase.firestore().collection(`dogs/${dogId}/runs`)
	);

	if (runs.error || dog.error) return <Error error={runs.error} />;

	if (runs.loading || dog.loading) return <Loading />;

	// const isInCurrentLeague = isDogInCurrentLeague(dog.value);

	function openAddModal() {
		setAddModelOpen(true);
	}

	function openEditModal(runId) {
		setEditModalOpen({
			[runId]: true
		});
	}

	function closeModal() {
		setAddModelOpen(false);
		setEditModalOpen({});
	}

	function deleteRun(run) {
		const document = firebase
			.firestore()
			.collection(`dogs/${dogId}/runs`)
			.doc(run.id);
		document.delete();
	}

	// if (!isInCurrentLeague)
	// 	return <p>You have not been added to this years league yet.</p>;

	return (
		<>
			<List
				header={<h1>Runs</h1>}
				footer={
					<Button block icon="plus" onClick={openAddModal}>
						Add
					</Button>
				}
				dataSource={runs.value.docs}
				renderItem={run => {
					const data = run.data();
					return (
						<List.Item>
							{data.showName} - {data.grade}{' '}
							{data.gradedOrCombined} - placed {data.place} (
							{data.leagueName}, <em>{data.leagueSport}</em>)
							<Button
								icon="edit"
								shape="circle"
								onClick={openEditModal.bind(null, run.id)}
							/>
							<Popconfirm
								title="Are you sure you want to delete this dog? It is not possible to reverse this."
								onConfirm={deleteRun.bind(null, run)}
							>
								<Button
									icon="delete"
									type="danger"
									shape="circle"
								/>
							</Popconfirm>
							<Modal
								title="Edit a run"
								visible={editModalOpen[run.id]}
								onCancel={closeModal}
								footer={<></>}
							>
								<Form onSave={closeModal} dog={dog} doc={run} />
							</Modal>
						</List.Item>
					);
				}}
			/>
			<Modal
				title="Add a run"
				visible={addModalOpen}
				onCancel={closeModal}
				footer={<></>}
			>
				<Form onSave={closeModal} dog={dog} />
			</Modal>
		</>
	);
}
