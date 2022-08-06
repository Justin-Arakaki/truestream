import React from 'react';
import Redirect from './redirect';
import SubsItem from './subs-item';
import AppContext from '../lib/app-context';
import LoadingScreen from './loading-screen';
// Import MUI
import Stack from '@mui/material/Stack';

export default class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptions: null,
      loading: true
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
        this.setState({ subscriptions: result, loading: false });
        console.log('state', this.state);
      });
  }

  render() {
    const { user } = this.context;
    const { subscriptions, loading } = this.state;
    if (loading) {
      return <LoadingScreen />;
    }
    const subsList = subscriptions.map(x =>
      <SubsItem key={x.subsId} subsInfo={x} />
    );
    if (!user) return <Redirect to="login" />;

    return (
      <Stack spacing={1} sx={{ width: '100%' }}>
        {subsList}
      </Stack>
    );
  }
}
Subscriptions.contextType = AppContext;
