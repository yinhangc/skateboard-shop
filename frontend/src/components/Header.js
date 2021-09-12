import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { logout } from '../actions/userActions';
import { FaShoppingCart } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { BsPersonFill } from 'react-icons/bs';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);

  const onLogoutClicked = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Emi skateboard</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link active={false}>
                  <FaShoppingCart style={{ margin: '0 .3rem .2rem 0' }} />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {userDetails ? (
                <NavDropdown title={userDetails.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <BsPersonFill style={{ margin: '0 0 .2rem 0' }} /> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={onLogoutClicked}>
                    <FiLogOut style={{ margin: '0 0 .2rem 0.05rem' }} /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link active={false}>
                    <FiLogIn style={{ margin: '0 .1rem .2rem 0' }} /> Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
