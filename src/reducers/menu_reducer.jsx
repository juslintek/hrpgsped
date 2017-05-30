import {FETCH_MAIN_MENU} from '../actions';

export default function (state = [], action) {
	if (action.type === FETCH_MAIN_MENU) {
		return action.payload;
	}
    return state;
}