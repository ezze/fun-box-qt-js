import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { formatLatitude, formatLongitude } from 'latlon-formatter';

class RouteListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.onRemoveClick = this.onRemoveClick.bind(this);
  }

  render() {
    const { id, index, point } = this.props;
    const { name, latitude, longitude } = point;
    return (
      <Draggable draggableId={`draggable-route-list-item-${id}`} index={index}>
        {(provided, snapshot) => {
          const className = classNames({
            'route-list-item': true,
            'route-list-item-dragging': snapshot.isDragging
          });
          return (
            <li
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={className}
              style={provided.draggableProps.style}
            >
              <div>
                <div className="route-list-item-name">{name}</div>
                <div className="route-list-item-coordinates">
                  <span>{formatLatitude(latitude, { degrees: true })}</span>&nbsp;
                  <span>{formatLongitude(longitude, { degrees: true })}</span>
                </div>
              </div>
              <div>
                <span className="route-list-item-remove" onClick={this.onRemoveClick} title="Удалить">
                  &times;
                </span>
              </div>
            </li>
          );
        }}
      </Draggable>
    );
  }

  onRemoveClick() {
    const { removePoint, id } = this.props;
    removePoint(id);
  }
}

RouteListItem.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  point: PropTypes.shape({
    name: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }).isRequired,
  removePoint: PropTypes.func.isRequired
};

export default RouteListItem;
