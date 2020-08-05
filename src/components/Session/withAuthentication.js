import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import SignIn from '../SignIn';
import './index.scss';

const LoadingMessage = () => (
  <div className="splash-screen vh-100">
    Loading you up
    <i className="fas fa-2x fa-shopping-basket loading text-primary"></i>
  </div>
);

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        loading: true,
      };
      this.loadingBuffer = null;
      this.handleLogin = this.handleLogin.bind(this);
      this.handleForgottenPassword = this.handleForgottenPassword.bind(this);
      this.handleCreateAccount = this.handleCreateAccount.bind(this);
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged((authUser) => {
        authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
        this.loadingBuffer = setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1500);
      });
    }

    componentWillUnmount() {
      this.listener();
      this.loadingBuffer = null;
    }

    handleLogin() {
      this.setState({
        loading: true,
      });
    }

    handleForgottenPassword() {
      this.setState({
        loading: true,
      });
    }

    handleCreateAccount() {
      this.setState({
        loading: true,
      });
    }

    render() {
      if (this.state.loading) {
        return LoadingMessage();
      }

      if (this.state.authUser) {
        return (
          <AuthUserContext.Provider value={this.state.authUser}>
            <Component {...this.props} />
          </AuthUserContext.Provider>
        );
      }

      return <SignIn handles={{
        login: this.handleLogin,
        forgottenPassword: this.handleForgottenPassword,
        createAccount: this.handleCreateAccount,
      }} />;
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
