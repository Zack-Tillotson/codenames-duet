import {combineReducers} from 'redux';
import firebase from 'firebase/reducer';
import gameSetup from 'state/gameSetup/reducer';
import game from 'state/game/reducer';

export default combineReducers({
  firebase,
  game,
  gameSetup,
});