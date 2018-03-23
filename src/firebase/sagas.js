import actionTypes from './actionTypes';
import {take, takeEvery, call, put} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import firebase from './';

function* dispatchData(payload) {
  yield put({type: actionTypes.dataReceived, payload});
}

function* handleSyncingData() {
  yield takeEvery(actionTypes.syncConnection, function*(action) {
    const channel = eventChannel(
      emit => {
        firebase.syncConnection(emit);
        return () => database.ref(path).off(listener);
      }
    );
    while(true) {
      const data = yield take(channel);
      yield dispatchData(data);
    }
  })
  yield takeEvery(actionTypes.syncData, function*(action) {
    const channel = eventChannel(
      emit => {
        firebase.syncData(emit, action.payload.path);
        return () => database.ref(path).off(listener);
      }
    );
    while(true) {
      const data = yield take(channel);
      yield dispatchData(data);
    }
  });
}

function* handleLogin() {
  yield takeEvery(actionTypes.requestAuth, function*(action) {
    yield call(firebase.requestAuth, action.payload.service, error => {console.log("Firebase auth error!", error)});
  });
  yield takeEvery(actionTypes.requestUnauth, function*(action) {
    yield call(firebase.requestUnauth, error => {console.log("Firebase auth error!", error)});
  });
}

export default [
  handleSyncingData,
  handleLogin,
];