import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import IngredientForm from './IngredientForm';

const IngredientList = ({
  ingredients,
  recipeObj,
  addIngredient,
  deleteIngredient,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
  <>
    <h1 className="h4">
      Ingredients
      <Button variant="primary" size="sm" onClick={handleShow} className="ml-2">Add</Button>
    </h1>
    <ul className="list-unstyled">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <span>
            {ingredient.amount} {ingredient.unit} - {ingredient.name}
          </span>
          <button onClick={() => deleteIngredient(ingredient.id)} className="btn btn-xs btn-primary ml-2">X</button>
        </li>
      ))}
    </ul>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Ingredient</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <IngredientForm
          handler={handleClose}
          recipeId={recipeObj.id}
          addIngredient={addIngredient}
        />
      </Modal.Body>
    </Modal>
  </>
  );
};

export default IngredientList;
