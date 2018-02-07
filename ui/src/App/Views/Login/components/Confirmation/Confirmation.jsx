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

const Comfirmation = (props) => {

  return (
    <Modal
    show={props.show}
    >
      <Modal.Header>
        <Modal.Title>Confirm Registration</Modal.Title>
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

              <Button bsStyle="primary" onClick={(e) => {
                props.handleConfirmationClose(e);
              }}> Close</Button>

              <Button bsStyle="info" onClick={(e) => {
                props.handleCodeRequest(e);
              }}> Resend Code</Button>

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
    </Modal>
  );

};

export default Comfirmation;
