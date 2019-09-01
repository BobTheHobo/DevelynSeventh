import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';

const initialState = {};

const reduxMiddlewares = applyMiddleware(
    logger
);

export const appReduxStore = createStore( rootReducer, initialState, reduxMiddlewares);