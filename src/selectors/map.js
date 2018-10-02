import { createSelector } from 'reselect';

export const getMap = state => state.get('map');

export const getMapLatitude = createSelector(getMap, state => state.get('latitude'));
export const getMapLongitude = createSelector(getMap, state => state.get('longitude'));
export const getMapZoom = createSelector(getMap, state => state.get('zoom'));

export default getMap;
