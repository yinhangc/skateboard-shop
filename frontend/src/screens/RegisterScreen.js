import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { register } from '../actions/userActions';
import { USER_REGISTER_RESET } from '../constants/userConstant';

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state) => state.userRegister
  );
  const userDetails = useSelector((state) => state.userDetails);
  const redirect = location.search ? location.search.split('=')[1] : '/';

  // Redirect user after register successfully
  useEffect(() => {
    if (userDetails) {
      setTimeout(() => {
        history.push(redirect);
        dispatch({ type: USER_REGISTER_RESET });
      }, 3000);
    }
  }, [history, redirect, dispatch, userDetails]);

  const onPasswordChange = (pw) => {
    setPassword(pw);
    if (alert) setAlert(null);
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Password doesn't match");
      setPassword('');
      setConfirmPassword('');
      return;
    }
    dispatch(register(name, email, password));
  };

  return (
    <FormContainer>
      <h1 className="my-3">Register Now!</h1>
      {alert && <Message message={alert} />}
      {error && <Message message={error} />}
      {loading ? (
        <Loader />
      ) : success ? (
        <Message
          variant="success"
          message={'Register Successfully!  Redirecting...'}
        />
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              autoComplete="on"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="on"
            ></Form.Control>
          </Form.Group>

          <Row className="align-items-center">
            <Col>
              <Button
                variant="primary"
                type="submit"
                className="mt-1"
                onClick={(e) => onRegisterClick(e)}
              >
                Register
              </Button>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Link to={'/login'}>Have An Account?</Link>
            </Col>
          </Row>
        </Form>
      )}
    </FormContainer>
  );
};

export default RegisterScreen;
