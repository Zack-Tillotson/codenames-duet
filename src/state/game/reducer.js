import {combineReducers} from 'redux';
import types from './actionTypes';
import firebaseTypes from '../../firebase/actionTypes';
import {eventTypes} from '../constants';

import history from './reducers/history';
import controls from './reducers/controls';
import teams from './reducers/teams';

// Helpers /////////

export function gameDataReceived(reducer) {
  return function(state = reducer(undefined, []), action) {
    if(action.type === firebaseTypes.dataReceived && action.payload.path === 'game') {
      let {data} = action.payload;
      if(data) data = Object.keys(data).map(key => data[key]);
      return reducer(state, data);
    }
    return state;
  }
}

export function getActionOfType(actions, ...types) {
  return actions.find(action => types.indexOf(action.type) >= 0)
}

const cards = gameDataReceived(function(state = [], actions) {
  const action = getActionOfType(actions, eventTypes.startGame);
  if(action) {
    return action.value.cards;
  }
  return state;
});

const gameState = gameDataReceived(function(state = [], actions) {
  if(actions.find(action => action.type === eventTypes.gameOver)) {
    return 'gameOver';
  }
  if(actions.find(action => action.type === eventTypes.startGame)) {
    return 'inGame';
  }
  return 'preGame';
});

const defaultUiState = {
  clueWord: '',
  clueNum: 0,
};

function ui(state = defaultUiState, action) {
  switch(action.type) {
    case types.updateClueWord: {
      return {
        ...state,
        clueWord: action.payload.word,
      };
    }
    case types.updateClueNum: {
      return {
        ...state,
        clueNum: action.payload.num,
      };
    }
    case types.resetClues: {
      return defaultUiState;
    }
  }
  return state;
}

export default combineReducers({
  gameState,
  cards,
  history,
  controls,
  ui,
  teams,
});