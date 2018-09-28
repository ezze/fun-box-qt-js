import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RouteListItem from './RouteListItem';

class RouteList extends Component {
    render() {
        const { route, removePoint } = this.props;
        return (
            <ul className="route-list">
                {route.map((point, i) => (
                    <RouteListItem key={i} {...point} index={i} removePoint={removePoint} />
                ))}
            </ul>
        );
    }
}

RouteList.propTypes = {
    route: PropTypes.array.isRequired,
    removePoint: PropTypes.func.isRequired
};

export default RouteList;
