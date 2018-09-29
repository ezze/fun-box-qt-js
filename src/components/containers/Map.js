import { connect } from 'react-redux';

import Map from '../Map';

import {
    getMapLatitude,
    getMapLongitude,
    getMapZoom
} from '../../selector/map';

import {
    getRoutePoints
} from '../../selector/route';

import {
    setMapCenter,
    setMapZoom
} from '../../actions/map';

import {
    moveRoutePoint
} from '../../actions/route';

const mapStateToProps = state => {
    return {
        latitude: getMapLatitude(state),
        longitude: getMapLongitude(state),
        zoom: getMapZoom(state),
        points: getRoutePoints(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCenter: (latitude, longitude) => dispatch(setMapCenter(latitude, longitude)),
        setZoom: zoom => dispatch(setMapZoom(zoom)),
        movePoint: (id, latitude, longitude) => dispatch(moveRoutePoint(id, latitude, longitude))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
