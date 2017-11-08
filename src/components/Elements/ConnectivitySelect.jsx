import PropTypes from 'prop-types';
import React, {Component} from 'react';

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
        const {connectivities, currentConnectivity, onChange} = this.props;

        return <div className="form-group">
            <label className="col-sm-2 control-label">Connectivity Select</label>
            <div className="col-sm-10">
            <select
                id="testConnectivity"
                className="form-control"
                required={false}
                defaultValue={currentConnectivity}
                onChange={onChange}
            >
            <option default disabled>Select Connectivity</option>
            {connectivities.map((connectivity, key) => <option key={key}
                                                                          value={connectivity}>{connectivity}</option>)}
        </select></div></div>;
    }
}

export default ConnectivitySelect;
