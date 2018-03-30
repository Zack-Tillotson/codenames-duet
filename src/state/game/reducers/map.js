import {gameDataReceived, getActionOfType} from '../reducer';
import {eventTypes} from '../../constants';

const map = gameDataReceived(function(state = {}, actions, playerId) {

  const gameStartEvent = getActionOfType(actions, eventTypes.startGame);
  const joinTeamEvent = actions.find(action => action.type === eventTypes.joinTeam && action.playerId === playerId);

  if(!gameStartEvent || !joinTeamEvent) {
    return state;
  }

  const {cards, team1Map, team2Map} = gameStartEvent.value;
  const map = joinTeamEvent.value === 0 ? team1Map : team2Map;

  const nextState = {};
  map.forEach((cardType, index) => nextState[cards[index]] = cardType);
  return nextState;

});

export default map;