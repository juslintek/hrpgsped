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

        return Object.keys(firstView.images).map((name, key) => {
            const image = firstView.images[name];
            return <div key={key} className="row"><div className="col-xs-12"><img src={image} className="thumbnail"/></div></div>
        });

    }

    render() {
        const testData = this.props.testData.data;
        const {testInfo, statusText} = testData;
        const isTestComplete = statusText === 'Test Complete';
        console.log(testData);

        return <div className="col-xs-12">
            <div className="well-lg">
                <h3>{statusText}</h3>
                {isTestComplete ? this.getTestResultsImages(testData) : ''}
            </div>
        </div>;
    }
}

export default ResultsDisplay;
