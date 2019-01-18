import React from 'react';
import { Button } from 'antd';
import useIsAdmin from 'hooks/useIsAdmin';
import useReactRouter from 'use-react-router';

export default function LoginButton() {
	const { isAdmin, loading, error } = useIsAdmin();
	const { history } = useReactRouter();

	function goToAdmin() {
		history.push('/admin');
	}

	if (loading || error || !isAdmin) return null;

	return (
		<Button type="ghost" onClick={goToAdmin}>
			Admin
		</Button>
	);
}
