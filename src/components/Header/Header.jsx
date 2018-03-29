import React from 'react';
import styles from './styles';

import {Link} from 'react-router-dom';

export default function Header({preferencesOpen}) {
  return (
    <header>
      <Link to="/">
        <h1>
          Codenames Duet
        </h1>
      </Link>
      {preferencesOpen && (
        <Link to="/">
          <div className="prefLink">
            ⓧ
          </div>
        </Link>
      )}
      {!preferencesOpen && (
        <Link to="/preferences/">
          <div className="prefLink">
            ☰
          </div>
        </Link>
      )}
    </header>
  );
}