import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Header from './Views/Header/Header';
import Footer from './Views/Footer/Footer';
import Home from './Views/Home/Home';
import LandingPage from './Views/LandingPage/LandingPage';
import Login from './Views/Login/Login';
import Register from './Views/Register/Register';
import Error from '../lib/ErrorPage';
import NoMatch from '../lib/NoMatchPage';
import Services from '../lib/Services';
import DbRequest from '../lib/dbRequest';
import Message from '../lib/Message';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      credentials: [],
      ready: false,
      showModal: false,
      isLoadingSignup: false,
      isLoadingSignin: false,
      newUser: null,
      userToken: null,
      unconfirmed: null,
      target: null,
      data: null

    };
  }
  componentDidMount() {
    this.handleUserToken();

  }

  handleUserToken = () => {
    Services.getUserToken()
    .then((userToken) => this.setState({userToken, ready: true}))
    .catch((err) => this.setState({message: err.message, messageShow: true, messageTitle: 'ERROR'}));

  }

  handleSignup = (email, password, name, username, phone) => {

    this.setState({isLoadingSignup: true});

    Services.signup(email, password, name, username, phone)
    .then((res) => {
      this.setState({isLoadingSignup: false});
      this.setState({newUser: res.user});
    })
    .catch((err) => {
      this.setState({isLoadingSignup: false});
      this.setState({message: err.message, messageShow: true, messageTitle: 'ERROR'});
    });
  }

  handleLogin = (event, email, password, history) => {

    this.setState({isLoadingSignin: true});

    Services.login(email, password)
    .then(res => {
      this.setState({isLoadingSignin: false, userToken: res});
      history.push('/home');
    })
    .catch(err => {
      this.setState({isLoadingSignin: false});

      if (err.message === 'User is not confirmed.') {
        this.setState({unconfirmed: true});
      } else {
        this.setState({message: err.message, messageShow: true, messageTitle: 'ERROR'});
      }

    });
  }

  handleLogout = (history) => {
    Services.logout();
    this.setState({userToken: null, data: null});
  }

  handleConfirmSignup = (confirmationCode, history) => {

    Services.confirmSignup(this.state.newUser, confirmationCode)
        .then(() => {
          this.setState({isLoadingSignup: false});
          this.handleUserToken();
          history.push('/');
        })
        .catch((err) => this.setState({isLoadingSignup: false, message: err.message, messageShow: true, messageTitle: 'ERROR'}));
  }

  handleConfirmLogin = (email, confirmationCode, history) => {

    Services.confirmSignupOnLogin(email, confirmationCode)
    .then(() => {
      this.handleUserToken();
      this.setState({unconfirmed: false});
      history.push('/login');

    })
    .catch((err) => this.setState({message: err.message, messageShow: true, messageTitle: 'ERROR'}));
  }

  handleConfirmed = (history) => {
    this.setState({unconfirmed: true});
    history.push('/');
  }

  handleCodeRequest = (email, history) => {

    Services.resendConfirmationCode(email, (err, res) => {
      if (err) {
        this.setState({message: err.message, messageShow: true, messageTitle: 'ERROR'});
      } else {
        this.setState({message: `email sent to ${res.CodeDeliveryDetails.Destination}`, messageShow: true, messageTitle: 'SUCCESS'});
      }
    });
  }
  handleMessageClose = () => this.setState({messageShow: false});

  handleNewUser = (email) => {

    const data = {
      username: email
    };

    DbRequest.dbReq(data, this.state.userToken, 'POST')
    .then((resp) => this.setState({ready: true, user: resp}))
    .catch((err) => this.setState({message: err.message, messageShow: true, messageTitle: 'ERROR'}));
  }

  handleOnAddRow = (row) => {
    const user = {
      _id: this.state._id,
      credentials: [{
        name: row.name !== '' || null ? row.name : '',
        username: row.username,
        password: row.password
      }]
    };

    DbRequest.dbReq(user, this.state.userToken, 'PUT')
    .then(() => this.handleGetData())
    .catch((err) => this.setState({message: err.message, messageShow: true, messageTitle: 'ERROR'}));
  }

  handleOnDeleteRow = (row) => {
    const user = {
      _id: this.state._id,
      name: row[0]
    };

    DbRequest.dbReq(user, this.state.userToken, 'DELETE')
    .then((resp) => this.handleGetData())
    .catch((err) => this.setState({message: err.message, messageShow: true, messageTitle: 'ERROR'}));
  }

  handleGetData = () => {
    const base64Url = this.state.userToken.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const username = JSON.parse(window.atob(base64)).email;

    DbRequest.dbReq(username, this.state.userToken, 'GET')
    .then((user) => {
      if (!user.credentials || user.credentials === null) {
        this.handleNewUser(username);
      } else {
        this.setState({ready: true, data: user.credentials, _id: user._id});
      }

    })
    .catch((err) => this.setState({message: err.message, messageShow: true, messageTitle: 'ERROR'}));
  }

  render() {

    return (

      <Router>
        <div className="container">

          <div className="col-md-12">

            <Header isLoggedIn={Boolean(this.state.userToken)}
                onLogout={this.handleLogout}
                hasNotifications={this.state.hasNotifications}
                onReadNotification={this.handleReadNotification}
                onEnter={this.requireAuth}
                closeModal={this.handleCloseModal}
                openModal={this.handleOpenModal}/>
          </div>
          <div className="col-md-12">

            <Message
            close={this.handleMessageClose}
            messageShow={this.state.messageShow}
            message={this.state.message}
            messageTitle={this.state.messageTitle}
            />

            {
             this.state.ready ?

               <Switch >
                 <Route path="/" exact render={
                () => <LandingPage/> }/>

                 <Route exact path="/home" render={() =>
                  this.state.userToken ?
                    <Home
                     userToken={this.state.userToken}
                     onDelete={this.handleOnDeleteRow}
                     onAdd={this.handleOnAddRow}
                     getData={this.handleGetData}
                     data={this.state.data}
                   /> :
                    <Redirect to="/"/>
                }/>

                 <Route path="/register" exact render={
                (props) => <Register
                            {...props}
                isLoadingSignup={this.state.isLoadingSignup}
                newUser={this.state.newUser}
                onSignup={this.handleSignup}
                onConfirmSignup={this.handleConfirmSignup}
                confirmation={this.confirmationHandler}
                message={this.state.message}
                close={this.handleMessageClose}
                messageShow={this.state.messageShow}
                messageTitle={this.state.messageTitle}

                /> }/>

                 <Route path="/login" exact render={
                (props) => <Login
                           {...props}
                isLoadingSignin={this.state.isLoadingSignin}
                onSignin={this.handleLogin}
                unconfirmed={this.state.unconfirmed}
                onConfirmlogin={this.handleConfirmLogin}
                confirmed={this.handleConfirmed}
                sendCode={this.handleCodeRequest}
                message={this.state.message}
                close={this.handleMessageClose}
                messageShow={this.state.messageShow}
                messageTitle={this.state.messageTitle}
                />
               }/>

                 <Route path="/error" component={Error}/>
                 <Route component={NoMatch}/>

               </Switch> :
               <div>
                 <span className="glyphicon glyphicon-refresh spin" />
               </div>
        }
          </div>
          <div className="col-md-12">

            <Footer/>
          </div>
        </div>
      </Router>

    );

  }

}
export default App;
