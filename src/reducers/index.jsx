import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import * as storage from 'redux-storage'

import posts from './posts_reducer';
import menus from './menu_reducer';
import wptLocations from './web_page_test/get/locations';
import wptRunTestResponse from './web_page_test/run/test';

export default storage.reducer(combineReducers({
    posts,
    menus,
    wptLocations,
    wptRunTestResponse,
    router: routerReducer
}));
