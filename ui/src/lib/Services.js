import AWS from 'aws-sdk';
import config from './config';

import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool
} from 'amazon-cognito-identity-js';

const userPool = new CognitoUserPool({
  UserPoolId: config.cognito.USER_POOL_ID,
  ClientId: config.cognito.APP_CLIENT_ID
});

class Services {

  static signup(email, password, name, username, phone) {

    const attributeList = [];

    const attributeEmail =
      new CognitoUserAttribute({
        Name: 'email',
        Value: email
      });

    const attributeName =
      new CognitoUserAttribute({
        Name: 'name',
        Value: name
      });

    const attributeUsername =
      new CognitoUserAttribute({
        Name: 'preferred_username',
        Value: username
      });

    const attributePhone =
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: `+1${phone}`
      });

    attributeList.push(...[attributeEmail, attributeName, attributeUsername, attributePhone]);

    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributeList, null, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  static resendConfirmationCode(username) {

    const user = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      user.resendConfirmationCode((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  static confirmSignupOnLogin(username, confirmationCode) {

    const user = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
      user.confirmRegistration(confirmationCode, true, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  static confirmSignup(data, confirmationCode) {

    return new Promise((resolve, reject) => {
      data.confirmRegistration(confirmationCode, true, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  static login(username, password) {

    const user = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    const authenticationData = {
      Username: username,
      Password: password
    };

    const authDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => (
            user.authenticateUser(authDetails, {
              onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
              onFailure: (err) => reject(err)

            })
        ));
  }

  static getUserToken() {

    const currentUser = userPool.getCurrentUser();

    return new Promise((resolve, reject) => {

      if (!currentUser) {
        resolve(currentUser);
      }
      currentUser.getSession((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.getIdToken().getJwtToken());
      });

    });

  }

  static logout() {
    const currentUser = userPool.getCurrentUser();

    if (currentUser !== null) {
      currentUser.signOut();
    }
    if (AWS.config.credentials) {
      AWS.config.credentials.clearCachedId();
    }
  }
}

export default Services;
