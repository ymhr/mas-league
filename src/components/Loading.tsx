import React, { useEffect, useState, useRef } from 'react';
import { Spin } from 'antd';

export default function Loading() {
	const [show, setShow] = useState(false);
	const timeout = useRef(0);

	useEffect(() => {
		timeout.current = setTimeout(() => setShow(true), 1000);
		return () => clearTimeout(timeout.current);
	}, []);

	if (show) return <Spin />;

	return null;
}
