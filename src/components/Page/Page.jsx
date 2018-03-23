import React, {Fragment} from 'react';
import { withRouter } from 'react-router';

import './styles';

import Header from '../Header';
import Body from '../Body';
import Footer from '../Footer';

class Page extends React.Component {

  isPreferencesOpen() {
    return this.props.location.pathname == '/preferences/';
  }

  render() {
    return (
      <Fragment>
        <Header preferencesOpen={this.isPreferencesOpen()}/>
        <Body>
          {this.props.children}
        </Body>
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(Page);