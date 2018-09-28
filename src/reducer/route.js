import Immutable from 'immutable';

import {
    ADD_ROUTE_POINT,
    REMOVE_ROUTE_POINT
} from '../constants';

const defaultValue = Immutable.fromJS({
    points: [],
    error: ''
});

const reducer = (state = defaultValue, action) => {
    switch (action.type) {
        case ADD_ROUTE_POINT: {
            const { name, latitude, longitude } = action;

            if (!name.trim()) {
                return state.set('error', 'Имя точки маршрута не может быть пустым.');
            }

            const points = state.get('points');
            let maxPointId = state.get('maxPointId', null);
            if (maxPointId === null) {
                maxPointId = points.reduce((maxId, point) => {
                    const id = point.get('id');
                    return id > maxId ? id : maxId;
                }, 0);
            }

            const lastPoint = points.get(-1, null);
            if (
                lastPoint !== null &&
                lastPoint.get('latitude') === latitude &&
                lastPoint.get('longitude') === longitude
            ) {
                return state.set(
                    'error',
                    'Координаты новой точки маршрута не могут быть такими же, как у предыдущей точки.'
                );
            }

            const newPointId = maxPointId + 1;
            return state.merge({
                maxPointId: newPointId,
                points: points.push(Immutable.fromJS({ id: newPointId, name: name.trim(), latitude, longitude })),
                error: ''
            });
        }

        case REMOVE_ROUTE_POINT: {
            const { index } = action;
            const points = state.get('points');
            return state.merge({
                points: points.delete(index),
                error: ''
            });
        }

        default: {
            return state;
        }
    }
};

export default reducer;
