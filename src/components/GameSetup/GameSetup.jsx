import React from 'react';
import {connect} from 'react-redux';
import selector from 'state/gameSetup/selector';
import dispatcher from 'state/gameSetup/dispatcher';

import './styles';

const GameSetup = function({children, createGame, joinGame, startGame}) {
  return (
    <div>
      <button onClick={createGame}>New Game</button>
      <button onClick={joinGame}>Join Game</button>
      <hr />
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default connect(selector, dispatcher)(GameSetup);