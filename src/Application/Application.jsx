import React from 'react';
import {connect} from 'react-redux';

import { Route } from 'react-router';
import { MemoryRouter } from 'react-router-dom';

import Page from '../components/Page';
import Homepage from '../components/Homepage';
import Preferences from '../components/Preferences';

import firebase from '../firebase';
import dispatcher from '../firebase/dispatcher';

const selector = (state) => {
  return {};
}

class Application extends React.Component {

  componentDidMount() {
    this.props.monitorConnection();
    this.props.syncData('cards');
    this.props.syncData('game');
  }

  render() {
    return (
      <MemoryRouter>
        <Page>
          <Route path="/" exact component={Homepage} />
          <Route path="/preferences/" exact component={Preferences} />
        </Page>
      </MemoryRouter>
    );
  }
}

export default connect(selector, dispatcher)(Application);