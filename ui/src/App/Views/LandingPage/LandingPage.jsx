
import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Button} from 'react-bootstrap';

const wellStyles = {maxWidth: 240, width: 300, margin: 'auto', padding: 10};
const center = {'padding': '250px '};

const LandingPage = () => {

  return (
    <div style={center}>

      <div className="well" style={wellStyles}>
        <LinkContainer to= "/register">
          <Button bsStyle="primary" bsSize="large" block >Register</Button>
        </LinkContainer>

        <LinkContainer to="/login">
          <Button bsStyle="default" bsSize="large" block >Login</Button>
        </LinkContainer>
      </div>

    </div>
  );
};

export default LandingPage;

