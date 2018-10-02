import { createSelector } from 'reselect';

export const getRoute = state => state.get('route');

export const getRoutePoints = createSelector(getRoute, state => state.get('points').toJS());
export const getRoutePointsCount = createSelector(getRoute, state => state.get('points').size);
export const getRouteError = createSelector(getRoute, state => state.get('error'));

export default getRoute;
