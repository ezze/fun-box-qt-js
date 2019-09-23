import { fromJS } from 'immutable';

import {
  getRoute,
  getRoutePoints,
  getRoutePointIds,
  getRoutePointsCount,
  getRoutePointById,
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
    expect(getRoutePoints(state).toJS()).toEqual(predefined.route.points);
  });

  it('get route point ids', () => {
    expect(getRoutePointIds(state).toJS()).toEqual(predefined.route.points.map(point => point.id));
  });

  it('get route points\' count', () => {
    expect(getRoutePointsCount(state)).toEqual(predefined.route.points.length);
  });

  it('get route point by id', () => {
    expect(getRoutePointById(state)(2).toJS()).toEqual(predefined.route.points[1]);
  });

  it('get route point by non-existing id', () => {
    expect(getRoutePointById(state)(7)).toEqual(null);
  });

  it('get route error', () => {
    expect(getRouteError(state)).toEqual(predefined.route.error);
  });
});
