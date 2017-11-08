import PropTypes from 'prop-types';
import React, {Component} from 'react';

class BrowserSelect extends Component {
    static PropTypes = {
        browsers: PropTypes.array,
        currentBrowser: PropTypes.string
    };

    static defaultProps = {
        browsers: ['Safari', 'Firefox'],
        currentBrowser: ''
    };

    render() {
        const {browsers, onChange} = this.props;

        return <div className="form-group">
            <label className="col-sm-2 control-label">Browser Select</label>
            <div className="col-sm-10">
                <select
                    id="testBrowser"
                    className="form-control"
                    required={false}
                    defaultValue={this.props.currentBrowser}
                    onChange={onChange}
                >
                    <option disabled>Select Browser</option>
                    {browsers.map((browser, key) => <option key={key} value={browser}>{browser}</option>)}
                </select>
            </div>
        </div>;
    }
}

export default BrowserSelect;
