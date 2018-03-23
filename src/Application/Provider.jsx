import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';
import store from './state/store';

import Application from './Application';

export default function Provider() {
  return (
    <ReduxProvider store={store()}>
      <Application />
    </ReduxProvider>
  );
}
