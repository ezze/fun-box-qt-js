import { DROPPABLE_ROUTE_LIST } from './constants';

import { moveRoutePoint } from './actions/route';

function createDragDropDispatcher(store) {
    return {
        onDragEnd: result => {
            const { source, destination } = result;
            if (
                !destination ||
                source.droppableId !== destination.droppableId ||
                source.index === destination.index
            ) {
                return;
            }

            switch (destination.droppableId) {
                case DROPPABLE_ROUTE_LIST: {
                    store.dispatch(moveRoutePoint(source.index, destination.index));
                    break;
                }
            }
        }
    };
}

export default createDragDropDispatcher;
