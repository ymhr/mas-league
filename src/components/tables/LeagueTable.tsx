import React from 'react';
import firebase from 'firebase/app';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import { Table } from 'antd';
import Error from '@/components/Error';

interface Props {
	league: string;
	minGrade: number;
	maxGrade: number;
}

interface DogData {
	[prop: string]: any;
	key: string;
	grade: string;
	points: number;
}

export default function LeagueTable({ league, minGrade, maxGrade }: Props) {
	const query = firebase
		.firestore()
		.collection('dogs')
		.where(`leagues.${league}.grade`, '>=', minGrade)
		.where(`leagues.${league}.grade`, '<=', maxGrade)
		.orderBy(`leagues.${league}.grade`, 'desc');

	const [value, loading, error] = useCollection(query);

	if (loading || !value) return <Loading />;
	if (error) return <Error error={error} />;

	let data = value.docs
		.map((doc): DogData | null => {
			const data = doc.data();
			if (!data.leagues[league]) return null;
			return {
				...doc.data(),
				key: doc.id,
				grade: data.leagues[league].grade,
				points: data.leagues[league].points
			};
		})
		.filter((dog): dog is DogData => !!dog);

	/*
		There is a significant limitation to firestore, where if you query with a `where`, the first orderBy MUST be the same column as that where.
		This means that, in this case, dogs in a higher grade will _always_ appear above dogs with a lower grade, _regardless of whether or not they have more points_.
		This is a ridiculous requirement, and it means that I must do the sorting here, rather than in the query.
	*/
	data.sort((a, b) => {
		return a.points > b.points ? -1 : 1;
	});

	const scores = data.map(doc => doc.points);

	data = data.map(doc => {
		const place = scores.findIndex(score => score === doc.points) + 1;
		return { ...doc, place };
	});

	const columns = [
		{
			title: 'Place',
			dataIndex: 'place',
			key: 'place'
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Grade',
			dataIndex: 'grade',
			key: 'grade'
		},
		{
			title: 'Points',
			dataIndex: 'points',
			key: 'points'
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
