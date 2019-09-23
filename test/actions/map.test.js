import {
  SET_MAP_LATITUDE,
  SET_MAP_LONGITUDE,
  SET_MAP_CENTER,
  SET_MAP_ZOOM
} from '../../src/constants';

import {
  setMapLatitude,
  setMapLongitude,
  setMapCenter,
  setMapZoom
} from '../../src/actions/map';

describe('map action creators', () => {
  it('create action to set map latitude', () => {
    const latitude = 30.0;
    expect(setMapLatitude(latitude)).toEqual({
      type: SET_MAP_LATITUDE,
      latitude
    });
  });

  it('create action to set map longitude', () => {
    const longitude = 45.0;
    expect(setMapLongitude(longitude)).toEqual({
      type: SET_MAP_LONGITUDE,
      longitude
    });
  });

  it('create action to set map center', () => {
    const latitude = 30.0;
    const longitude = 45.0;
    expect(setMapCenter(latitude, longitude)).toEqual({
      type: SET_MAP_CENTER,
      latitude,
      longitude
    });
  });

  it('create action to set map zoom', () => {
    const zoom = 13;
    expect(setMapZoom(zoom)).toEqual({
      type: SET_MAP_ZOOM,
      zoom
    });
  });
});
