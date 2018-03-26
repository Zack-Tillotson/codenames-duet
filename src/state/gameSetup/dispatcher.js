import actions from './actions';

export default dispatch => ({
  createGame:  () => dispatch(actions.createGame()),
  joinGame: () => dispatch(actions.joinGame()),
  startGame: () => dispatch(actions.startGame()),
});