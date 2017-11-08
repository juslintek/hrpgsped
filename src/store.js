import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import {routerMiddleware} from 'react-router-redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import combinedReducers from './reducers';

const engine = createEngine('56a89czxc987q49wdxc'),
    middleware = storage.createMiddleware(engine),
    history = createHistory(),
    appliedMiddleware = applyMiddleware(thunk, middleware, promise(), createLogger(), routerMiddleware(history)),
    store = createStore(combinedReducers, appliedMiddleware);

export { engine };
export default store;
