import React from 'react';
import {connect} from 'react-redux';

import './styles';
import selector from './selector.js';

const FirebaseStatus = function(props) {
  return (
    <table className="firebase-status">
      <tbody>
        <tr>
          <td>Connection</td>
          <td>{props.connected ? 'Online' : 'Offline'}</td>
        </tr>
        <tr>
          <td>Lag</td>
          <td>{props.serverTimeOffset}</td>
        </tr>
        <tr>
          <td>Authentication</td>
          <td>{props.isLoggedIn ? 'Authenticated' : 'Unauthenticated'}</td>
        </tr>
        <tr>
          <td>Authentication Provider</td>
          <td>{props.authProvider}</td>
        </tr>
        <tr>
          <td>Data</td>
          <td>{props.data}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default connect(selector)(FirebaseStatus);