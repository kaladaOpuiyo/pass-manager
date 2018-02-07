import React from 'react';
import {Link} from 'react-router-dom';
import {Modal, Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Header = (props) => {

  return (
    <div>
      <Navbar collapseOnSelect fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">My Password Storage</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {
            props.isLoggedIn ?
              <Nav pullRight>
                <LinkContainer to="/home">
                  <NavItem>Home</NavItem>
                </LinkContainer>
                <NavItem onClick={props.onLogout}>
                            Logout
                        </NavItem>
              </Nav> :
              <Nav pullRight>
                <LinkContainer to="/register">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </Nav>
                    }
          <Modal show={props.showModal} onHide={props.closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Notifications</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                props.hasNotifications ?
                  <p>This notification was triggered by a Lambda function</p> :
                  <p>There is no new notification</p>
              }
            </Modal.Body>
          </Modal>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );

};

export default Header;
