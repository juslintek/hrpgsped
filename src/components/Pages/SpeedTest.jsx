import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

import {wptGetLocations, wptRunTest} from '../../actions';

import LocationSelect from '../Elements/LocationSelect';
import BrowserSelect from '../Elements/BrowserSelect';
import ConnectivitySelect from '../Elements/ConnectivitySelect';
import ResultsDisplay from '../Elements/ResultsDisplay';

class SpeedTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            websiteUrl: 'https://hosting.review',
            currentLocation: 'ec2-us-east-1',
            currentBrowser: 'Chrome',
            currentConnectivity: 'Native'
        };
    }

    componentWillMount() {
        this.getWPTLocations(this.props, true);
    }

    componentWillReceiveProps(nextProps) {
        this.getWPTLocations(nextProps);
    }

    getWPTLocations(props, willMount = false) {
        if (willMount) {
            this.props.wptGetLocations('wptLocations', this.props.match.params.slug);
        }
    }

    getWPTRunTestData(event) {
        event.preventDefault();

        this.props.wptRunTest('wptRunTestResponse', {
            url: this.state.websiteUrl, options: {
                location: `${this.state.currentLocation}:${this.state.currentBrowser}`,
                connectivity: this.state.currentConnectivity
            }
        });
    }

    updateBrowsers(currentTarget) {
        console.log(currentTarget);
        const currentBrowsers = currentTarget.Browsers.split(',').map(browser => browser.trim(' '));

        this.setState({browsers: currentBrowsers, currentLocation: currentTarget.id});
    }

    updateWebsiteUrl(event) {
        this.setState({websiteUrl: event.target.value});
    }

    setBrowserNameToState(event) {
        this.setState({currentBrowser: event.target.value});
    }

    setConnectivityNameToState(event) {
        this.setState({currentConnectivity: event.target.value});
    }

    render() {
        const {error, data} = this.props.wptLocations,
            locations = data || [],
            browsers = locations.length > 0 ? locations.filter(location => location.id === this.state.currentLocation)[0].Browsers.split(',') : [];

        return (
            <div className="check-if-website-is-down-wrapper web-page-speed-test container-fluid">
                <form className="form-horizontal clearfix">
                    <h3 className="text-center">{'Test a website\'s performance'}</h3>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Website URL</label>
                        <div className="col-sm-10">
                            <input id="websiteUrl"
                                   className="form-control"
                                   placeholder="Enter a Website URL"
                                   type="url"
                                   required={true}
                                   onChange={this.updateWebsiteUrl.bind(this)}
                                   value={this.state.websiteUrl}
                            />
                        </div>
                    </div>
                    {!error && locations.length > 0 ?
                        <LocationSelect locations={locations}
                                        currentLocation={this.state.currentLocation}
                                        updateBrowsers={this.updateBrowsers.bind(this)}/> : ''}
                    {!error && locations.length > 0 && browsers.length > 0 ?
                        <BrowserSelect browsers={browsers}
                                       currentBrowser={this.state.currentBrowser}/> : ''}
                    {!error && locations.length > 0 ?
                        <ConnectivitySelect currentConnectivity={this.state.currentConnectivity}
                                            onChange={this.setConnectivityNameToState.bind(this)}/> : ''}
                    <div className="form-group">
                        <div className="col-sm-10 col-sm-offset-2 col-xs-12">
                            <button
                                className="btn btn-success btn-lg btn-block"
                                onClick={this.getWPTRunTestData.bind(this)}
                                type="submit"
                            >Check
                            </button>
                        </div>
                    </div>
                </form>
                <div>
                    {!_.isEmpty(this.props.wptRunTestResponse) ?
                        <ResultsDisplay testData={this.props.wptRunTestResponse}/> : ''}
                </div>
            </div>
        );
    }
}

function mapStateToProps({wptLocations, wptRunTestResponse}) {
    return {wptLocations, wptRunTestResponse};
}

export default withRouter(connect(mapStateToProps, {wptGetLocations, wptRunTest})(SpeedTest));
