import Immutable from 'immutable';

import {
    ADD_ROUTE_POINT,
    REMOVE_ROUTE_POINT
} from '../constants';

const defaultValue = Immutable.fromJS([]);

const reducer = (state = defaultValue, action) => {
    switch (action.type) {
        case ADD_ROUTE_POINT: {
            const { name, latitude, longitude } = action;

            const lastPoint = state.get(-1, null);
            if (
                lastPoint !== null &&
                lastPoint.get('latitude') === latitude &&
                lastPoint.get('longitude') === longitude
            ) {
                return state;
            }

            if (!name.trim()) {
                return state;
            }

            return state.push(Immutable.fromJS({ name: name.trim(), latitude, longitude }));
        }

        case REMOVE_ROUTE_POINT: {
            const { index } = action;
            return state.delete(index);
        }

        default: {
            return state;
        }
    }
};

export default reducer;
