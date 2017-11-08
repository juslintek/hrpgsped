import PropTypes from 'prop-types';
import React, {Component} from 'react';

class ResultsDisplay extends Component {
    static PropTypes = {
        testData: PropTypes.object,
    };

    static defaultProps = {
        testData: {}
    };

    getTestResultsImages(testData) {
        const { data } = testData;
        const { median } = data;
        const { firstView } = median;



    }

    render() {
        const testData = this.props.testData.data;
        const {testInfo, statusText} = testData;
        const isTestComplete = statusText === 'Test Complete';
        console.log(testData);

        return <div className="col-xs-12">
            <div className="well-lg">
                <h3>{statusText}</h3>
                {isTestComplete ? Object.keys(testData.median).map(run => testData.median[run].images.map(image => {
                    return <img src={image}/>
                })) : ''}
            </div>
        </div>;
    }
}

export default ResultsDisplay;
