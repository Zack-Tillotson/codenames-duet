import {gameDataReceived, getActionOfType} from '../reducer';
import {eventTypes} from '../../constants';

const phases = {
  disabled: 'disabled',
  guessing: 'guessing',
  guessing: 'themGuessing',
  clueing: 'clueing',
  themClueing: 'themClueing',
};

const defaultState = {
  phase: phases.disabled,
  clueWord: '',
  clueNum: 0,
}

const controls = gameDataReceived(function(state = defaultState, actions, playerId) {

  const reverseActions = [...actions].reverse();
  const lastPhaseChange = getActionOfType(reverseActions, eventTypes.giveClue, eventTypes.endGuess, eventTypes.startGame, eventTypes.guessCard);

  if(!lastPhaseChange) {
    return state;
  }

  // No change if found a spy
  if(lastPhaseChange.type === eventTypes.guessCard && lastPhaseChange.cardType === 0) {
    return state;
  }

  let phase = phases.clueing;
  if(lastPhaseChange.type === eventTypes.giveClue) {
    phase = playerId === lastPhaseChange.playerId ? phases.themGuessing : phases.guessing;
  } else if(lastPhaseChange.type === eventTypes.endGuess) {
    phase = playerId === lastPhaseChange.playerId ? phases.clueing : phases.themClueing;
  } else if(lastPhaseChange.type === eventTypes.guessCard) { // Was incorrect
    phase = playerId === lastPhaseChange.playerId ? phases.clueing : phases.themClueing;
  }

  return {
    phase,
    clueWord: lastPhaseChange.value.word || '',
    clueNum: lastPhaseChange.value.number,
  };
});

export default controls;