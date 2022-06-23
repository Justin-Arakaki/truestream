import React from 'react';
import { Typography, Container, Paper, Box, Button, Tab, Tabs, TextField } from '@mui/material';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      action: 'sign-in',
      button: 'Sign In',
      status: null
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSwitch(event, newValue) {
    let buttonText = 'Sign In';
    if (this.state.button === 'Sign In') {
      buttonText = 'Create';
    }
    this.setState({ action: newValue, button: buttonText });
  }

  handleChange(event, newValue) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    const { action } = this.state;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    fetch(`/api/auth/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          console.error(result);
          this.setState({ status: result.error });
          return;
        } else if (action === 'sign-up') {
          location.reload();
        } else if (result.token) {
          this.props.onSignIn(result);
        }
        this.setState({ status: null });
      });
  }

  render() {
    const { status } = this.state;
    let statusMsg = null;
    if (status) {
      statusMsg =
      <Typography variant="body1" component="p" color="error.main">
        {status}
      </Typography>;
    }
    return (
      <Container maxWidth="md">
        <Paper>
          <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mx: 5 }}>
            <Tabs
              onChange={this.handleSwitch}
              value={this.state.action}
              variant="fullWidth"
              aria-label="login mode"
              indicatorColor="primary"
              sx={{ pt: 3 }}
            >
              <Tab value="sign-in" label="Sign In" />
              <Tab value="sign-up" label="Sign Up" />
            </Tabs>
            <TextField
              onChange={this.handleChange}
              margin="normal"
              required
              fullWidth
              variant="standard"
              color="secondary"
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              onChange={this.handleChange}
              margin="normal"
              required
              fullWidth
              variant="standard"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {statusMsg}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 5, mb: 3 }}>
              {this.state.button}
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }
}