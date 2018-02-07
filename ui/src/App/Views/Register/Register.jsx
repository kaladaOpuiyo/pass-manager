import React from 'react';
import ConfirmComponent from './components/Confirmation/Confirmation';
import RegisterComponent from './components/Register/Register';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      username: '',
      phone: '',
      confirmPassword: '',
      confirmationCode: '',
      show: true
    };

  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSignup(this.state.email, this.state.password, this.state.name,
      this.state.username, this.state.phone);
  }

  handleConfirmationSubmit = (e) => {
    e.preventDefault();
    this.props.onConfirmSignup(this.state.confirmationCode, this.props.history);
  }

  validateForm = () => {

    return this.state.email.length &&
    this.state.confirmPassword.localeCompare(this.state.password) === 0 &&
    this.state.phone.length && this.state.name.length;
    // return true;
  }

  validateConfirmationForm = () => {
    return this.state.confirmationCode.length > 0;
  }

  render() {

    return (

      <div className="signup">

        {
          this.props.newUser === null ?
            <RegisterComponent
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            validateForm={this.validateForm}
            isLoadingSignup={this.state.isLoadingSignup}
            phone={this.state.phone}
            confirmPassword={this.state.confirmPassword}
            password={this.state.password}
            email={this.state.email}
            username={this.state.username}
            name={this.state.name}
            /> :
            <ConfirmComponent
            isLoadingSignup={this.state.isLoadingSignup}
            validateConfirmationForm={this.validateConfirmationForm}
            handleConfirmationClose={this.handleConfirmationClose}
            handleCodeRequest={this.handleCodeRequest}
            show={this.state.show}
            handleConfirmationSubmit={this.handleConfirmationSubmit}
            handleChange={this.handleChange}
            />
        }
      </div>
    );
  }
}

export default Register;

