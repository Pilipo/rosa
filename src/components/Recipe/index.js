import React, { Component, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import recipeData from '../../helpers/data/recipeData';
import ingredientData from '../../helpers/data/ingredientData';
import methodData from '../../helpers/data/methodData';
import IngredientForm from './IngredientForm';
import MethodForm from './MethodForm';

class RecipePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      recipe: {},
      ingredients: [],
      methods: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    const {
      params: { uid },
    } = this.props.match;

    Promise.all([
      recipeData.getRecipeById(uid),
      recipeData.getIngredientsByRecipeId(uid),
      recipeData.getMethodsByRecipeId(uid),
    ]).then((dataArray) => {
      this.setState({ recipe: dataArray[0] });

      const ingredients = dataArray[1].map((ingredientObj) => (ingredientData.getIngredientById(ingredientObj.ingredientId)));

      Promise.all(ingredients).then((iData) => {
        const ingredientsList = Object.keys(iData).map((key) => ({
          ...iData[key].data,
          id: dataArray[1][key].ingredientId,
        }));
        this.setState({ ingredients: ingredientsList });
      });

      const methods = dataArray[2].map((methodObj) => (methodData.getMethodById(methodObj.methodId)));

      Promise.all(methods).then((iData) => {
        const methodsList = Object.keys(iData).map((key) => ({
          ...iData[key].data,
          id: dataArray[2][key].methodId,
        }));
        this.setState({ methods: methodsList });
      });
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.recipe ? this.state.recipe.name : ''}</h2>
        <p>Yield: {this.state.recipe ? this.state.recipe.servings : ''}</p>
        <IngredientList className="text-left" ingredients={this.state.ingredients} />
        <MethodList methods={this.state.methods} />
      </div>
    );
  }
}

const IngredientList = ({ ingredients }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
  <>
    <h1 className="h4">
      Ingredients
      <Button variant="primary" size="sm" onClick={handleShow} className="ml-2 rounded-circle text-right"><i className="fas fa-plus"></i></Button>
    </h1>
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          <span>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </span>
        </li>
      ))}
    </ul>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Ingredient</Modal.Title>
      </Modal.Header>
      <Modal.Body><IngredientForm handler={handleClose} /></Modal.Body>
    </Modal>
  </>
  );
};

const MethodList = ({ methods }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

  <>
    <h1 className="h4">
      Methods
      <Button onClick={handleShow} variant="primary" size="sm" className="ml-2 rounded-circle text-right"><i className="fas fa-plus"></i></Button>
    </h1>

    <ol>
      {methods.map((method) => (
        <li key={method.id}>
          {method.content}
        </li>
      ))}
    </ol>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Method</Modal.Title>
      </Modal.Header>
      <Modal.Body><MethodForm /></Modal.Body>
    </Modal>

  </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(RecipePage));
