import {WPT_GET_TESTERS} from "../../../actions";

export default function (state = [], action) {
    if (action.type === WPT_GET_TESTERS) {
        return action.payload;
    }
    return state;
}
