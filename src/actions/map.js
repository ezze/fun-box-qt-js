import {
  SET_MAP_LATITUDE,
  SET_MAP_LONGITUDE,
  SET_MAP_CENTER,
  SET_MAP_ZOOM
} from '../constants';

export const setMapLatitude = latitude => {
  return {
    type: SET_MAP_LATITUDE,
    latitude
  };
};

export const setMapLongitude = longitude => {
  return {
    type: SET_MAP_LONGITUDE,
    longitude
  };
};

export const setMapCenter = (latitude, longitude) => {
  return {
    type: SET_MAP_CENTER,
    latitude,
    longitude
  };
};

export const setMapZoom = zoom => {
  return {
    type: SET_MAP_ZOOM,
    zoom
  };
};
