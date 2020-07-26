import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import MethodForm from './MethodForm';

const MethodList = ({
  methods,
  recipeObj,
  addMethod,
  deleteMethod,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

  <>
    <h1 className="h4">
      Methods
      <Button onClick={handleShow} variant="primary" size="sm" className="ml-2">Add</Button>
    </h1>

    <ol>
    {methods.map((method) => (
        <li key={method.id}>
          <span>
            {method.content}
          </span>
            <button onClick={() => deleteMethod(method.id)} className="btn btn-xs btn-primary ml-2">X</button>
        </li>
    ))}
    </ol>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MethodForm
          handler={handleClose}
          recipeId={recipeObj.id}
          addMethod={addMethod}
        />
      </Modal.Body>
    </Modal>
  </>
  );
};

export default MethodList;
