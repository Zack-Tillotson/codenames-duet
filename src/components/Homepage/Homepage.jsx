import React from 'react';
import {connect} from 'react-redux';
import selector from 'state/game/selector';

import GameSetup from '../GameSetup';
import Game from '../Game';

import './styles';

const Homepage = function({children, gameState}) {
  return (
    <div>
      {gameState === 'preGame' && <GameSetup />}
      {gameState !== 'preGame' && <Game />}
    </div>
  );
}

export default connect(selector)(Homepage);