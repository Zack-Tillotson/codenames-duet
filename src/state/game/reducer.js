import {combineReducers} from 'redux';
import types from './actionTypes';
import firebaseTypes from '../../firebase/actionTypes';

// Helpers /////////

function gameDataReceived(reducer) {
  return function(state = reducer(undefined, []), action) {
    if(action.type === firebaseTypes.dataReceived && action.payload.path === 'game') {
      const {data = []} = action.payload;
      return reducer(state, data);
    }
    return state;
  }
}

function getActionOfType(actions, type) {
  return actions.find(action => action.type === 'gameOver')
}

const cards = gameDataReceived(function(state = [], actions) {
  const action = getActionOfType(actions, 'startGame');
  if(action) {
    return action.value.cards;
  }
  return state;
});

const history = gameDataReceived(function(state = {}, actions) {
  return state;
});

const controls = gameDataReceived(function(state = {}, actions) {
  return state;
});

const gameState = gameDataReceived(function(state, actions) {
  if(actions.find(action => action.type === 'gameOver')) {
    return 'gameOver';
  }
  if(actions.find(action => action.type === 'startGame')) {
    return 'inGame';
  }
  return 'preGame';
});

export default combineReducers({
  gameState,
  cards,
  history,
  controls,
});