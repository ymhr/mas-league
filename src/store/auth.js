import produce from 'immer';

const currentUser = JSON.parse(localStorage.getItem('user'));

const defaultState = {
	user: currentUser || null
};

export default function auth(state = defaultState, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case 'LOGIN':
				draft.user = action.payload;
				break;
			case 'LOGOUT':
				draft.user = null;
				break;
			default:
				break;
		}
	});
}
