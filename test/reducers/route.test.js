import { fromJS } from 'immutable';

import {
    ADD_ROUTE_POINT,
    RELOCATE_ROUTE_POINT,
    MOVE_ROUTE_POINT,
    REMOVE_ROUTE_POINT
} from '../../src/constants';

import reducer from '../../src/reducers/route';

const predefinedPoints = [
    { id: 1, name: 'Ярославль', latitude: 57.6261, longitude: 39.8845 },
    { id: 2, name: 'Тверь', latitude: 56.8587, longitude: 35.9176 },
    { id: 3, name: 'Москва', latitude: 55.7558, longitude: 37.6173 },
    { id: 4, name: 'Сочи', latitude: 43.6028, longitude: 39.7342 }
];

describe('route reducer', () => {
    let points;

    beforeEach(() => {
        points = fromJS(predefinedPoints);
    });

    it('return initial state', () => {
        expect(reducer(undefined, {})).toEqual(fromJS({
            points: [],
            error: ''
        }));
    });

    it('handle ADD_ROUTE_POINT action on empty route', () => {
        const name = 'My point';
        const latitude = 30.0;
        const longitude = 45.0;
        expect(reducer(undefined, {
            type: ADD_ROUTE_POINT,
            name,
            latitude,
            longitude
        })).toEqual(fromJS({
            points: [
                { id: 1, name, latitude, longitude }
            ],
            error: '',
            maxPointId: 1
        }));
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
        expect(reducer(fromJS({
            points,
            error: ''
        }), {
            type: RELOCATE_ROUTE_POINT,
            id,
            latitude,
            longitude
        })).toEqual(fromJS({
            points: expectedPoints,
            error: ''
        }));
    });

    it('handle MOVE_ROUTE_POINT action', () => {
        const sourceIndex = 4;
        const destinationIndex = 2;
        const expectedPoints = predefinedPoints.map(point => Object.assign({}, point));
        const [moved] = expectedPoints.splice(sourceIndex, 1);
        expectedPoints.splice(destinationIndex, 0, moved);
        expect(reducer(fromJS({
            points,
            error: ''
        }), {
            type: MOVE_ROUTE_POINT,
            sourceIndex,
            destinationIndex
        })).toEqual(fromJS({
            points: expectedPoints,
            error: ''
        }));
    });

    it('handle REMOVE_ROUTE_POINT action', () => {
        const id = 3;
        const expectedPoints = predefinedPoints.filter(point => point.id !== id);
        expect(reducer(fromJS({
            points,
            error: ''
        }), {
            type: REMOVE_ROUTE_POINT,
            id
        })).toEqual(fromJS({
            points: expectedPoints,
            error: ''
        }));
    });
});
