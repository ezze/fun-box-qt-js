import { fromJS } from 'immutable';

import { routeInbound, routeOutbound } from '../src/stateTransform';

import { predefinedPoints } from './constants';

const predefinedState = {
    points: predefinedPoints,
    error: '',
    maxPointId: 5
};

describe('route state transformation', () => {
    let state;

    beforeEach(() => {
        state = fromJS(predefinedState);
    });

    it('inbound state doesn\'t contain maxPointId', () => {
        const newState = routeInbound(state);
        expect(newState.get('maxPointId')).toBeFalsy();
    });

    it('outbound state doesn\'t contain maxPointId', () => {
        const newState = routeOutbound(state);
        expect(newState.get('maxPointId')).toBeFalsy();
    });
});
