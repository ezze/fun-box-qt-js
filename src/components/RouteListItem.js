import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RouteListItem extends Component {
    constructor(props) {
        super(props);
        this.onRemoveClick = this.onRemoveClick.bind(this);
    }

    render() {
        const { name } = this.props;
        return (
            <li className="route-list-item">
                <span className="route-list-item-name">{name}</span>
                <span className="route-list-item-remove" onClick={this.onRemoveClick} title="Удалить">&times;</span>
            </li>
        );
    }

    onRemoveClick() {
        const { removePoint, index } = this.props;
        removePoint(index);
    }
}

RouteListItem.propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    removePoint: PropTypes.func.isRequired
};

export default RouteListItem;
