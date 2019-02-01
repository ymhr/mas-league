import React from 'react';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import { Table } from 'antd';

export default function LeagueTable() {
	//TODO: Make the year dynamic, make the grade range dynamic
	const query = firebase
		.firestore()
		.collection('dogs')
		.where('leagues.2019.grade', '>=', 1)
		.where('leagues.2019.grade', '<=', 2)
		.orderBy('leagues.2019.grade', 'desc')
		.orderBy('leagues.2019.points', 'desc');

	const beginners = useCollection(query);

	if (beginners.loading) return <Loading />;
	if (beginners.error) {
		console.error(beginners.error);
		return <h1>Error</h1>;
	}

	const data = beginners.value.docs.map(doc => ({
		...doc.data(),
		key: doc.id
	}));

	const columns = [
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

	return <Table dataSource={data} columns={columns} pagination={false} />;
}
