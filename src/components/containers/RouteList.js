import { connect } from 'react-redux';

import RouteList from '../RouteList';

import {
    getPlainRoute
} from '../../selector/route';

import {
    removeRoutePoint
} from '../../actions/route';

const mapStateToProps = state => {
    return {
        route: getPlainRoute(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removePoint: index => dispatch(removeRoutePoint(index))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
