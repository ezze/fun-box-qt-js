import Immutable from 'immutable';

import {
    SET_MAP_LATITUDE,
    SET_MAP_LONGITUDE,
    SET_MAP_CENTER,
    SET_MAP_ZOOM,
    defaultMapLatitude,
    defaultMapLongitude,
    defaultMapZoom
} from '../constants';

const defaultValue = Immutable.fromJS({
    latitude: defaultMapLatitude,
    longitude: defaultMapLongitude,
    zoom: defaultMapZoom
});

const reducer = (state = defaultValue, action) => {
    switch (action.type) {
        case SET_MAP_LATITUDE: {
            const { latitude } = action;
            return state.set('latitude', latitude);
        }

        case SET_MAP_LONGITUDE: {
            const { longitude } = action;
            return state.set('longitude', longitude);
        }

        case SET_MAP_CENTER: {
            const { latitude, longitude } = action;
            return state.merge({
                latitude,
                longitude
            });
        }

        case SET_MAP_ZOOM: {
            const { zoom } = action;
            return state.set('zoom', zoom);
        }

        default: {
            return state;
        }
    }
};

export default reducer;
