import { all, takeEvery, put, fork } from 'redux-saga/effects';
import { createBrowserHistory } from 'history';

import { getToken, clearToken } from '@iso/lib/helpers/utility';
import actions from './actions';

import jwt from 'express-jwt'; //
const history = createBrowserHistory();
const authMiddleware = jwt({
  secret: 'hajksdfh238yrewhcisdhca0w89eryq39hfjkesfhiyd378ry',
}); // replace 'your_secret_key' with your actual secret key

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function* ({ payload }) {
    const { token } = payload;
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: token,
        profile: 'Profile',
      });
    } else {
      // Wrap authMiddleware call in a Promise
      const authenticate = () =>
        new Promise((resolve, reject) => {
          authMiddleware(null, null, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });

      // Use yield to wait for the result of the Promise
      try {
        yield authenticate();
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: 'hajksdfh238yrewhcisdhca0w89eryq39hfjkesfhiyd378ry',
          profile: 'Profile',
        });
      } catch (err) {
        yield put({ type: actions.LOGIN_ERROR });
      }
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* ({ payload }) {
    yield localStorage.setItem('id_token', payload.token);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield clearToken();
    history.push('/');
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const token = getToken().get('idToken');
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        profile: 'Profile',
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
