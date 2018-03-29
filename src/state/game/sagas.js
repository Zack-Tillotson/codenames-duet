import { takeEvery, select, put } from 'redux-saga/effects';

import selector from './selector'
import authSelector from 'firebase/authSelector';

import types from './actionTypes';
import {eventTypes} from '../constants';

import firebase from '../../firebase/actions';
import firebaseRef from 'firebase';


function* getPlayerId() {
  return (yield select(authSelector)).uid;
}

function* doSubmitClue(action) {
  const { word, num: number } = action.payload;
  const playerId = yield getPlayerId();

  yield put(firebase.putData('game', {
    playerId,
    type: eventTypes.giveClue,
    value: {word, number},
    when: firebaseRef.database.ServerValue.TIMESTAMP,
  }));
}

function* handleGameControls() {
  yield takeEvery(types.submitClue, doSubmitClue);
}

export default [
  handleGameControls,
];