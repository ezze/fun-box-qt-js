import {
    ADD_ROUTE_POINT,
    RELOCATE_ROUTE_POINT,
    MOVE_ROUTE_POINT,
    REMOVE_ROUTE_POINT
} from '../../src/constants';

import {
    addRoutePoint,
    relocateRoutePoint,
    moveRoutePoint,
    removeRoutePoint
} from '../../src/actions/route';

describe('route action creators', () => {
    it('action to add route point', () => {
        const name = 'My new point';
        const latitude = 30.0;
        const longitude = 45.0;
        expect(addRoutePoint(name, latitude, longitude)).toEqual({
            type: ADD_ROUTE_POINT,
            name,
            latitude,
            longitude
        });
    });

    it('action to relocate route point', () => {
        const id = 5;
        const latitude = 59.0;
        const longitude = 48.0;
        expect(relocateRoutePoint(id, latitude, longitude)).toEqual({
            type: RELOCATE_ROUTE_POINT,
            id,
            latitude,
            longitude
        });
    });

    it('action to move route point', () => {
        const sourceIndex = 4;
        const destinationIndex = 2;
        expect(moveRoutePoint(sourceIndex, destinationIndex)).toEqual({
            type: MOVE_ROUTE_POINT,
            sourceIndex,
            destinationIndex
        });
    });

    it('action to remove route point', () => {
        const id = 3;
        expect(removeRoutePoint(id)).toEqual({
            type: REMOVE_ROUTE_POINT,
            id
        });
    });
});
