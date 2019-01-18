import React from 'react';
import { useDoc } from 'hooks/firebase';
import Loading from 'components/Loading';

function Dog({ id }) {
	const { loading, error, value } = useDoc('dogs', id);

	if (loading || error || !value) return <Loading />;

	const data = value.data();

	return <p>{data.name}</p>;
}

export default function League({ doc }) {
	const { dogs } = doc.data();

	return (
		<>
			{doc.id}
			<ul>
				{dogs.map((dog) => (
					<Dog key={dog} id={dog} />
				))}
			</ul>
		</>
	);
}
