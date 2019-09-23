import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

export const getRoute = state => state.get('route');

export const getRoutePoints = createSelector(getRoute, state => state.get('points'));
export const getRoutePointIds = createSelector(getRoutePoints, points => points.map(point => point.get('id')));
export const getRoutePointsCount = createSelector(getRoutePoints, points => points.size);
export const getRoutePointById = createSelector(getRoutePoints, points => memoize(id => {
  return points.find(point => point.get('id') === id) || null;
}));
export const getRouteError = createSelector(getRoute, state => state.get('error'));

export default getRoute;
