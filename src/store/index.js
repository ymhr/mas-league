import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import { configureStore } from 'redux-starter-kit';
import ReduxThunk from 'redux-thunk';
import auth from 'store/auth';

const rootReducer = combineReducers({ auth });

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(ReduxThunk)
	)
);

// const store = configureStore({ reducer: rootReducer });

export default store;
