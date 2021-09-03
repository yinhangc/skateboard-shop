import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Message = ({ message, variant = 'danger' }) => {
  return <Alert variant={variant}>{message}</Alert>;
};

export default Message;
