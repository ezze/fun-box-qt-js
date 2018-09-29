import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RouteListItem from './RouteListItem';

class RouteList extends Component {
    render() {
        const { points, removePoint } = this.props;
        return (
            <ul className="route-list">
                {points.map((point, i) => (
                    <RouteListItem key={i} {...point} removePoint={removePoint} />
                ))}
            </ul>
        );
    }
}

RouteList.propTypes = {
    points: PropTypes.array.isRequired,
    removePoint: PropTypes.func.isRequired
};

export default RouteList;
