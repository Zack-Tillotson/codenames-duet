import actions from './actions';

export default dispatch => ({
  updateClueWord(word) {
    dispatch(actions.updateClueWord(word));
  },
  updateClueNum(num) {
    dispatch(actions.updateClueNum(num));
  },
  submitClue(word, num) {
    dispatch(actions.submitClue(word, num));
  },
  guessWord(word) {
    dispatch(actions.guessWord(word));
  },
  passGuessing() {
    dispatch(actions.passGuessing());
  },
});