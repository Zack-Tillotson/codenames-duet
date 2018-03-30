import {gameDataReceived, getActionOfType} from '../reducer';
import {eventTypes} from '../../constants';

const defaultCard = {
  word: '',
  p1Type: -1,
  p2Type: -1,
};

const defaultState = [];

const cards = gameDataReceived(function(state = [], actions, playerId) {

  if(state.length === 0) {
    const action = getActionOfType(actions, eventTypes.startGame);
    if(action) {
      return action.value.cards.map(word => ({...defaultCard, word}));
    }
  } else {
    const nextState = [...cards];
    actions.forEach(action => {
      if(action.type !== eventTypes.guessCard) {
        return;
      }
    });
    return nextState;
  }
  return state;
});

export default cards;