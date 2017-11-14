import PropTypes from 'prop-types';
import React, {Component} from 'react';
import _ from 'lodash';
import {Jumbotron, Row, Col} from 'reactstrap';
import {formatBytes} from "../Lib/helper";
import FlagIcon from '../Helpers/FlagIcon';
//import {wptGetScreenshotImage, wptGetWaterfallImage, wptGetPageSpeedData} from "../../actions";
//import {connect} from "react-redux";

class ResultsDisplay extends Component {
    static PropTypes = {
        testData: PropTypes.object,
        screenshot: PropTypes.array,
        waterfall: PropTypes.array,
        pageSpeedData: PropTypes.array,
        isCanceled: PropTypes.bool
    };

    static defaultProps = {
        testData: {}
    };

    constructor(props) {
        super(props);
        this.state = {
            imageSrc: '',
        }
    }

    getWPTScreenshot(testId) {
        this.props.wptGetScreenshotImage('screenshot', {
            id: testId,
            options: {
                fullResolution: true,
                startRender: true,
                documentComplete: true,
                thumbnail: false,
                dataURI: true,
            }
        });
    }

    getWPTWaterfall(testId) {
        this.props.wptGetWaterfallImage('waterfall', {
            id: testId,
            options: {
                chartType: 'waterfall',
                colorByMime: false,
                chartWidth: 930,
                maxTime: 'automatic',
                requests: 'all',
                noCPU: false,
                noBandwidth: false,
                noEllipsis: false,
                noLabels: false,
            }
        });
    }

    getWPTPageSpeedData(testId) {
        this.props.wptGetPageSpeedData('pageSpeedData', {
            id: testId,
            options: {
                dryRun: false,
            }
        });
    }

    createLabel(label) {
        const availableCountries = [
            {
                name: 'Dulles',
                code: 'us'
            },
            {
                name: 'USA',
                code: 'us'
            },
            {
                name: 'USA',
                code: 'us'
            },
            {
                name: 'Australia',
                code: 'au'
            },
            {
                name: 'Argentina',
                code: 'ar',
            },
            {
                name: 'Brazil',
                code: 'br'
            },
            {
                name: 'UK',
                code: 'gb'
            },
            {
                name: 'Ireland',
                code: 'ie'
            },
            {
                name: 'France',
                code: 'fr',
            },
            {
                name: 'BE',
                code: 'be',
            },
            {
                name: 'NL',
                code: 'nl'
            },
            {
                name: 'Germany',
                code: 'de'
            },
            {
                name: 'Italy',
                code: 'it'
            },
            {
                name: 'Czech',
                code: 'cz'
            },
            {
                name: 'Poland',
                code: 'pl'
            },
            {
                name: 'Turkey',
                code: 'tr'
            },
            {
                name: 'Mauritius',
                code: 'mu'
            },
            {
                name: 'Israel',
                code: 'il'
            },
            {
                name: 'Iran',
                code: 'ir'
            },
            {
                name: 'UAE',
                code: 'ae'
            },
            {
                name: 'India',
                code: 'in'
            },
            {
                name: 'Singapore',
                code: 'sg'
            },
            {
                name: 'Indonesia',
                code: 'id'
            },
            {
                name: 'China',
                code: 'cn'
            },
            {
                name: 'Korea',
                code: 'kr'
            },
            {
                name: 'Japan',
                code: 'jp'
            },
            {
                name: 'Sydney',
                code: 'au'
            }

        ];
        const countryCode = availableCountries.filter(country => {
            const countryRegex = new RegExp(country.name);
            return label.match(countryRegex);
        })[0].code;

        return <span><FlagIcon code={countryCode}/> {label}</span>;
    }

    getTestResultsImages(testData) {
        const {data} = testData,
            {average, median, runs, standardDeviation, location} = data,
            medianFirstView = median.firstView,
            medianRepeatView = median.repeatView,
            medianFirstViewChecklist = medianFirstView.images.checklist,
            medianFirstViewConnectionView = medianFirstView.images.connectionView,
            medianFirstViewScreenShot = medianFirstView.images.screenShot,
            medianFirstViewWaterfall = medianFirstView.images.waterfall,
            medianRepeatViewChecklist = medianRepeatView.images.checklist,
            medianRepeatViewConnectionView = medianRepeatView.images.connectionView,
            medianRepeatViewScreenShot = medianRepeatView.images.screenShot,
            medianRepeatViewWaterfall = medianRepeatView.images.waterfall,
            averageFirstView = average.firstView,
            averageRepeatView = average.repeatView,
            standardFirstView = standardDeviation.firstView,
            standardRepeatView = standardDeviation.repeatView,
            runsData = Object.keys(runs).map(run => ({
                firstView: runs[run].firstView,
                repeatView: runs[run].repeatView
            })),
            scoreLabels = {
                TTFB: 'Time To First Byte',
                score_cache: 'Cache static content',
                score_cdn: 'Effective use of CDN',
                score_combine: 'Combine js and css files',
                score_compress: 'Compress Images',
                score_cookies: 'No cookies on static content',
                score_etags: 'Disable E-Tags',
                score_gzip: 'Compress Transfer',
                ['score_keep-alive']: 'Keep-alive Enabled',
                score_minify: 'Minify JavaScript',
                score_progressive_jpeg: 'Progressive JPEGs'
            },
            importantScores = ['TTFB', 'score_keep-alive', 'score_gzip', 'score_compression', 'score_cache', 'score_cdn'],
            classCriteria = {
                90: 'A',
                80: 'B',
                70: 'C',
                60: 'D',
                0: 'F'
            },
            scores = Object.keys(averageFirstView).filter(key => Object.keys(scoreLabels).includes(key)).map(key => {
                const perKeyCritScore = Object.keys(classCriteria).filter(gradeRequired => averageFirstView[key] >= gradeRequired).pop(),
                    gradeClass = classCriteria[perKeyCritScore];

                return {
                    label: scoreLabels[key],
                    score: averageFirstView[key],
                    class: key === 'score_cdn' ? (averageFirstView[key] >= 80 ? 'A' : 'NA') : (gradeClass || 'NA'),
                    grade: key === 'score_cdn' ? (averageFirstView[key] >= 80 ? '✓' : 'X') : (gradeClass || 'NA'),
                    weight: gradeClass ? 100 : 0,
                    key: key,
                    important: importantScores.includes(key)
                }
            }),
            importantCriteria = scores.filter(score => score.important),
            importantCriteriaSum = scores.filter(score => score.important).reduce((acc, currentValue) => Number(acc) + Number(currentValue.score < 0 ? 0 : currentValue.score), 0),
            averagePerformanceScore = (Number(importantCriteriaSum) / Number(importantCriteria.length)).toFixed(2),
            averagePerformanceGrade = classCriteria[Object.keys(classCriteria).filter(gradeRequired => averagePerformanceScore >= gradeRequired).pop()],
            averagePerformance = {
                grade: averagePerformanceGrade,
                score: averagePerformanceScore
            },
            requests = averageFirstView.requestsFull,
            loadTime = (averageFirstView.loadTime / 1000).toFixed(2) + ' s',
            pageSize = formatBytes(averageFirstView.bytesIn) // Size in MB
        ;

        /*this.getWPTScreenshot(data.id);
        this.getWPTWaterfall(data.id);
        this.getWPTPageSpeedData(data.id);*/


        return {
            averagePerformance,
            requests,
            pageSize,
            loadTime,
            medianFirstViewScreenShot,
            medianFirstViewWaterfall,
            from: location
        };

    }

    render() {
        const {testData, locations} = this.props;
        const testDataData = testData.data;
        const {/*testInfo, */statusText} = testDataData;
        const isTestComplete = statusText === 'Test Complete';

        if (isTestComplete) {
            const {
                averagePerformance,
                requests,
                pageSize,
                loadTime,
                medianFirstViewScreenShot,
                medianFirstViewWaterfall,
                from
            } = this.getTestResultsImages(testDataData);

            return <Row>
                <Col xs={12} md={9}>
                    <Row>
                        <Col xs={12} md={5}>
                            <div className="shadow-box">
                                <h6>Summary</h6>
                                <img className="img-fluid zoom-in"
                                     onClick={() => this.setState({imageSrc: medianFirstViewScreenShot})}
                                     src={medianFirstViewScreenShot}/>
                            </div>
                        </Col>
                        <Col xs={12} md={7}>
                            <Row className="results-scalar-data">
                                <Col xs={12} md={6} className="mb-4">
                                    <div className="shadow-box speed-grade">
                                        <h6>Performance grade</h6>
                                        <p>
                                                <span
                                                    className="badge badge-success p-0">{averagePerformance.grade}</span>
                                            <span>{averagePerformance.score}</span>
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6} className="mb-4">
                                    <div className="shadow-box">
                                        <h6>Load time</h6>
                                        <p><span>{loadTime}</span></p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6} className="mb-4">
                                    <div className="shadow-box">
                                        <h6>Page size</h6>
                                        <p>
                                            {pageSize}
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6} className="mb-4">
                                    <div className="shadow-box">
                                        <h6>Requests</h6>
                                        <p>
                                            {requests}
                                        </p>
                                    </div>
                                </Col>
                                <Col xs={12} md={6} className="mb-4">
                                    <div className="shadow-box">
                                        <h6>Tested from</h6>
                                        <p>
                                            {from.length > 0 ? this.createLabel(_.first(locations.filter(location => location.id === from.split(':')[0])).labelShort) : ''}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12} md={3}>
                    <div className="shadow-box">
                        <h6>Waterfall</h6>
                        <img className="img-fluid zoom-in"
                             onClick={() => this.setState({imageSrc: medianFirstViewWaterfall})}
                             src={medianFirstViewWaterfall}/>
                    </div>
                </Col>

                {this.state.imageSrc.length > 0 ?
                    <Col xs={12} className="mt-4">
                        <div className="shadow-box text-center">
                            <h6>Image Preview</h6>
                            <img src={this.state.imageSrc} className="img-fluid zoom-out" alt="Zoomed in image"
                                 onClick={() => this.setState({imageSrc: ''})}/>
                        </div>
                    </Col> : null}
            </Row>;
        } else {
            return <Row>
                <Col xs={12}>
                    <div className="shadow-box">
                        <h2>{statusText}</h2>
                    </div>
                </Col>
            </Row>;
        }
    }
}

/*function mapStateToProps({screenshot, waterfall, pageSpeedData}) {
    return {screenshot, waterfall, pageSpeedData};
}

export default connect(mapStateToProps, {wptGetScreenshotImage, wptGetWaterfallImage, wptGetPageSpeedData})(ResultsDisplay);*/
export default ResultsDisplay;
