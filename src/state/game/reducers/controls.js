import {gameDataReceived, getActionOfType} from '../reducer';
import {eventTypes} from '../../constants';

const phases = {
  disabled: 'disabled',
  guessing: 'guessing',
  themGuessing: 'themGuessing',
  clueing: 'clueing',
  themClueing: 'themClueing',
  gameOver: 'gameOver',
};

const defaultState = {
  phase: phases.disabled,
  clueWord: '',
  clueNum: 0,
}

const controls = gameDataReceived(function(state = defaultState, actions, playerId) {

  if(actions.filter(action => action.type === 'guessWord' && action.value.cardType === 0).length === 15) {
    return {
      ...state,
      phase: phases.gameOver,
    }
  }

  const reverseActions = [...actions].reverse();
  let lastPhaseChange = getActionOfType(reverseActions, eventTypes.giveClue, eventTypes.endGuess, eventTypes.startGame, eventTypes.guessWord);

  if(!lastPhaseChange) {
    return state;
  }

  // Treat correct guesses like we're still on the latest clue
  if(lastPhaseChange.type === eventTypes.guessWord && lastPhaseChange.value.cardType === 0) {
    lastPhaseChange = getActionOfType(reverseActions, eventTypes.giveClue);
  }

  let phase = phases.clueing;
  if(lastPhaseChange.type === eventTypes.giveClue) {
    phase = playerId === lastPhaseChange.playerId ? phases.themGuessing : phases.guessing;
  } else if(lastPhaseChange.type === eventTypes.endGuess) {
    phase = playerId === lastPhaseChange.playerId ? phases.clueing : phases.themClueing;
  } else if(lastPhaseChange.type === eventTypes.guessWord && lastPhaseChange.value.cardType === 1) { // Was assassin
    phase = phases.gameOver;
  } else if(lastPhaseChange.type === eventTypes.guessWord) { // cardType == 1
    phase = playerId === lastPhaseChange.playerId ? phases.clueing : phases.themClueing;
  }

  const clueWord = lastPhaseChange.value ? lastPhaseChange.value.word : '';
  const clueNum = lastPhaseChange.value ? lastPhaseChange.value.number : 0;

  return {
    phase,
    clueWord,
    clueNum,
  };
});

export default controls;