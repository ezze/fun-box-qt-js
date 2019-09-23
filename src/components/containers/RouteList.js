import { connect } from 'react-redux';
import withImmutablePropsToJS from 'with-immutable-props-to-js';

import RouteList from '../RouteList';

import {
  getRoutePointIds
} from '../../selectors/route';

export default connect(state => ({
  pointIds: getRoutePointIds(state)
}))(withImmutablePropsToJS(RouteList));
