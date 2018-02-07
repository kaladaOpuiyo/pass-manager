import React from 'react';
import {Modal} from 'react-bootstrap';

const Message = (props) => {

  const titleStyle = props.messageTitle === 'ERROR' ?
  'alert alert-danger' : props.messageTitle === 'SUCCESS' ?
  'alert alert-success' :
  'alert alert-info';

  return (
    <Modal
      show={props.messageShow}
      onHide={props.close}
      container={this}
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header className={titleStyle} closeButton>
        <Modal.Title id="contained-modal-title">{props.messageTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.message}
      </Modal.Body>
    </Modal>
  );

};

export default Message;
