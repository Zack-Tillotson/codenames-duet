import types from './actionTypes';

function createGame() {
  return {
    type: types.createGame,
  };
}

function joinGame() {
  return {
    type: types.joinGame,
  };
}

function startGame() {
  return {
    type: types.startGame,
  };
}

export default {
  createGame,
  joinGame,
  startGame,
}