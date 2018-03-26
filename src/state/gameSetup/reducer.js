import {combineReducers} from 'redux';
import types from './actionTypes';
import firebaseTypes from '../../firebase/actionTypes';

function cards(state = [], action) {
  if(action.type === firebaseTypes.dataReceived && action.payload.path === 'cards') {
    return action.payload.data;
  }
  return state;
}

function game(state = [], action) {
  if(action.type === firebaseTypes.dataReceived && action.payload.path === 'game') {
    return action.payload.data;
  }
  return state;
}

export default combineReducers({
  cards,
  game,
});