import {gameDataReceived, getActionOfType} from '../reducer';
import {eventTypes} from '../../constants';

const defaultState = {
  0: {
    players: [],
    map: [],
  },
  1: {
    players: [],
    map: [],
  },
};

const teams = gameDataReceived(function(state = defaultState, actions, playerId) {

  let nextState = state;

  actions.forEach(action => {
    switch(action.type) {

      case eventTypes.joinTeam: {
        const currentTeam = nextState[action.value]
        nextState = {
          ...nextState,
          [action.value]: {
            ...currentTeam,
            players: [...currentTeam.players, action.playerId],
          },
        };
      }
      break;

      case eventTypes.startGame: {
        nextState = {
          0: {
            ...nextState[0],
            map: action.value.team1Map,
          },
          1: {
            ...nextState[1],
            map: action.value.team2Map,
          },
        };
      }
      break;
    }
  });

  return nextState;
});

export default teams;