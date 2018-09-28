import { connect } from 'react-redux';

import RouteForm from '../RouteForm';

import {
    getMapLatitude,
    getMapLongitude
} from '../../selector/map';

import {
    getRouteError
} from '../../selector/route';

import {
    addRoutePoint
} from '../../actions/route';

const mapStateToProps = state => {
    return {
        latitude: getMapLatitude(state),
        longitude: getMapLongitude(state),
        error: getRouteError(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addPoint: (name, latitude, longitude) => dispatch(addRoutePoint(name, latitude, longitude))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteForm);
