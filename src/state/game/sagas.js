import { takeEvery, select, put } from 'redux-saga/effects';

import selector from './selector'
import authSelector from 'firebase/authSelector';

import types from './actionTypes';

import firebase from '../../firebase/actions';
import firebaseRef from 'firebase';


function* getPlayerId() {
  return (yield select(authSelector)).uid;
}



function* handleGameControls() {
}

export default [

];