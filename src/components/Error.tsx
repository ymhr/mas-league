import React from 'react';

interface Props {
	error: any;
}

export default function Error({ error }: Props) {
	console.error(error);
	return <p>An error occurred</p>;
}
