import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });

  store.runSaga = () => {
    if (store.saga) return;
    store.saga = sagaMiddleware.run(rootSaga);
  };

  store.stopSaga = async () => {
    if (!store.saga) return;
    store.dispatch(END);
    await store.saga.done;
    store.saga = null;
  };

  store.execSagaTasks = async (isServer, tasks) => {
    store.runSaga();
    tasks(store.dispatch);
    await store.stopSaga();
    if (!isServer) {
      store.runSaga();
    }
  };

  store.runSaga();

  return store;
}

export default configureAppStore;
