import React from 'react';
import {connect} from 'react-redux';
import selector from 'state/gameSetup/selector';
import dispatcher from 'state/gameSetup/dispatcher';

import './styles';

const GameSetup = function({children, stats, createGame, joinGame, startGame}) {
  return (
    <div>
      <button onClick={createGame}>Reset Game</button>
      <hr />
      {stats.players} Players Have Joined
      {!stats.haveJoined && (
        <button onClick={joinGame}>Join Game</button>
      )}
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default connect(selector, dispatcher)(GameSetup);