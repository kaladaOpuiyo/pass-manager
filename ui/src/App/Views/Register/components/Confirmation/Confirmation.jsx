import React from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Modal,
  Well,
  HelpBlock
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Comfirmation = (props) => {

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="Confirm">
          <Well><form onSubmit={props.handleConfirmationSubmit}>
            <FormGroup controlId="confirmationCode" role="form">
              <ControlLabel>Confirmation Code</ControlLabel>
              <FormControl autoFocus type="text" value={props.confirmationCode} onChange={props.handleChange} />
              <HelpBlock>Please check your e-mail for the code.</HelpBlock>
            </FormGroup>
            <div className="text-center">
              <LinkContainer to="/">
                <Button bsStyle="primary"> Close</Button>
              </LinkContainer>

              <Button type="submit" className="btn btn-primary" disabled={!props.validateConfirmationForm() || props.isLoadingSignup}>
                {
                  !props.isLoadingSignup ?
                    'Verify' :
                    'Verifying...'
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

export default Comfirmation;
