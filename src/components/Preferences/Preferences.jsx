import React from 'react';
import {connect} from 'react-redux';

import LoginForm from '../LoginForm';

import dispatcher from '../../state/gameSetup/dispatcher';

import './styles';

function Preferences({createGame}) {
  return (
    <div>
      <button onClick={createGame}>Reset Game</button>
      <br />
      <LoginForm isHiddenOnAuth />
    </div>
  );
}

export default connect(undefined, dispatcher)(Preferences);