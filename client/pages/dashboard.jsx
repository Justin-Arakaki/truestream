import React from 'react';
import Redirect from '../components/redirect';
import Subscriptions from '../components/subscriptions';
import AppContext from '../lib/app-context';
// Import MUI
import {
  Grid,
  Container
} from '@mui/material';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pageName: '' };
  }

  renderContent() {
    const page = this.state.pageName;
    switch (page) {
      case 'subscriptions':
        return <Subscriptions />;
      default:
        return <Subscriptions />;
    }
  }

  render() {
    const { user } = this.context;

    if (!user) return <Redirect to="login" />;

    return (
      <Container maxWidth="sm">
        <Grid container mt={2} spacing={1}>
          {this.renderContent()}
        </Grid>
      </Container>
    );
  }
}
Dashboard.contextType = AppContext;
