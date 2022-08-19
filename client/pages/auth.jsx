import React from 'react';
import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import Banner from '../components/banner';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {
    const { user, handleSignIn } = this.context;

    if (user) return <Redirect to="dashboard" />;

    return (
      <>
        <Banner />
        <AuthForm onSignIn={handleSignIn} />
      </>
    );
  }
}
AuthPage.contextType = AppContext;
