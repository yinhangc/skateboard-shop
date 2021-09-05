import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userDetails) {
      history.push(redirect);
    }
  }, [history, userDetails, redirect]);

  const onLoginClick = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 className="my-3">Sign In</h1>
      {error && <Message variant="danger" message={error} />}
      {loading ? (
        <Loader />
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
            />
          </Form.Group>

          <Row className="align-items-center">
            <Col>
              <Button
                variant="primary"
                type="submit"
                className="mt-1"
                onClick={onLoginClick}
              >
                Login
              </Button>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Link to={'/register'}>New User?</Link>
            </Col>
          </Row>
        </Form>
      )}
    </FormContainer>
  );
};

export default LoginScreen;
