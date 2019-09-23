import { fromJS } from 'immutable';

import {
  getMap,
  getMapLatitude,
  getMapLongitude,
  getMapZoom
} from '../../src/selectors/map';

const predefined = {
  map: {
    latitude: 30.0,
    longitude: 45.0,
    zoom: 9
  }
};

describe('map selectors', () => {
  let state;

  beforeEach(() => {
    state = fromJS(predefined);
  });

  it('get map state', () => {
    expect(getMap(state)).toEqual(fromJS(predefined.map));
  });

  it('get map latitude', () => {
    expect(getMapLatitude(state)).toEqual(predefined.map.latitude);
  });

  it('get map longitude', () => {
    expect(getMapLongitude(state)).toEqual(predefined.map.longitude);
  });

  it('get map zoom', () => {
    expect(getMapZoom(state)).toEqual(predefined.map.zoom);
  });
});
