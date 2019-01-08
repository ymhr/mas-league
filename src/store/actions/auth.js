import { actions } from 'store/auth';

export function loading(mode) {
	return { type: actions.LOADING, payload: mode };
}
export function login(user) {
	return (dispatch) => {
		dispatch({ type: actions.LOADING, payload: true });
		localStorage.setItem('user', JSON.stringify(user));
		dispatch({ type: actions.LOGIN, payload: user });
		dispatch({ type: actions.LOADING, payload: false });
	};
}
