import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import Header from '../components/header';
import { Grid } from '@mui/material';

export default class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: null
    };
  }

  componentDidMount() {
    const { token } = this.context;
    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    };

    fetch('/api/subscriptions', req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          console.error(result);
          this.setState({ status: result.error });
        }
        this.setState({ subscriptions: result });
        console.log('state', this.state);
      });
  }

  render() {
    console.log('INSIDE SUBS');

    const { user } = this.context;

    if (!user) return <Redirect to="login" />;

    return (
      <>
        <Header />
      </>
    );
  }
}
Subscriptions.contextType = AppContext;
