import React from 'react';
import { Typography, Box } from '@mui/material';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pageName: '' };
  }

  render() {
    return (
      <Box
        item bgcolor="primary.main"
        justifyContent="center"
        py='3rem'
        px='1rem'
        mb='1rem'
      >
        <Typography variant="h2" component="h1" textAlign="center">
          StreamSaver
        </Typography>
        <Typography variant="h5" component="h3" textAlign="center" mt={5}>
          It&apos;s like Truebill but worse!
        </Typography>
        <Typography variant="subtitle1" component="h4" textAlign="center">
          Track your streaming subscriptions. Only subscribe to what you are using. Save more than you expect!
        </Typography>
      </Box>
    );
  }
}
