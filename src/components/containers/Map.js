import { connect } from 'react-redux';

import Map from '../Map';

import {
  getMapLatitude,
  getMapLongitude,
  getMapZoom
} from '../../selectors/map';

import {
  getRoutePoints
} from '../../selectors/route';

import {
  setMapCenter,
  setMapZoom
} from '../../actions/map';

import {
  relocateRoutePoint
} from '../../actions/route';

export default connect(state => ({
  latitude: getMapLatitude(state),
  longitude: getMapLongitude(state),
  zoom: getMapZoom(state),
  points: getRoutePoints(state)
}), {
  setCenter: setMapCenter,
  setZoom: setMapZoom,
  relocatePoint: relocateRoutePoint
})(Map);
