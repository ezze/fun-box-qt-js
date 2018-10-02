import { combineReducers } from 'redux-immutable';

import map from './map';
import route from './route';

export const reducerMap = ({
    map,
    route
});

const reducer = combineReducers(reducerMap);

export default reducer;
