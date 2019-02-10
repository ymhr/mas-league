import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDoc } from '@/hooks/firebase';
import firebase from 'firebase/app';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import { Button, List, Modal } from 'antd';
import Form from '@/components/runs/Form';

export default function Show({ match }) {
	const { dogId, showId } = match.params;
	const [modalOpen, setModalOpen] = useState(false);

	const runs = useCollection(
		firebase.firestore().collection(`/dogs/${dogId}/shows/${showId}/runs`)
	);

	const dog = useDoc('dogs', dogId);
	const show = useDoc(`dogs/${dogId}/shows`, showId);

	if (runs.loading || dog.loading || show.loading) return <Loading />;
	if (runs.error) return <Error error={runs.error} />;
	if (dog.error) return <Error error={dog.error} />;
	if (show.error) return <Error error={show.error} />;

	// const dogData = dog.value.data();
	const showData = show.value.data();

	function openModal() {
		setModalOpen(true);
	}

	function closeModal() {
		setModalOpen(false);
	}

	return (
		<>
			<h3>
				Runs for {showData.name} ({showData.league})
			</h3>
			<>
				<List
					header={<h1>Shows</h1>}
					footer={
						<Button block icon="plus" onClick={openModal}>
							Add
						</Button>
					}
					dataSource={runs.value.docs}
					renderItem={(run) => {
						const data = run.data();
						console.log(data);
						return (
							<List.Item>
								{data.name} ({data.league})
							</List.Item>
						);
					}}
				/>
				<Modal
					title="Add a show"
					visible={modalOpen}
					onCancel={closeModal}
					footer={<></>}
				>
					<Form onSave={closeModal} dog={dog} show={show} />
				</Modal>
			</>
		</>
	);
}
