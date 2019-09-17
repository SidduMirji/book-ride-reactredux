import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import uiReducers from './reducers/uiReducers'
import dataReducer from './reducers/dataReducer'

const initialState = {};

const middleware = [thunk];

const rootReducer = combineReducers({
    user: userReducer,
    data: dataReducer,
    UI: uiReducers
});

// Redux store which hold the application state
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware))
);

export default store;