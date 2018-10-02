import { fromJS } from 'immutable';

import {
    SET_MAP_LATITUDE,
    SET_MAP_LONGITUDE,
    SET_MAP_CENTER,
    SET_MAP_ZOOM,
    defaultMapLatitude,
    defaultMapLongitude,
    defaultMapZoom
} from '../../src/constants';

import reducer from '../../src/reducers/map';

describe('map reducer', () => {
    it('return initial state', () => {
        expect(reducer(undefined, {})).toEqual(fromJS({
            latitude: defaultMapLatitude,
            longitude: defaultMapLongitude,
            zoom: defaultMapZoom
        }));
    });

    it('handle SET_MAP_LATITUDE action', () => {
        const latitude = 30.0;
        expect(reducer(undefined, {
            type: SET_MAP_LATITUDE,
            latitude
        })).toEqual(fromJS({
            latitude,
            longitude: defaultMapLongitude,
            zoom: defaultMapZoom
        }));
    });

    it('handle SET_MAP_LONGITUDE action', () => {
        const longitude = 45.0;
        expect(reducer(undefined, {
            type: SET_MAP_LONGITUDE,
            longitude
        })).toEqual(fromJS({
            latitude: defaultMapLatitude,
            longitude,
            zoom: defaultMapZoom
        }));
    });

    it('handle SET_MAP_CENTER action', () => {
        const latitude = 30.0;
        const longitude = 45.0;
        expect(reducer(undefined, {
            type: SET_MAP_CENTER,
            latitude,
            longitude
        })).toEqual(fromJS({
            latitude,
            longitude,
            zoom: defaultMapZoom
        }));
    });

    it('handle SET_MAP_ZOOM action', () => {
        const zoom = 9;
        expect(reducer(undefined, {
            type: SET_MAP_ZOOM,
            zoom
        })).toEqual(fromJS({
            latitude: defaultMapLatitude,
            longitude: defaultMapLongitude,
            zoom
        }));
    });
});
