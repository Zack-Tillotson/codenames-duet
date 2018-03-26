import { takeEvery, select, put } from 'redux-saga/effects';

import selector from './selector'
import authSelector from 'firebase/authSelector';

import types from './actionTypes';

import firebase from '../../firebase/actions';
import firebaseRef from 'firebase';

const GAME_CARD_COUNT = 25;
const CARD_SPY_COUNT = 15;
const CARD_ASSASSIN_COUNT = 3;

function* getRandomCards() {
  const allCards = (yield select(selector)).cards;
  const randomizedCards = allCards.sort(() => Math.random() - .5);
  return randomizedCards.slice(0, GAME_CARD_COUNT);
}

function* getRandomGameMap() {
  const allIndex = new Array(GAME_CARD_COUNT)
    .fill(0)
    .map((_, index) => index)
    .sort(() => Math.random() - .5);

  const gameMap = {};

  allIndex.slice(0, CARD_SPY_COUNT).forEach(key => gameMap[key] = 0);
  allIndex.slice(CARD_SPY_COUNT, CARD_SPY_COUNT + CARD_ASSASSIN_COUNT).forEach(key => gameMap[key] = 1);
  allIndex.slice(CARD_SPY_COUNT + CARD_ASSASSIN_COUNT).forEach(key => gameMap[key] = 2);

  return gameMap;
}

function* getPlayerId() {
  return (yield select(authSelector)).uid;
}

function* doCreateGame(action) {
  const playerId = yield getPlayerId();

  yield put(firebase.setData('game', {}));
  yield put(firebase.putData('game/actions', {
    playerId,
    action: 'joinTeam',
    value: 0,
    when: firebaseRef.database.ServerValue.TIMESTAMP,
  }));
}

function* doJoinGame(action) {
  const playerId = yield getPlayerId();

  yield put(firebase.putData('game/actions', {
    playerId,
    action: 'joinTeam',
    value: 1,
    when: firebaseRef.database.ServerValue.TIMESTAMP,
  }));
}

function* doStartGame(action) {
  const playerId = yield getPlayerId();
  const cards = yield getRandomCards();
  const team1Map = yield getRandomGameMap();
  const team2Map = yield getRandomGameMap();

  yield put(firebase.putData('game/actions', {
    playerId,
    action: 'startGame',
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