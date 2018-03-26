import React from 'react';
import {connect} from 'react-redux';
import selector from 'state/gameSetup/selector';
import dispatcher from 'state/gameSetup/dispatcher';

import {Link} from 'react-router-dom';
import Preferences from '../Preferences';
import LoginForm from '../LoginForm';

import './styles';

const Homepage = function({children, createGame, joinGame, startGame}) {
  return (
    <div>
      <h1>Codenames Duet</h1>
      <LoginForm isHiddenOnAuth />
      <button onClick={createGame}>New Game</button>
      <button onClick={joinGame}>Join Game</button>
      <hr />
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default connect(selector, dispatcher)(Homepage);