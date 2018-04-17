import {gameDataReceived, getActionOfType} from '../reducer';
import {eventTypes} from '../../constants';

const defaultCard = {
  word: '',
  cardType: -1, // -1 default, 0 or 1 is 'end' guess, 2 is either
  bystanders: [], // player ids of bystander guessing
};

const cards = gameDataReceived(function(state = [], actions, playerId) {

  let nextState = [...state];

  const action = getActionOfType(actions, eventTypes.startGame);
  if(action) {
    nextState = action.value.cards.map(word => ({...defaultCard, word}));
  }

  actions.forEach(action => {
    if(action.type !== eventTypes.guessWord) {
      return;
    }

    const { playerId } = action;
    const { word, cardType } = action.value;

    const wordIndex = nextState.findIndex(card => card.word === word);

    const nextCard = {...nextState[wordIndex]};
    if(cardType === 2) {
      nextCard.bystanders = [...nextCard.bystanders, playerId];
    }

    if(cardType !== 2 || nextCard.bystanders.length > 1) {
      nextCard.cardType = cardType;
    }

    nextState[wordIndex] = nextCard;
  });

  return nextState;
});

export default cards;