import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default class Banner extends React.Component {
  render() {
    // idk why pt doesn't work here
    return (
      <Box
        item bgcolor="primary.main"
        justifyContent="center"
        py='6rem'
        px='1rem'
        mb='1rem'
      >
        <Typography variant="h1" component="h1" textAlign="center">
          StreamSaver
        </Typography>
        <Typography variant="h2" component="h2" textAlign="center" mt={2}>
          Like Truebill. Definitely worse.
        </Typography>
        <Typography variant="h3" component="h3" textAlign="center" mt={2}>
          Track your streaming subscriptions. Only subscribe to what you are using. Save more than you expect!
        </Typography>
      </Box>
    );
  }
}
