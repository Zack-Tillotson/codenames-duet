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
  const cards = yield getCards();
  const playerTeam = [0, 1].find(teamIndex => !teams[teamIndex].players.includes(playerId));

  const retMap = {};
  teams[playerTeam].map.forEach((mapValue, index) => retMap[cards[index].word] = mapValue);

  return retMap;
}

function* getCurrentPhase() {
  const {controls} = yield select(selector);
  return controls.phase;
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

  const phase = yield getCurrentPhase();
  if(phase !== 'guessing') return;

  const { word } = action.payload;
  const playerId = yield getPlayerId();
  const cards = yield getCards();
  const map = yield getPlayerMap(playerId);
  const cardType = map[word];

  yield put(firebase.putData('game', {
    playerId,
    type: eventTypes.guessWord,
    value: {word, cardType},
    when: firebaseRef.database.ServerValue.TIMESTAMP,
  }));
}

function* doPassGuessing(action) {
  const playerId = yield getPlayerId();

  yield put(firebase.putData('game', {
    playerId,
    type: eventTypes.endGuess,
    when: firebaseRef.database.ServerValue.TIMESTAMP,
  }));
}

function* handleGameControls() {
  yield takeEvery(types.submitClue, doSubmitClue);
  yield takeEvery(types.guessWord, doGuessWord);
  yield takeEvery(types.passGuessing, doPassGuessing);
}

export default [
  handleGameControls,
];