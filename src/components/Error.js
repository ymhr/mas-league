import React from 'react';
export default function Error({ error }) {
	console.error(error);
	return <p>An error occurred</p>;
}
