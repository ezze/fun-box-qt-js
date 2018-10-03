import { connect } from 'react-redux';

import RouteForm from '../RouteForm';

import {
    getMapLatitude,
    getMapLongitude
} from '../../selectors/map';

import {
    getRoutePointsCount,
    getRouteError
} from '../../selectors/route';

import {
    addRoutePoint
} from '../../actions/route';

export default connect(state => ({
    latitude: getMapLatitude(state),
    longitude: getMapLongitude(state),
    pointsCount: getRoutePointsCount(state),
    error: getRouteError(state)
}), {
    addPoint: addRoutePoint
})(RouteForm);
