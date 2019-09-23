import { createLogger } from 'redux-logger';

export function getLoggerMiddleware() {
  return createLogger({
    stateTransformer: state => state.toJS(),
    collapsed: (getState, action, logEntry) => !logEntry.error
  });
}
