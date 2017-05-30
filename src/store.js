import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import combinedReducers from './reducers';
import { routerMiddleware } from 'react-router-redux';


const history = createHistory()

const appliedMiddleware = applyMiddleware(thunk, promise(), createLogger(), routerMiddleware(history));

export default createStore(combinedReducers, appliedMiddleware);