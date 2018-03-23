import React from 'react';

import LoginForm from '../LoginForm';
import FirebaseStatus from '../FirebaseStatus';

import './styles';

function Preferences() {
  return (
    <div>
      <LoginForm />
      <FirebaseStatus />
    </div>
  );
}

export default Preferences;