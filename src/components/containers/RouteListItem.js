import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import RouteListItem from '../RouteListItem';

import {
  getRoutePointById
} from '../../selectors/route';

import {
  removeRoutePoint
} from '../../actions/route';

export default connect((state, props) => ({
  point: getRoutePointById(state)(props.id)
}), {
  removePoint: removeRoutePoint
})(withImmutablePropsToJS(RouteListItem));
