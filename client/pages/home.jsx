import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  render() {
    console.log('INSIDE HOME');

    if (!this.context.user) return <Redirect to="login" />;

    return (
      <Redirect to="subscriptions" />
    );
  }
}
Home.contextType = AppContext;
