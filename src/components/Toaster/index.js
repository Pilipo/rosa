import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

const Toaster = () => {
  const [show, setShow] = useState(true);

  return (
      <div className="toast-container" tabIndex={-1}>
      <Toast className="bg-success" onClose={() => setShow(false)} show={show} >
        <Toast.Header>
          <strong className="mr-auto">Rosa</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body className="text-center text-white">New recipe created!</Toast.Body>
      </Toast>
      </div>
  );
};

export default Toaster;
