import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Label, Input, Col} from 'reactstrap';
import Select from 'react-select-plus';

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
        const {browsers, currentBrowser, onChange, size, md, sm, xs} = this.props;

        return <Col md={md} sm={sm} xs={xs}>
            <Label for="testBrowser" size={size}>Browser</Label>
            <Select
                id="testBrowser"
                name="testBrowser"
                value={currentBrowser}
                options={browsers.map((browser) => ({value: browser, label: browser}))}
                onChange={onChange}
                isLoading={browsers.length === 0}
                searchable={true}
                clearable={false}
            />
        </Col>;
    }
}

export default BrowserSelect;
