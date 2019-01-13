import { createContext } from 'react';
import store from 'store';

// let defaultValue = null;

// const currentUser = store.getState().auth.user;
// if (currentUser) {
// 	defaultValue = currentUser;
// }

const FirebaseAuthContext = createContext([null, () => {}]);

export default FirebaseAuthContext;
