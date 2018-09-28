import { createSelector } from 'reselect';

const getRoute = state => state.get('route');

export const getPlainRoute = createSelector(getRoute, state => state.toJS());

export default getRoute;
