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

const defaultStatsState = {
  players: 0,
  haveJoined: false,
};
function stats(state = defaultStatsState, action, playerId) {
  if(action.type === firebaseTypes.dataReceived && action.payload.path === 'game' && !action.payload.error) {
    const newState = {...defaultStatsState};
    const {data} = action.payload;
    newState.players = Object.keys(data).filter(key => data[key].type === 'joinTeam').length;
    newState.haveJoined = !!Object.keys(data).find(key => data[key].type === 'joinTeam' && data[key].playerId === playerId);
    return newState;
  }
  return state;
}

const reducerShape = {
  cards,
  game,
  stats,
};

export default function(state = {}, action, playerId) {
  const nextState = {};
  Object.keys(reducerShape)
    .forEach(key => nextState[key] = reducerShape[key](state[key], action, playerId));
  return nextState;
}