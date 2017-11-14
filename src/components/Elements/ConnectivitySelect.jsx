import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FormGroup, Label, Input, Col} from 'reactstrap';
import Select from 'react-select-plus';

class ConnectivitySelect extends Component {
    static PropTypes = {
        connectivities: PropTypes.array,
        currentConnectivity: PropTypes.string
    };

    static defaultProps = {
        connectivities: [
            'DSL',
            'Cable',
            'FIOS',
            'Dial',
            '3G',
            '3GFast',
            'Native'
        ],
        currentConnectivity: ''
    };

    render() {
        const {connectivities, currentConnectivity, onChange, size, md, sm, xs} = this.props;

        return <Col md={md} sm={sm} xs={xs}>
            <Label for="testConnectivity" size={size}>Connection type</Label>
            <Select
                id="testConnectivity"
                name="testConnectivity"
                value={currentConnectivity}
                options={connectivities.map((connectivity) => ({value: connectivity, label: connectivity}))}
                onChange={onChange}
                isLoading={connectivities.length === 0}
                searchable={true}
                clearable={false}
            />
        </Col>;
    }
}

export default ConnectivitySelect;
