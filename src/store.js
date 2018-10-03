import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';

import thunkMiddleware from 'redux-thunk';

import { getLoggerMiddleware } from './debug';
import { routeTransform } from './stateTransform';
import reducer from './reducers';

let store = null;

export async function getStore(recreate = false) {
    if (store === null || recreate) {
        const middlewares = [thunkMiddleware];
        if (NODE_ENV === 'development') {
            middlewares.push(getLoggerMiddleware());
        }

        store = createStore(
            reducer,
            undefined,
            compose(applyMiddleware.apply(undefined, middlewares), autoRehydrate())
        );

        await new Promise(resolve => {
            persistStore(store, { keyPrefix: 'app ', transforms: [routeTransform] }, () => {
                resolve(store);
            });
        });
    }

    return Promise.resolve(store);
}
