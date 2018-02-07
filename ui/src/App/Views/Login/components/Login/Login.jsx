import React from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Modal,
  Well
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Login = (props) => {

  return (

    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="Login">
          <Well>
            <form onSubmit={props.handleSubmit}>

              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                autoFocus
                type="email"
                onChange={props.handleChange}
                value={props.email}
              />
              </FormGroup>

              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                autoFocus
                type="password"
                onChange={props.handleChange}
                value={props.password}
              />
              </FormGroup>

              <LinkContainer to="/">
                <Button bsStyle="primary">Close</Button>
              </LinkContainer>

              {
                <Button type="submit" className="btn btn-primary" disabled={!props.validateForm() || props.isLoadingSignin }>
                  {
              !props.isLoadingSignin ?
                'Login' :
                'Signing in...'
             }
                </Button>
              }

            </form>
          </Well>
        </div>
      </Modal.Body>
      <Modal.Footer />

    </Modal.Dialog>
  );
};

export default Login;
