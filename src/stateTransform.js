import { createTransform } from 'redux-persist';

function routeInbound(state) {
    return state.withMutations(state => {
        state.delete('maxPointId');
    });
}

function routeOutbound(state) {
    return state.withMutations(state => {
        state.delete('maxPointId');
    });
}

export const routeTransform = createTransform(routeInbound, routeOutbound, {
    whitelist: ['route']
});
