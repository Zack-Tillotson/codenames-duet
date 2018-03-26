import React from 'react';

import {connect} from 'react-redux';

import './styles';
import selector from './selector';
import dispatcher from 'firebase/dispatcher';

const LoginForm = function({authProvider, isLoggedIn, requestLogin, requestLogout, isHiddenOnAuth = false}) {

  const services = ['google', 'facebook', 'twitter', 'anonymous'];
  return (
    <div>
      {!isHiddenOnAuth || !isLoggedIn && (
        <div className="loginSection">
          {services.map(service => {
            const activeClass = authProvider == service ? 'active' : '';
            return (
              <div
                key={service}
                className={["loginOption", service, activeClass].join(' ')}
                onClick={requestLogin.bind(this, service)}>
                {service}
              </div>
            );
          })}
        </div>
      )}

      {isLoggedIn && (
        <div className="logoutSection" onClick={requestLogout}>
          Logout
        </div>
      )}
    </div>
  );
}

export default connect(selector, dispatcher)(LoginForm);