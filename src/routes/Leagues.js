import React from 'react';
import LeagueTable from '@/components/tables/LeagueTable';
import { Tabs } from 'antd';

export default function Home() {
	return (
		<>
			<Tabs>
				<Tabs.TabPane tab="Beginner" key={1}>
					<LeagueTable minGrade={1} maxGrade={2} league="2019" />
				</Tabs.TabPane>

				<Tabs.TabPane tab="Novice" key={2}>
					<LeagueTable minGrade={3} maxGrade={5} league="2019" />
				</Tabs.TabPane>

				<Tabs.TabPane tab="Senior" key={3}>
					<LeagueTable minGrade={6} maxGrade={7} league="2019" />
				</Tabs.TabPane>
			</Tabs>
		</>
	);
}
