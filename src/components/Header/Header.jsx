import React from 'react';
import styles from './styles';

import {Link} from 'react-router-dom';

export default function Header({preferencesOpen}) {
  return (
    <header>
      <Link to="/">
        <h1>
          <div className="imageContainer">
            <img src="/assets/logo.png" alt="Codenames Duet" />
          </div>
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