import React from 'react';
import { Button } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';
import useReactRouter from 'use-react-router';

export default function LoginButton() {
	const { initialising, user } = useAuthState(firebase.auth());
	const { history } = useReactRouter();

	function login() {
		history.push('/login');
	}

	function logout() {
		firebase
			.auth()
			.signOut()
			.then(() => history.push('/'));
	}

	if (initialising) return null;

	return user ? (
		<Button type="ghost" onClick={logout}>
			Log out
		</Button>
	) : (
		<Button type="primary" onClick={login}>
			Log in
		</Button>
	);
}
