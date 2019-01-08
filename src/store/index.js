import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
// import { configureStore } from 'redux-starter-kit';
import ReduxThunk from 'redux-thunk';
import auth from 'store/auth';

const rootReducer = combineReducers({ auth });

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(ReduxThunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

// const store = configureStore({ reducer: rootReducer });

export default store;
