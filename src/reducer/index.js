import { combineReducers } from 'redux-immutable';

import map from './map';
import route from './route';

const reducer = combineReducers({
    map,
    route
});

export default reducer;
