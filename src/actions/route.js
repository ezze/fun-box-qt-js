import {
    ADD_ROUTE_POINT,
    MOVE_ROUTE_POINT,
    REORDER_ROUTE_POINT,
    REMOVE_ROUTE_POINT
} from '../constants';

export const addRoutePoint = (name, latitude, longitude) => {
    return {
        type: ADD_ROUTE_POINT,
        name,
        latitude,
        longitude
    };
};

export const moveRoutePoint = (id, latitude, longitude) => {
    return {
        type: MOVE_ROUTE_POINT,
        id,
        latitude,
        longitude
    };
};

export const reorderRoutePoint = (sourceIndex, destinationIndex) => {
    return {
        type: REORDER_ROUTE_POINT,
        sourceIndex,
        destinationIndex
    };
};

export const removeRoutePoint = id => {
    return {
        type: REMOVE_ROUTE_POINT,
        id
    };
};
