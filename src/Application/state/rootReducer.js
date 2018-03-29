import {combineReducers} from 'redux';
import firebase from 'firebase/reducer';
import gameSetup from 'state/gameSetup/reducer';
import game from 'state/game/reducer';

import authSelector from 'firebase/authSelector';

export default function(state = {}, action) {
  const nextState = {};
  nextState.firebase = firebase(state.firebase, action);

  const playerId = authSelector(nextState).uid;

  nextState.gameSetup = gameSetup(state.gameSetup, action, playerId);
  nextState.game = game(state.game, action, playerId);

  if(Object.keys(nextState).find(key => nextState[key] !== state[key])) {
    return nextState;
  } else {
    return state;
  }
}