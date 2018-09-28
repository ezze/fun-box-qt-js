import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

const middlewares = [thunkMiddleware];

if (NODE_ENV === 'development') {
    const loggerMiddleware = createLogger({
        stateTransformer: state => state.toJS(),
        collapsed: (getState, action, logEntry) => !logEntry.error
    });
    middlewares.push(loggerMiddleware);
}

const store = createStore(
    reducer,
    undefined,
    compose(applyMiddleware.apply(undefined, middlewares))
);

if (NODE_ENV === 'development') {
    console.log(store.getState().toJS());
}

export default store;
