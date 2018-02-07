
import React from 'react';

import LoginComponent from './components/Login/Login';
import ConfirmComponent from './components/Confirmation/Confirmation';
class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmationCode: '',
      show: true

    };

  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleConfirmationClose = (e) => {
    e.preventDefault();
    this.props.confirmed(this.props.history);

  }

  handleCodeRequest = (e) => {
    e.preventDefault();
    this.props.sendCode(this.state.email, this.props.history);

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSignin(event, this.state.email, this.state.password, this.props.history);
  }

  validateForm = () => {
    return this.state.email.length && this.state.password.length;
  }

  validateConfirmationForm = () => {
    return this.state.confirmationCode.length;
  }

  handleConfirmationSubmit = (e) => {
    e.preventDefault();
    this.props.onConfirmlogin(this.state.email, this.state.confirmationCode, this.props.history);
  }

  render() {

    return (

      <div className="">

        {(this.props.unconfirmed !== true || this.state.show === false) ?
          <LoginComponent
          validateForm={this.validateForm}
          handleChange={this.handleChange}
          isLoadingSignin={this.isLoadingSignin}
          email={this.state.email}
          password={this.state.password}
          handleSubmit={this.handleSubmit}
          /> :
          <ConfirmComponent
          isLoadingSignup={this.state.isLoadingSignup}
          validateConfirmationForm={this.validateConfirmationForm}
          handleConfirmationClose={this.handleConfirmationClose}
          handleCodeRequest={this.handleCodeRequest}
          show={this.state.show}
          handleConfirmationSubmit={this.handleConfirmationSubmit}
          confirmationCode={this.confirmationCode}
          handleChange={this.handleChange}
          />
      }

      </div>

    );
  }
}
export default Login;

