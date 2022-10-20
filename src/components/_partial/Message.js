import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, fadeTimeout, children }) => {
  const [visibleAlert, setVisibleAlert] = useState(true);

  useEffect(() => {
    if (fadeTimeout === true) {
      setVisibleAlert(true);
      setTimeout(() => {
        setVisibleAlert(false);
      }, 3000);
    }
  }, [fadeTimeout]);

  const iconClass = {
    success: 'circle-check',
    info: 'circle-info',
    danger: 'circle-exclamation',
  };

  return (
    <Alert show={visibleAlert} variant={variant} className='w-100 align-items-center display-flex'>
      {iconClass[variant] && (
        <i className={`fa-solid fa-${iconClass[variant]} pr-2 fa-icon-size`} />
      )}
      <span>{children}</span>
    </Alert>
  );
};

Message.defaultProps = { variant: 'info', fadeTimeout: true };

export default Message;
