import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import firebase, { firestore } from 'firebase/app';
import { List, Button, Modal, Popconfirm } from 'antd';
import Form from '@/components/runs/Form';
import { useDoc } from '@/hooks/firebase';
import useRouter from 'use-react-router';

export default function LogPoints() {
	const { match } = useRouter<{ dogId: string }>();
	const { dogId } = match.params;

	const [addModalOpen, setAddModelOpen] = useState(false);
	const [editModalOpen, setEditModalOpen] = useState<{
		[name: string]: boolean;
	}>({});

	const [dog, dogLoading, dogError] = useDoc('dogs', dogId);

	const [value, loading, error] = useCollection(
		firebase.firestore().collection(`dogs/${dogId}/runs`)
	);

	if (error || dogError) return <Error error={error} />;

	if (loading || dogLoading || !value || !dog) return <Loading />;

	function openAddModal() {
		setAddModelOpen(true);
	}

	function openEditModal(runId: string) {
		setEditModalOpen({
			[runId]: true
		});
	}

	function closeModal() {
		setAddModelOpen(false);
		setEditModalOpen({});
	}

	function deleteRun(run: firestore.DocumentData) {
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
				dataSource={value.docs}
				renderItem={(run) => {
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
