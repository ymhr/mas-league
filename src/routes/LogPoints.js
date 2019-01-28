import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from 'components/Loading';
import Error from 'components/Error';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute';
import Show from 'routes/Show';
import { List, Button } from 'antd';
import Form from 'components/shows/Form';

export default function LogPoints({ match }) {
	const { dogId } = match.params;
	const dogDoc = firebase
		.firestore()
		.collection('dogs')
		.doc(dogId);

	const showsCollection = dogDoc.collection('shows');

	const shows = useCollection(showsCollection);

	if (shows.error) return <Error error={shows.error} />;

	if (shows.loading) return <Loading />;

	return (
		<>
			<AuthRoute path="/points/:dogId/:showId" component={Show} />
			<List
				header={<h1>Shows</h1>}
				footer={
					<Button block icon="plus">
						Add
					</Button>
				}
				dataSource={shows.value.docs}
				renderItem={(item) => {
					const data = item.data();
					return <List.Item>{data.name}</List.Item>;
				}}
			/>
			<Form />
			{/* {shows.value.docs.map((show) => { */}
			{/* const { name } = show.data(); */}
			{/* return ( */}
			{/* <List header={<h1>Shows</h1>} />
					// <Link key={show.id} to={`/points/${dogId}/${show.id}`}>
					// 	{name


					// </Link> */}
			{/* ); */}
			{/* })} */}
		</>
	);
}
