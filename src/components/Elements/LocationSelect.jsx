import PropTypes from 'prop-types';
import React, {Component} from 'react';
import _ from 'lodash';

class LocationSelect extends Component {
    static PropTypes = {
        locations: PropTypes.array,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        locations: [],
        currentLocation: ''
    };

    getSanitizedLocations() {
        const locationsByGroup = {},
            {locations} = this.props;
        if (locations.length > 0) {
            locations.forEach(({group}) => {
                locationsByGroup[group] = [];
            });

            locations.forEach(({id, location, labelShort, Label, group}) => {
                locationsByGroup[group].push({
                    id,
                    location,
                    name: `${labelShort}  - ${Label}`,
                });
            });
        }

        return locationsByGroup;
    }

    onChange(event) {
        const currentTarget = this.props.locations.filter(location => location.id === event.target.value)[0];
        if (this.props.hasOwnProperty('updateBrowsers')
            && !_.isEmpty(currentTarget)
            && currentTarget.hasOwnProperty('Browsers')) {
            this.props.updateBrowsers(currentTarget);
        }
    }

    render() {
        const locations = this.getSanitizedLocations();
        return <div className="form-group">
            <label className="col-sm-2 control-label">Location Select</label>
            <div className="col-sm-10">
                <select id="testLocation"
                        className="form-control"
                        required={true}
                        onChange={this.onChange.bind(this)}
                        defaultValue={this.props.currentLocation}
                >
                    <option disabled={true}>Please select location</option>
                    {!_.isEmpty(locations) ? Object.keys(locations).map(group => <optgroup
                            key={group.replace([' ', ','], '_')}
                            label={group}>
                            {locations[group].map(
                                ({id, location, name}) => <option key={id}
                                                                  value={location}>{name}</option>)}
                        </optgroup>,
                    ) : ''}</select>
            </div>
        </div>;
    }
}

export default LocationSelect;
