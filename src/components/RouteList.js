import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Droppable } from 'react-beautiful-dnd';

import RouteListItem from './containers/RouteListItem';

import { DROPPABLE_ROUTE_LIST } from '../constants';

const RouteList = props => {
  const { pointIds } = props;
  return (
    <Droppable droppableId={DROPPABLE_ROUTE_LIST} direction="vertical">
      {(provided, snapshot) => {
        const className = classNames({
          'route-list': true,
          'route-list-dragging-over': snapshot.isDraggingOver
        });
        return (
          <ul ref={provided.innerRef} {...provided.droppableProps} className={className}>
            {pointIds.map((id, i) => (
              <RouteListItem key={id} id={id} index={i} />
            ))}
            {provided.placeholder}
          </ul>
        );
      }}
    </Droppable>
  );
};

RouteList.propTypes = {
  pointIds: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default RouteList;
