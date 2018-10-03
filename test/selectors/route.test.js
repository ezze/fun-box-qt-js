import { fromJS } from 'immutable';

import {
    getRoute,
    getRoutePoints,
    getRoutePointsCount,
    getRouteError
} from '../../src/selectors/route';

import { predefinedPoints } from '../constants';

const predefined = {
    route: {
        points: predefinedPoints,
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
