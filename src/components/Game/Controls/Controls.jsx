import React from 'react';
import {connect} from 'react-redux';
import selector from 'state/game/selector';
import dispatcher from 'state/game/dispatcher';

import './styles';

const Controls = function({children, ui: {clueWord: uiClueWord, clueNum: uiClueNum}, controls: {phase, clueWord, clueNum}, updateClueWord, updateClueNum, submitClue}) {
  const handleClueWordChange = (event) => {
    updateClueWord(event.target.value);
  };
  const handleClueNumberChange = (event) => {
    updateClueNum(event.target.value);
  };
  const handleSubmit = (event) => {
    submitClue(uiClueWord, uiClueNum);
  };
  return (
    <div className="controls">
      {phase === 'guessing' || phase === 'themGuessing' && (
        <span>Clue: {clueWord} - {clueNum}</span>
      )}
      {phase === 'clueing' && (
        <span>Clue: <input type="text" value={uiClueWord} onChange={handleClueWordChange} /> - <input type="number" value={uiClueNum} onChange={handleClueNumberChange} /><button onClick={handleSubmit} disabled={uiClueNum < 0 || !uiClueWord}>Submit</button></span>
      )}
      {phase === 'themClueing' && (
        "They are thinking of a clue"
      )}
    </div>
  );
}

export default connect(selector, dispatcher)(Controls);