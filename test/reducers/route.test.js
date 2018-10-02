import { fromJS } from 'immutable';

import {
    ADD_ROUTE_POINT,
    RELOCATE_ROUTE_POINT,
    MOVE_ROUTE_POINT,
    REMOVE_ROUTE_POINT
} from '../../src/constants';

import reducer from '../../src/reducers/route';

function prepareState(points = []) {
    return fromJS({ points, error: '' });
}

function validatePoints(state, expectedPoints) {
    expect(state.get('points')).toEqual(fromJS(expectedPoints));
}

function validateError(state, hasError = false) {
    if (hasError) {
        expect(state.get('error')).toBeTruthy();
    }
    else {
        expect(state.get('error')).toBeFalsy();
    }
}

function validateMaxPointId(state, maxPointId) {
    expect(state.get('maxPointId')).toEqual(maxPointId);
}

const predefinedPoints = [
    { id: 1, name: 'Yaroslavl', latitude: 57.6261, longitude: 39.8845 },
    { id: 2, name: 'Tver', latitude: 56.8587, longitude: 35.9176 },
    { id: 3, name: 'Moscow', latitude: 55.7558, longitude: 37.6173 },
    { id: 4, name: 'Sochi', latitude: 43.6028, longitude: 39.7342 }
];

describe('route reducer', () => {
    it('return initial state', () => {
        expect(reducer(undefined, {})).toEqual(prepareState());
    });

    it('handle ADD_ROUTE_POINT action on empty route', () => {
        const name = 'My point';
        const latitude = 30.0;
        const longitude = 45.0;
        const state = reducer(undefined, {
            type: ADD_ROUTE_POINT,
            name,
            latitude,
            longitude
        });
        validatePoints(state, [{ id: 1, name, latitude, longitude }]);
        validateError(state, false);
        validateMaxPointId(state, 1);
    });

    it('handle ADD_ROUTE_POINT action on non-empty route', () => {
        const name = 'My point';
        const latitude = 30.0;
        const longitude = 45.0;
        const state = reducer(prepareState(predefinedPoints), {
            type: ADD_ROUTE_POINT,
            name,
            latitude,
            longitude
        });
        validatePoints(state, predefinedPoints.concat({ id: 5, name, latitude, longitude }));
        validateError(state, false);
        validateMaxPointId(state, 5);
    });

    it('handle two consecutive ADD_ROUTE_POINT actions on empty route', () => {
        const points = [
            { name: 'My first point', latitude: 30.0, longitude: 45.0 },
            { name: 'My second point', latitude: 42.0, longitude: 57.0 }
        ];
        const intermediateState = reducer(undefined, {
            type: ADD_ROUTE_POINT,
            name: points[0].name,
            latitude: points[0].latitude,
            longitude: points[0].longitude
        });
        const state = reducer(intermediateState, {
            type: ADD_ROUTE_POINT,
            name: points[1].name,
            latitude: points[1].latitude,
            longitude: points[1].longitude
        });
        validatePoints(state, points.map((point, index) => Object.assign({ id: index + 1}, point)));
        validateError(state, false);
        validateMaxPointId(state, 2);
    });

    it('handle ADD_ROUTE_POINT action on a route with changed points\' order', () => {
        const name = 'My point';
        const latitude = 30.0;
        const longitude = 45.0;
        const points = [predefinedPoints[0], predefinedPoints[3], predefinedPoints[2], predefinedPoints[1]];
        const state = reducer(prepareState(points), {
            type: ADD_ROUTE_POINT,
            name,
            latitude,
            longitude
        });
        validatePoints(state, points.concat([{ id: 5, name, latitude, longitude }]));
        validateError(state, false);
        validateMaxPointId(state, 5);
    });

    it('handle ADD_ROUTE_POINT action with empty name', () => {
        const name = '   ';
        const latitude = 30.0;
        const longitude = 45.0;
        const state = reducer(undefined, {
            type: ADD_ROUTE_POINT,
            name,
            latitude,
            longitude
        });
        validatePoints(state, []);
        validateError(state, true);
        validateMaxPointId(state, undefined);
    });

    it('handle ADD_ROUTE_POINT action with same coordinates as last point of a route', () => {
        const name = 'Duplicate point';
        const lastPredefinedPoint = predefinedPoints[predefinedPoints.length - 1];
        const { latitude, longitude } = lastPredefinedPoint;
        const state = reducer(prepareState(predefinedPoints), {
            type: ADD_ROUTE_POINT,
            name,
            latitude,
            longitude
        });
        validatePoints(state, predefinedPoints);
        validateError(state, true);
    });

    it('handle RELOCATE_ROUTE_POINT action', () => {
        const id = 2;
        const latitude = 30.0;
        const longitude = 45.0;
        const expectedPoints = predefinedPoints.map(point => {
            return point.id === id ? Object.assign({}, point, {
                latitude,
                longitude
            }) : point;
        });
        const state = reducer(prepareState(predefinedPoints), {
            type: RELOCATE_ROUTE_POINT,
            id,
            latitude,
            longitude
        });
        validatePoints(state, expectedPoints);
        validateError(state, false);
    });

    it('handle RELOCATE_ROUTE_POINT action with id of non-existing point', () => {
        const id = 5;
        const latitude = 30.0;
        const longitude = 45.0;
        const state = reducer(prepareState(predefinedPoints), {
            type: RELOCATE_ROUTE_POINT,
            id,
            latitude,
            longitude
        });
        validatePoints(state, predefinedPoints);
        validateError(state, false);
    });

    it('handle MOVE_ROUTE_POINT action', () => {
        const sourceIndex = 4;
        const destinationIndex = 2;
        const expectedPoints = predefinedPoints.map(point => Object.assign({}, point));
        const [moved] = expectedPoints.splice(sourceIndex, 1);
        expectedPoints.splice(destinationIndex, 0, moved);
        const state = reducer(prepareState(predefinedPoints), {
            type: MOVE_ROUTE_POINT,
            sourceIndex,
            destinationIndex
        });
        validatePoints(state, expectedPoints);
        validateError(state, false);
    });

    it('handle MOVE_ROUTE_POINT action with equal source and destination positions', () => {
        const index = 2;
        const state = reducer(prepareState(predefinedPoints), {
            type: MOVE_ROUTE_POINT,
            sourceIndex: index,
            destinationIndex: index
        });
        validatePoints(state, predefinedPoints);
        validateError(state, false);
    });

    it('handle REMOVE_ROUTE_POINT action', () => {
        const id = 3;
        const expectedPoints = predefinedPoints.filter(point => point.id !== id);
        const state = reducer(prepareState(predefinedPoints), {
            type: REMOVE_ROUTE_POINT,
            id
        });
        validatePoints(state, expectedPoints);
        validateError(state, false);
    });

    it('handle REMOVE_ROUTE_POINT with id of non-existing point', () => {
        const id = 5;
        const state = reducer(prepareState(predefinedPoints), {
            type: REMOVE_ROUTE_POINT,
            id
        });
        validatePoints(state, predefinedPoints);
        validateError(state, false);
    });
});
