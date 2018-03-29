import types from './actionTypes';

function updateClueWord(word) {
  return {
    type: types.updateClueWord,
    payload: {
      word,
    },
  };
}

function updateClueNum(num) {
  return {
    type: types.updateClueNum,
    payload: {
      num,
    },
  };
}

function resetClues(num) {
  return {
    type: types.resetClues,
  };
}

function submitClue(word, num) {
  return {
    type: types.submitClue,
    payload: {
      word,
      num,
    },
  };
}

export default {
  updateClueWord,
  updateClueNum,
  resetClues,
  submitClue,
}