import {combineReducers} from 'redux';
import * as storage from 'redux-storage'

import wptLocations from './web_page_test/get/locations';
import wptRunTestResponse from './web_page_test/run/test';
import wptTestStatus from './web_page_test/get/test_status';
import testers from './web_page_test/get/testers';
import isCanceled from './web_page_test/cancel/test'

export default storage.reducer(combineReducers({
    wptLocations,
    wptTestStatus,
    testers,
    isCanceled,
    wptRunTestResponse
}));
