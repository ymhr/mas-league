import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import auth from 'store/auth';

const rootReducer = combineReducers({ auth });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

store.subscribe(() => console.log(store.getState()));

export default store;
