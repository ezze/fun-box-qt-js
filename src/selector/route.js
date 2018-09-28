import { createSelector } from 'reselect';

const getRoute = state => state.get('route');

export const getRoutePoints = createSelector(getRoute, state => state.get('points').toJS());
export const getRouteError = createSelector(getRoute, state => state.get('error'));

export default getRoute;
