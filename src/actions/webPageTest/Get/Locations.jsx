import wpt from '../wptPublic';

export const WPT_GET_LOCATIONS = 'WPT_GET_LOCATIONS';

export function wptGetLocations(options) {
    return function (dispatch) {
        wpt.getLocations({ protocol: 'http' }, function (error, response) {
            dispatch({
                type: WPT_GET_LOCATIONS,
                payload: response.response.statusCode === 200 ? {
                    data: response.response.data.location,
                    error: false
                } : {
                    data: [],
                    errorData: error,
                    error: true
                }
            });
        });
    }
}
