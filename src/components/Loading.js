import React, { useEffect, useState } from 'react';

export default function Loading() {
	const [show, setShow] = useState(false);
	useEffect(() => {
		setTimeout(() => setShow(true), 1000);
	}, []);
	return show && <div>Loading...</div>;
}
