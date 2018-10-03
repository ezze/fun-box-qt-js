import { createTransform } from 'redux-persist';

export function routeInbound(state) {
    return state.withMutations(state => {
        state.delete('maxPointId');
    });
}

export function routeOutbound(state) {
    return state.withMutations(state => {
        state.delete('maxPointId');
    });
}

export const routeTransform = createTransform(routeInbound, routeOutbound, {
    whitelist: ['route']
});
