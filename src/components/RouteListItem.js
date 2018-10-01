import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

class RouteListItem extends Component {
    constructor(props) {
        super(props);
        this.onRemoveClick = this.onRemoveClick.bind(this);
    }

    render() {
        const { index, id, name } = this.props;
        return (
            <Draggable draggableId={`draggable-route-list-item-${id}`} index={index}>
                {(provided, snapshot) => (
                    <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="route-list-item"
                        style={provided.draggableProps.style}
                    >
                        <span className="route-list-item-name">{name}</span>
                        <span
                            className="route-list-item-remove"
                            onClick={this.onRemoveClick}
                            title="Удалить">
                            &times;
                        </span>
                    </li>
                )}
            </Draggable>
        );
    }

    onRemoveClick() {
        const { removePoint, id } = this.props;
        removePoint(id);
    }
}

RouteListItem.propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    removePoint: PropTypes.func.isRequired
};

export default RouteListItem;
