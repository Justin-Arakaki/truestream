import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', my: '1rem' }}>
        <CircularProgress />
      </Container>
    );
  }
}
