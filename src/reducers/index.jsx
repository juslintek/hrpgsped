import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts_reducer';
import menus from './menu_reducer';

export default combineReducers({
    posts,
    menus,
    router: routerReducer
});
