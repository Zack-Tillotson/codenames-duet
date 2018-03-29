import React from 'react';
import {connect} from 'react-redux';
import selector from 'state/game/selector';
import dispatcher from 'state/game/dispatcher';

import Cards from './Cards';
import History from './History';
import Controls from './Controls';

import './styles';

const Game = function({children}) {
  return (
    <div className="game">
      <Cards />
      <History />
      <Controls />
    </div>
  );
}

export default connect(selector, dispatcher)(Game);