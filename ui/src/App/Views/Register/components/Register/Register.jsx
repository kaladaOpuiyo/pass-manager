import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Modal,
  Well
} from 'react-bootstrap';

const Register = (props) => {
  return (
    <Modal.Dialog>
      <Modal.Header closeButton={true}>

        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="Register">
          <Well>
            <form onSubmit={props.handleSubmit}>
              <FormGroup controlId="name" bsSize="large">
                <ControlLabel>Name</ControlLabel>
                <FormControl

                type="text"
                name="name"
                value={props.name}
                onChange={props.handleChange}

              />
              </FormGroup>
              <FormGroup controlId="username" bsSize="large">
                <ControlLabel>Username</ControlLabel>
                <FormControl
                autoFocus
                type="text"
                name="username"
                value={props.username}
                onChange={props.handleChange}

              />
              </FormGroup>
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                autoFocus
                type="email"
                name="email"
                value={props.email}
                onChange={props.handleChange}
              />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                autoFocus
                type="password"
                name="password"
                value={props.password}
                onChange={props.handleChange}
              />

              </FormGroup>

              <FormGroup controlId="confirmPassword" bsSize="large">
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                autoFocus
                type="password"
                name="confirmPassword"
                value={props.confirmPassword}
                onChange={props.handleChange}
              />

              </FormGroup>

              <FormGroup controlId="phone" bsSize="large">
                <ControlLabel>Phone</ControlLabel>
                <FormControl
                autoFocus
                type="phone"
                name="phone"
                value={props.phone}
                onChange={props.handleChange}
              />
              </FormGroup>

              <div>
                <LinkContainer to="/">
                  <Button bsStyle="primary"> Close</Button>
                </LinkContainer>

                <Button type="submit" bsStyle="info"
              disabled={!props.validateForm() || props.isLoadingSignup}>
                  {
                !props.isLoadingSignup ?
                  'Register' :
                  'Registering...'
              }
                </Button>
              </div>
            </form>
          </Well>
        </div>
      </Modal.Body>
      <Modal.Footer />
    </Modal.Dialog>
  );

};

export default Register;
