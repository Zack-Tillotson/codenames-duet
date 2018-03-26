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

export default {
  createGame,
  joinGame,
}