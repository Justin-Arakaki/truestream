import React from 'react';
// Import Library
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import AppContext from './lib/app-context';
// Import Pages
import Auth from './pages/auth';
import Dashboard from './pages/dashboard';
import NotFound from './pages/not-found';
// Import MUI
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import dgreenTheme from './components/dgreen-theme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
    const token = window.localStorage.getItem('your-token');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, token, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('your-token', token);
    this.setState({ user, token });
  }

  handleSignOut() {
    window.localStorage.removeItem('your-token');
    this.setState({ user: null, token: null });
  }

  renderPage() {
    if (this.state.isAuthorizing) return null;
    const { path } = this.state.route;
    switch (path) {
      case 'login':
        return <Auth />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  }

  render() {
    const { user, token, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, token, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <ThemeProvider theme={dgreenTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssBaseline enableColorScheme />
            {this.renderPage()}
          </LocalizationProvider>
        </ThemeProvider>
      </AppContext.Provider>
    );
  }
}
