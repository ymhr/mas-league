import React from 'react';
import { useDoc } from 'hooks/firebase';
import Loading from 'components/Loading';
import { Button, Col, Row } from 'antd';

function Dog({ id, grade }) {
	const { loading, error, value } = useDoc('dogs', id);

	if (loading || error || !value) return <Loading />;

	const data = value.data();

	return (
		<p>
			{data.name} (Grade: {grade})
		</p>
	);
}

export default function League({ doc }) {
	const data = doc.data();

	const dogs = (data && data.dogs && Object.keys(data.dogs)) || [];
	const details = (data && data.dogs && Object.values(data.dogs)) || [];

	return (
		<>
			<Row>
				<Col xs={24} sm={12}>
					<h2>{doc.id}</h2>
				</Col>
				<Col xs={24} sm={12}>
					<Button type="primary" icon="plus">
						Add dog
					</Button>
				</Col>
			</Row>
			<ul>
				{dogs.map((dog, i) => (
					<Dog key={dog} id={dog} grade={details[i].grade} />
				))}
			</ul>
		</>
	);
}
