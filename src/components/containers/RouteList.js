import { connect } from 'react-redux';

import RouteList from '../RouteList';

import {
    getRoutePoints
} from '../../selectors/route';

import {
    removeRoutePoint
} from '../../actions/route';

export default connect(state => ({
    points: getRoutePoints(state)
}), {
    removePoint: removeRoutePoint
})(RouteList);
