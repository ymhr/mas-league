import React from 'react';
import LeagueTable from '@/components/tables/LeagueTable';
import { Tabs, Menu, Row, Col } from 'antd';
import { Route, Link, Switch } from 'react-router-dom';
import useRouter from 'use-react-router';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import firebase, { firestore } from 'firebase/app';
import Loading from '@/components/Loading';
import Error from '@/components/Error';

export interface SportRouteParams {
	leagueId: string;
	page: string | undefined;
}

function Sport() {
	const { match, history, location } = useRouter<SportRouteParams>();
	const params = new URLSearchParams(location.search);

	const activeTab = params.get('page') || '1';

	function onChange(e: any) {
		history.push(`${location.pathname}?page=${e}`);
	}

	return (
		<Tabs activeKey={activeTab} onChange={onChange}>
			<Tabs.TabPane tab="Beginner" key="1">
				<LeagueTable
					minGrade={1}
					maxGrade={2}
					league={match.params.leagueId}
				/>
			</Tabs.TabPane>

			<Tabs.TabPane tab="Novice" key="2">
				<LeagueTable
					minGrade={3}
					maxGrade={5}
					league={match.params.leagueId}
				/>
			</Tabs.TabPane>

			<Tabs.TabPane tab="Senior" key="3">
				<LeagueTable
					minGrade={6}
					maxGrade={7}
					league={match.params.leagueId}
				/>
			</Tabs.TabPane>
		</Tabs>
	);
}

function SportNav() {
	const { location } = useRouter<SportRouteParams>();

	const [value, loading, error] = useCollectionOnce(
		firebase.firestore().collection('leagues')
	);

	if (!value || loading) return <Loading />;

	if (error) return <Error error={error} />;

	return (
		<Menu selectedKeys={[location.pathname]}>
			{value.docs.map((doc: firestore.QueryDocumentSnapshot) => {
				const data = doc.data();
				return (
					<Menu.Item key={`/leagues/${doc.id}`}>
						<Link to={`/leagues/${doc.id}`}>
							{data.name} ({data.sport})
						</Link>
					</Menu.Item>
				);
			})}
		</Menu>
	);
}

export default function Leagues() {
	return (
		<>
			<Row>
				<Col md={6}>
					<SportNav />
				</Col>
				<Col md={18}>
					<Switch>
						<Route path="/leagues/:leagueId" component={Sport} />
						<Route
							component={() => (
								<div>
									Please pick a league to view the tables
								</div>
							)}
						/>
					</Switch>
				</Col>
			</Row>

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
