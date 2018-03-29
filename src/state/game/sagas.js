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

function* getCards() {
  return (yield select(selector)).cards;
}

function* getPlayerMap(playerId) {
  const teams = (yield select(selector)).teams;
  const playerTeam = [0, 1].find(teamIndex => teams[teamIndex].players.includes(playerId));
  return teams[playerTeam].map;
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


function* doGuessWord(action) {
  const { word } = action.payload;
  const playerId = yield getPlayerId();
  const cards = yield getCards();
  const map = yield getPlayerMap(playerId);
  const cardType = map[cards.indexOf(word)];

  yield put(firebase.putData('game', {
    playerId,
    type: eventTypes.guessWord,
    value: {word, cardType},
    when: firebaseRef.database.ServerValue.TIMESTAMP,
  }));
}

function* handleGameControls() {
  yield takeEvery(types.submitClue, doSubmitClue);
  yield takeEvery(types.guessWord, doGuessWord);
}

export default [
  handleGameControls,
];