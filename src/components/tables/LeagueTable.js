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
		.orderBy(`leagues.${league}.grade`, 'desc')
		.orderBy(`leagues.${league}.points`, 'desc');

	const competitors = useCollection(query);

	if (competitors.loading) return <Loading />;
	if (competitors.error) return <Error error={competitors.error} />;

	const data = competitors.value.docs.map((doc, index) => ({
		...doc.data(),
		key: doc.id,
		index: index + 1
	}));

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
