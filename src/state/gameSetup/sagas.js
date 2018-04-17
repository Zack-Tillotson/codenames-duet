import { takeEvery, select, put } from 'redux-saga/effects';

import selector from './selector'
import authSelector from 'firebase/authSelector';

import types from './actionTypes';
import {eventTypes} from '../constants';

import firebase from '../../firebase/actions';
import firebaseRef from 'firebase';

function* getRandomCards() {
  const allCards = (yield select(selector)).cards;
  const randomizedCards = allCards.sort(() => Math.random() - .5);
  return randomizedCards.slice(0, 25);
}

const randSort = () => Math.random() - .5;

function* getRandomGameMaps() {

  // Map 1 is random with 9 spys, 3 assassins, and 6 bystanders
  const team1Map = {};

  const allIndex = new Array(25)
    .fill(0)
    .map((_, index) => index)
    .sort(randSort);

  allIndex.slice(0, 9).forEach(key => team1Map[key] = 0);
  allIndex.slice(9, 12).forEach(key => team1Map[key] = 1);
  allIndex.slice(12).forEach(key => team1Map[key] = 2);

  // Map 2 is somewhat less random. Exactly 3 spys are shared with map 1.
  // Of the 3 assassins, exactly 1 is a spy, 1 is also an assassin, and 1 a
  // bystander
  const team2Map = {};

  allIndex.slice(0, 3) // Shared spy
    .forEach(key => team2Map[key] = 0);
  allIndex.slice(3, 4) // spy -> assassin
    .forEach(key => team2Map[key] = 1);
  allIndex.slice(4, 9) // spy -> bystander
    .forEach(key => team2Map[key] = 2);

  team2Map[allIndex[9]] = 0; // assassin -> spy
  team2Map[allIndex[10]] = 1; // assassin -> assassin
  team2Map[allIndex[11]] = 2; // assassin -> bystander

  allIndex.slice(12, 13) // bystander -> assassin
    .forEach(key => team2Map[key] = 1);
  allIndex.slice(13, 18) // bystander -> spy
    .forEach(key => team2Map[key] = 0);
  allIndex.slice(18) // shared bystander
    .forEach(key => team2Map[key] = 2);

  return {team1Map, team2Map};
}

function* getPlayerId() {
  return (yield select(authSelector)).uid;
}

function* doCreateGame(action) {
  const playerId = yield getPlayerId();

  yield put(firebase.setData('game', []));
  yield put(firebase.putData('game', {
    playerId,
    type: eventTypes.joinTeam,
    value: 0,
    when: firebaseRef.database.ServerValue.TIMESTAMP,
  }));
}

function* doJoinGame(action) {
  const playerId = yield getPlayerId();

  yield put(firebase.putData('game', {
    playerId,
    type: eventTypes.joinTeam,
    value: 1,
    when: firebaseRef.database.ServerValue.TIMESTAMP,
  }));
}

function* doStartGame(action) {
  const playerId = yield getPlayerId();
  const cards = yield getRandomCards();
  const {team1Map, team2Map} = yield getRandomGameMaps();

  yield put(firebase.putData('game', {
    playerId,
    type: eventTypes.startGame,
    value: {cards, team1Map, team2Map},
    when: firebaseRef.database.ServerValue.TIMESTAMP,
  }));
}

function* handleGameControls() {
  yield takeEvery(types.createGame, doCreateGame);
  yield takeEvery(types.joinGame, doJoinGame);
  yield takeEvery(types.startGame, doStartGame);
}

export default [
  handleGameControls,
];