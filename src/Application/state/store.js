import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

import firebaseSagas from '../../firebase/sagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,
];

if(__DEBUG__) {
  middleware.unshift(createLogger());
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, applyMiddleware(...middleware), initialState);
  firebaseSagas.forEach(saga => sagaMiddleware.run(saga));

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./rootReducer', () =>
      store.replaceReducer(require('./rootReducer').default)
    );
  }

  return store;
}