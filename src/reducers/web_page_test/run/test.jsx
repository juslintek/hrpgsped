import {WPT_RUN_TEST} from "../../../actions";

export default function (state = [], action) {
    if (action.type === WPT_RUN_TEST) {
        return action.payload;
    }
    return state;
}
