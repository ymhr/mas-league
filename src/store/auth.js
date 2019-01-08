import produce from 'immer';

const currentUser = JSON.parse(localStorage.getItem('user'));

const defaultState = {
	user: currentUser || null,
	loading: true
};

export const actions = {
	LOADING: 'LOADING',
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT'
};

export default function auth(state = defaultState, action) {
	return produce(state, (draft) => {
		console.log(action);
		switch (action.type) {
			case actions.LOGIN:
				draft.user = action.payload;
				break;
			case actions.LOGOUT:
				draft.user = null;
				break;
			case actions.LOADING:
				draft.loading = action.payload || false;
				break;
			default:
				break;
		}
	});
}
