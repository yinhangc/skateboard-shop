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
import { updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oPassword, setOPassword] = useState('');
  const [nPassword, setNPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!userDetails) {
      history.push('/login');
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [userDetails, history]);

  const onOPasswordChange = (pw) => {
    setOPassword(pw);
    if (alert) setAlert(null);
  };

  const onNPasswordChange = (pw) => {
    setNPassword(pw);
    if (alert) setAlert(null);
  };

  const onUpdateClick = (e) => {
    e.preventDefault();
    if (oPassword === '') {
      setAlert('Please fill in your current password');
      return;
    }
    if (nPassword !== confirmPassword) {
      setAlert("Password doesn't match");
      setNPassword('');
      setConfirmPassword('');
      return;
    }
    dispatch(
      updateUserProfile({
        id: userDetails._id,
        name,
        email,
        oPassword,
        nPassword,
      })
    );
  };

  return (
    <FormContainer>
      <h1 className="my-3">Your Profile</h1>
      {alert && <Message message={alert} />}
      {error && <Message message={error} />}
      {success && (
        <Message
          variant="success"
          message={'Your profile is updated successfully!'}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <Form>
          <p>Enter password to update personal information:</p>
          <hr />
          <input type="text" autoComplete="username" className="d-none" />
          <Form.Group className="mb-3" controlId="oPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={oPassword}
              onChange={(e) => onOPasswordChange(e.target.value)}
              autoComplete="new-password"
            ></Form.Control>
          </Form.Group>
          <hr />

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

          <Form.Group className="mb-3" controlId="nPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={nPassword}
              onChange={(e) => onNPasswordChange(e.target.value)}
              autoComplete="off"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="on"
            ></Form.Control>
          </Form.Group>
          <Row className="align-items-center pb-3">
            <Col>
              <Link className="btn" to="/" style={{ background: '#eee' }}>
                &lt; Back
              </Link>
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => onUpdateClick(e)}
              >
                Update Profile
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </FormContainer>
  );
};

export default ProfileScreen;
