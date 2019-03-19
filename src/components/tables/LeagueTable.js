import React from 'react';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import { Table } from 'antd';
import Error from '@/components/Error';

export default function LeagueTable({ league, minGrade, maxGrade }) {
	const query = firebase
		.firestore()
		.collection('dogs')
		.where(`leagues.${league}.grade`, '>=', minGrade)
		.where(`leagues.${league}.grade`, '<=', maxGrade)
		.orderBy(`leagues.${league}.grade`, 'desc');
	// .orderBy(`leagues.${league}.points`, 'desc');

	const competitors = useCollection(query);

	if (competitors.loading) return <Loading />;
	if (competitors.error) return <Error error={competitors.error} />;

	let data = competitors.value.docs.map((doc) => ({
		...doc.data(),
		key: doc.id
	}));

	/*
		There is a significant limitation to firestore, where if you query with a `where`, the first orderBy MUST be the same column as that where.
		This means that, in this case, dogs in a higher grade will _always_ appear above dogs with a lower grade, _regardless of whether or not they have more points_.
		This is a ridiculous requirement, and it means that I must do the sorting here, rather than in the query.
	*/
	data.sort((a, b) => {
		return a.leagues[league].points > b.leagues[league].points ? -1 : 1;
	});

	data = data.map((doc, index) => ({ ...doc, index: index + 1 }));

	const columns = [
		{
			title: 'Place',
			dataIndex: 'index',
			key: 'index'
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Grade',
			dataIndex: 'leagues.2019.grade',
			key: 'leagues.2019.grade'
		},
		{
			title: 'Points',
			dataIndex: 'leagues.2019.points',
			key: 'leagues.2019.points'
		}
	];

	return (
		<Table
			dataSource={data}
			columns={columns}
			pagination={false}
			locale={{ emptyText: 'No dogs entered yet!' }}
		/>
	);
}
