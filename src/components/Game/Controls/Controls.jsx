import React from 'react';
import {connect} from 'react-redux';
import selector from 'state/game/selector';
import dispatcher from 'state/game/dispatcher';

import './styles';

const Controls = function({children, ui: {clueWord: uiClueWord, clueNum: uiClueNum}, controls: {phase, clueWord, clueNum}, updateClueWord, updateClueNum, submitClue, passGuessing, startNewGame}) {
  const handleClueWordChange = (event) => {
    updateClueWord(event.target.value);
  };
  const handleClueNumberChange = (event) => {
    updateClueNum(event.target.value);
  };
  const handleSubmit = (event) => {
    submitClue(uiClueWord, uiClueNum);
  };
  const handlePass = (event) => {
    passGuessing();
  };
  const handleNewGame = (event) => {
    startNewGame();
  };
  return (
    <div className="controls">
      {phase === 'guessing' && (
        <span>Guess, their clue: {clueWord} - {clueNum}. <button onClick={handlePass}>Pass</button></span>
      )}
      {phase === 'themGuessing' && (
        <span>They are guessing, your clue: {clueWord} - {clueNum}</span>
      )}
      {phase === 'clueing' && (
        <span>Give a clue: <br /><input type="text" value={uiClueWord} onChange={handleClueWordChange} placeholder="Your clue here" /> - <input type="number" value={uiClueNum} onChange={handleClueNumberChange} /><button onClick={handleSubmit} disabled={uiClueNum < 0 || !uiClueWord}>Submit</button></span>
      )}
      {phase === 'themClueing' && (
        "They are thinking of a clue"
      )}
      {phase === 'gameOver' && (
        <span>Game Over! <button onClick={handleNewGame}>New Game</button></span>
      )}
    </div>
  );
}

export default connect(selector, dispatcher)(Controls);