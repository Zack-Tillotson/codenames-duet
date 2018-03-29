import {gameDataReceived, getActionOfType} from '../reducer';
import {eventTypes} from '../../constants';

const defaultTurn = {
  cluer: '',
  isActive: false,
  clueWord: '',
  clueNum: -1,
  guesses: null,
};

const defaultState = {
  turns: [],
  visibles: {
    0: 15, // Spy
    1: 3, // Assassin
    2: 7, // Innocent
  },
};

const controls = gameDataReceived(function(state = defaultState, actions, playerId) {
  const nextState = {
    turns: [],
    visibles: {...defaultState.visibles},
  };

  actions.forEach(action => {
    switch(action.type) {
      case eventTypes.giveClue: { // Starts a turn
        nextState.turns.push({
          cluer: action.playerId,
          isActive: true,
          clueWord: action.value.word,
          clueNum: action.value.number,
          guesses: [],
        });
        break;
      }

      case eventTypes.endGuess: { // Ends round
        const activeTurn = nextState.turns[nextState.turns.length - 1];
        activeTurn.isActive = false;
        break;
      }

      case eventTypes.guessCard: { // Might end round
        const activeTurn = nextState.turns[nextState.turns.length - 1];
        activeTurn.guesses.push(action.guess);
        activeTurn.isActive = action.cardType === 0;

        nextState.visibles[action.cardType]--;
        break;
      }
    }
  });

  while(nextState.turns.length < 9) {
    nextState.turns.push(defaultTurn);
  }

  return nextState;

});

export default controls;