import { connect } from 'react-redux';

import Map from '../Map';

import {
    getMapLatitude,
    getMapLongitude,
    getMapZoom
} from '../../selector/map';

import {
    getPlainRoute
} from '../../selector/route';

import {
    setMapCenter,
    setMapZoom
} from '../../actions/map';

const mapStateToProps = state => {
    return {
        latitude: getMapLatitude(state),
        longitude: getMapLongitude(state),
        zoom: getMapZoom(state),
        route: getPlainRoute(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setCenter: (latitude, longitude) => dispatch(setMapCenter(latitude, longitude)),
        setZoom: zoom => dispatch(setMapZoom(zoom))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
