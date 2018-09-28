import { connect } from 'react-redux';

import RouteList from '../RouteList';

import {
    getRoutePoints
} from '../../selector/route';

import {
    removeRoutePoint
} from '../../actions/route';

const mapStateToProps = state => {
    return {
        points: getRoutePoints(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removePoint: index => dispatch(removeRoutePoint(index))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
