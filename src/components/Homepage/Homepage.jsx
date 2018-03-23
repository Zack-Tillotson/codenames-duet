import React from 'react';

import {Link} from 'react-router-dom';
import Preferences from '../Preferences';

import './styles';

const Homepage = function({children}) {
  return (
    <div>
      <h1>Codenames Duet</h1>
      <Link to="/preferences/">Preferences</Link>
      {children}
    </div>
  );
}

export default Homepage;