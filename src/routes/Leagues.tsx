import React from 'react';
import LeagueTable from '@/components/tables/LeagueTable';
import { Tabs, Menu, Row, Col } from 'antd';
import { Route, Link } from 'react-router-dom';
import useRouter from 'use-react-router';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import firebase, { firestore } from 'firebase/app';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export interface SportRouteParams {
	leagueId: string;
}

function Sport() {
	const { match } = useRouter<SportRouteParams>();

	return <h1>{match.params.leagueId}</h1>;
}

const sportComponents: { [name: string]: () => JSX.Element } = {
	flyball: Sport,
	agility: Sport
};

function SportNav() {
	const { match } = useRouter<SportRouteParams>();

	const [value, loading, error] = useCollectionOnce(
		firebase.firestore().collection('leagues')
	);

	if (!value || loading) return <Loading />;

	if (error) return <Error error={error} />;

	console.log(value);

	return (
		<Menu selectedKeys={[match.params.leagueId]}>
			{value.docs.map((doc: firestore.QueryDocumentSnapshot) => {
				const data = doc.data();
				return (
					<Menu.Item key={doc.id}>
						<Link to={`/leagues/${doc.id}`}>{data.name}</Link>
					</Menu.Item>
				);
			})}
			{/* <Menu.Item key="agility">
				<Link to="/leagues/agility">Agility</Link>
			</Menu.Item>
			<Menu.Item key="flyball">
				<Link to="/leagues/flyball">FlyBall</Link>
			</Menu.Item> */}
		</Menu>
	);
}

export default function Leagues() {
	return (
		<>
			<Route
				path="/leagues/:leagueId"
				component={() => {
					const {
						match: {
							params: { leagueId }
						}
					} = useRouter<SportRouteParams>();
					// let Component = sportComponents[leagueId];

					// if (!Component)
					// 	Component = () => (
					// 		<div>Sorry we don't support that sport yet!</div>
					// 	);

					return (
						<div>
							<Row>
								<Col md={6}>
									<SportNav />
								</Col>
								<Col md={18}>
									<Sport />
								</Col>
							</Row>
						</div>
					);
				}}
			/>

			{/* <Tabs>
				<Tabs.TabPane tab="Beginner" key="1">
					<LeagueTable minGrade={1} maxGrade={2} league="2019" />
				</Tabs.TabPane>

				<Tabs.TabPane tab="Novice" key="2">
					<LeagueTable minGrade={3} maxGrade={5} league="2019" />
				</Tabs.TabPane>

				<Tabs.TabPane tab="Senior" key="3">
					<LeagueTable minGrade={6} maxGrade={7} league="2019" />
				</Tabs.TabPane>
			</Tabs> */}
		</>
	);
}
