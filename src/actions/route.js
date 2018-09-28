import {
    ADD_ROUTE_POINT,
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

export const removeRoutePoint = index => {
    return {
        type: REMOVE_ROUTE_POINT,
        index
    };
};
