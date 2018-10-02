import { fromJS } from 'immutable';

import {
    getRoute,
    getRoutePoints,
    getRoutePointsCount,
    getRouteError
} from '../../src/selectors/route';

const predefined = {
    route: {
        points: [
            { id: 1, name: 'Yaroslavl', latitude: 57.6261, longitude: 39.8845 },
            { id: 2, name: 'Tver', latitude: 56.8587, longitude: 35.9176 },
            { id: 3, name: 'Moscow', latitude: 55.7558, longitude: 37.6173 },
            { id: 4, name: 'Sochi', latitude: 43.6028, longitude: 39.7342 }
        ],
        error: 'Some error occurred'
    }
};

describe('route selectors', () => {
    let state;

    beforeEach(() => {
        state = fromJS(predefined);
    });

    it('get route state', () => {
        expect(getRoute(state)).toEqual(fromJS(predefined.route));
    });

    it('get route points', () => {
        expect(getRoutePoints(state)).toEqual(predefined.route.points);
    });

    it('get route points\' count', () => {
        expect(getRoutePointsCount(state)).toEqual(predefined.route.points.length);
    });

    it('get route error', () => {
        expect(getRouteError(state)).toEqual(predefined.route.error);
    });
});
