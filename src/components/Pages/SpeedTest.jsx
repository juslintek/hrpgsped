import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';


import {wptGetLocations, wptRunTest, wptCancelTest} from '../../actions';

import LocationSelect from '../Elements/LocationSelect';
import BrowserSelect from '../Elements/BrowserSelect';
import ConnectivitySelect from '../Elements/ConnectivitySelect';
//import TestersSelect from '../Elements/TestersSelect';
import ResultsDisplay from '../Elements/ResultsDisplay';

const extractHostname = (url) => {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
};

const isFQDN = (url) => /^(?!:\/\/)([a-zA-Z0-9]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-zA-Z]{2,6}?$/i.test(url);

class SpeedTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            websiteUrl: '',
            websiteUrlError: '',
            currentLocation: 'ec2-us-east-1',
            currentBrowser: 'Chrome',
            currentConnectivity: 'Native',
            currentTester: '',
            currentTestId: '',
            shouldUpdateTesters: false,
            testBegin: false,
        };
    }

    componentWillMount() {
        this.getWPTLocations(this.props, true);
    }

    componentWillReceiveProps(nextProps) {
        this.getWPTLocations(nextProps);
        if (!_.isEmpty(nextProps.wptRunTestResponse) && this.state.currentTestId.length === 0) {
            this.setState({currentTestId: nextProps.wptRunTestResponse.data.testId});
        }

        if (nextProps.wptRunTestResponse.isComplete && this.state.testBegin) {
            this.setState({testBegin: false});
        }
    }

    getWPTLocations(props, willMount = false) {
        if (willMount) {
            this.props.wptGetLocations('wptLocations');
        }
    }

    toggleTest(update = false) {
        if (update) {
            this.setState({testBegin: !this.state.testBegin});
        }
    }

    getWPTRunTestData(event) {
        event.preventDefault();

        if (this.state.websiteUrl.length > 0 && isFQDN(this.state.websiteUrl)) {
            this.setState({testBegin: !this.state.testBegin, websiteUrlError: ''});

            this.props.wptRunTest('wptRunTestResponse', {
                url: this.state.websiteUrl, options: {
                    location: `${this.state.currentLocation}:${this.state.currentBrowser}`,
                    connectivity: this.state.currentConnectivity,
                    pageSpeed: true,
                    requests: true,
                    reporter: 'json',
                    domains: true,
                    breakDown: true
                }
            });
        } else if (this.state.websiteUrl.length > 0 && !isFQDN(extractHostname(this.state.websiteUrl))) {
            this.setState({websiteUrlError: 'URL is not fully qualified domain name'});
        } else {
            this.setState({websiteUrlError: 'URL is required'});
        }
    }

    cancelTest(event) {
        event.preventDefault();

        const intervalId = setInterval(function () {
            this.toggleTest(this.props.isCanceled);
            if (this.props.isCanceled) {
                clearInterval(intervalId);
            }
        }.bind(this), 500);

        this.props.wptCancelTest('isCanceled', {
            id: this.state.currentTestId,
            options: {
                key: 'A.cc65d755f43d133fbf4dc36d16949d30'
            }
        });
    }

    updateBrowsers(currentTarget) {
        const currentBrowsers = currentTarget.Browsers.split(',').map(browser => browser.trim(' '));
        this.setState({browsers: currentBrowsers, currentLocation: currentTarget.id, shouldUpdateTesters: true});
    }

    updateWebsiteUrl(event) {
        this.setState({websiteUrl: event.target.value, shouldUpdateTesters: false});
    }

    setBrowserNameToState(option) {
        this.setState({currentBrowser: option.value, shouldUpdateTesters: false});
    }

    setConnectivityNameToState(option) {
        this.setState({currentConnectivity: option.value, shouldUpdateTesters: false});
    }

    setTestersNameToState(option, getWPTTesters) {
        this.setState({currentTester: option.value, shouldUpdateTesters: false});
    }

    render() {
        const {wptLocations, isCanceled, wptRunTestResponse} = this.props,
            {error, data} = wptLocations,
            locations = data || [],
            browsers = locations.length > 0 ? locations.filter(location => location.id === this.state.currentLocation)[0].Browsers.split(',') : [];

        return (
            <div className="web-speed-test-wrapper container">
                <Form className="shadow-box">
                    <FormGroup className="mb-0" row>
                        <Col md={3} sm={6} xs={12}>
                            <Label for="websiteUrl" size="md">URL</Label>
                            <Input
                                valid={this.state.websiteUrlError.length === 0 ? null : this.state.websiteUrlError.length === 0}
                                id="websiteUrl"
                                placeholder="Enter a Website URL"
                                type="url"
                                size="md"
                                required={true}
                                onChange={this.updateWebsiteUrl.bind(this)}
                                value={this.state.websiteUrl}
                            />
                            <FormFeedback>{this.state.websiteUrlError}</FormFeedback>
                        </Col>
                        {!error && locations.length > 0 ?
                            <LocationSelect
                                md={3}
                                sm={6}
                                xs={12}
                                size="md"
                                locations={locations}
                                currentLocation={this.state.currentLocation}
                                updateBrowsers={this.updateBrowsers.bind(this)}/> : ''}
                        {!error && locations.length > 0 && browsers.length > 0 ?
                            <BrowserSelect
                                md={2}
                                sm={6}
                                xs={12}
                                size="md"
                                onChange={this.setBrowserNameToState.bind(this)}
                                browsers={browsers}
                                currentBrowser={this.state.currentBrowser}
                            /> : ''}
                        {!error && locations.length > 0 ?
                            <ConnectivitySelect
                                md={2}
                                sm={6}
                                xs={12}
                                size="md"
                                currentConnectivity={this.state.currentConnectivity}
                                onChange={this.setConnectivityNameToState.bind(this)}
                            /> : ''}
                        {/*!error && locations.length > 0 ?
                        <TestersSelect
                            currentTester={this.state.currentTester}
                            currentLocation={this.state.currentLocation}
                            shouldUpdateTesters={this.state.shouldUpdateTesters}
                            onChange={this.setTestersNameToState.bind(this)}/> : ''*/}

                        <Col md={2} sm={12} xs={12}>
                            <Label size="md">&nbsp;</Label>
                            {this.state.testBegin ?
                                <Button
                                    className="btn btn-warning btn-md btn-block"
                                    onClick={this.cancelTest.bind(this)}
                                    type="submit"
                                >Cancel
                                </Button>
                                : <Button
                                    className="btn btn-success btn-md btn-block"
                                    onClick={this.getWPTRunTestData.bind(this)}
                                    type="submit"
                                >Check
                                </Button>
                            }
                        </Col>
                    </FormGroup>
                </Form>
                <div className="pt-4">
                    {!_.isEmpty(wptRunTestResponse) ?
                        <ResultsDisplay
                            icCanceled={isCanceled}
                            locations={locations}
                            testData={wptRunTestResponse}/> : ''}
                </div>
            </div>
        );
    }
}

function mapStateToProps({wptLocations, wptRunTestResponse, isCanceled}) {
    return {wptLocations, wptRunTestResponse, isCanceled};
}

export default connect(mapStateToProps, {wptGetLocations, wptRunTest, wptCancelTest})(SpeedTest);
