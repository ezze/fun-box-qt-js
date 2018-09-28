import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';

import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { routeTransform } from './stateTransform';
import reducer from './reducer';

let store = null;
let storePersistor = null;

export function getStore() {
    if (store === null) {
        const middlewares = [thunkMiddleware];

        if (NODE_ENV === 'development') {
            const loggerMiddleware = createLogger({
                stateTransformer: state => state.toJS(),
                collapsed: (getState, action, logEntry) => !logEntry.error
            });
            middlewares.push(loggerMiddleware);
        }

        store = createStore(
            reducer,
            undefined,
            compose(applyMiddleware.apply(undefined, middlewares), autoRehydrate())
        );

        return new Promise(resolve => {
            storePersistor = persistStore(store, { keyPrefix: 'app ', transforms: [routeTransform] }, () => {
                resolve(store);
            });
        });
    }

    return Promise.resolve(store);
}

export async function getStorePersistor() {
    if (storePersistor === null) {
        await getStore();
    }
    return Promise.resolve(storePersistor);
}
