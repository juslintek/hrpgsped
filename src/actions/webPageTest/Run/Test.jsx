import wpt from '../wptPublic';

export const WPT_RUN_TEST = 'WPT_RUN_TEST';

export function wptRunTest(property, params) {
    return function (dispatch) {
        wpt.runTest(params.url, params.options, (error, response) => {
            if (response.statusCode === 200) {
                const { testId/*, ownerKey, jsonUrl*/ } = response.data;

                const intervalId = setInterval(() => {
                    wpt.getTestStatus(testId, (error, response2) => {
                        const responseData = response2.data;
                        if(responseData.statusText === 'Test Complete') {
                            clearInterval(intervalId);
                            wpt.getTestResults(testId, (error, response3) => {
                                dispatch({
                                    type: WPT_RUN_TEST,
                                    payload: {
                                        data: response3,
                                        error: false
                                    }
                                });
                            });
                        } else {
                            dispatch({
                                type: WPT_RUN_TEST,
                                payload: {
                                    data: responseData,
                                    error: false
                                }
                            });
                        }
                    });
                }, 1000);
            }
        });
    }
}
