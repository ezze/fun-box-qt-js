import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Droppable } from 'react-beautiful-dnd';

import RouteListItem from './RouteListItem';

import { DROPPABLE_ROUTE_LIST } from '../constants';

class RouteList extends Component {
    render() {
        const { points, removePoint } = this.props;
        return (
            <Droppable droppableId={DROPPABLE_ROUTE_LIST} direction="vertical">
                {(provided, snapshot) => {
                    const className = classNames({
                        'route-list': true,
                        'route-list-dragging-over': snapshot.isDraggingOver
                    });
                    return (
                        <ul ref={provided.innerRef} {...provided.droppableProps} className={className}>
                            {points.map((point, i) => (
                                <RouteListItem key={i} index={i} {...point} removePoint={removePoint} />
                            ))}
                            {provided.placeholder}
                        </ul>
                    );
                }}
            </Droppable>
        );
    }
}

RouteList.propTypes = {
    points: PropTypes.array.isRequired,
    removePoint: PropTypes.func.isRequired
};

export default RouteList;
