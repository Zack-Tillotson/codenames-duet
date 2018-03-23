import React from 'react';
import {connect} from 'react-redux';

import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

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
    this.props.syncData('/');
  }

  render() {
    return (
      <BrowserRouter>
        <Page>
          <Route path="" exact component={Homepage} />
          <Route path="/preferences/" exact component={Preferences} />
        </Page>
      </BrowserRouter>
    );
  }
}

export default connect(selector, dispatcher)(Application);