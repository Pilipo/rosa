import React, { Component, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import recipeData from '../../helpers/data/recipeData';
import ingredientData from '../../helpers/data/ingredientData';
import methodData from '../../helpers/data/methodData';
import IngredientForm from './IngredientForm';
import MethodForm from './MethodForm';
import relationshipData from '../../helpers/data/relationshipData';

import './recipe.scss';

class RecipePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      recipe: {},
      ingredients: [],
      methods: [],
    };

    this.addIngredient = this.addIngredient.bind(this);
    this.deleteIngredient = this.deleteIngredient.bind(this);
  }

  addIngredient(ingredientObj) {
    this.setState({
      ingredients: [...this.state.ingredients, ingredientObj],
    });
  }

  deleteIngredient(ingredientId) {
    const filteredIngredients = this.state.ingredients.filter((item) => item.id !== ingredientId);
    this.setState({ ingredients: filteredIngredients });
    ingredientData.deleteIngredient(ingredientId);
    relationshipData.deleteRelationship('recipe', 'ingredient', ingredientId);
  }

  addMethod(methodObj) {
    const { methods } = this.state;
    methods.push(methodObj);
    this.setState({ methods });
  }

  componentDidMount() {
    this.setState({ loading: true });
    // get uid from Route
    const {
      params: { uid },
    } = this.props.match;

    Promise.all([
      recipeData.getRecipeById(uid),
      recipeData.getIngredientsByRecipeId(uid),
      recipeData.getMethodsByRecipeId(uid),
    ]).then((dataArray) => {
      // eslint-disable-next-line no-param-reassign
      dataArray[0].id = uid;
      this.setState({ recipe: dataArray[0] });

      const ingredients = dataArray[1].map((ingredientObj) => (ingredientData.getIngredientById(ingredientObj.ingredientId)));

      Promise.all(ingredients).then((iData) => {
        const ingredientsList = Object.keys(iData).map((key) => ({
          ...iData[key].data,
          id: dataArray[1][key].ingredientId,
        }));
        this.setState({ ingredients: ingredientsList });
      });

      const methodPromiseArray = dataArray[2].map((methodObj) => methodData.getMethodById(methodObj.methodId));

      Promise.all(methodPromiseArray).then((mData) => {
        const methodsList = Object.keys(mData).map((key) => ({
          ...mData[key].data,
          id: dataArray[2][key].methodId,
        }));
        this.setState({ methods: methodsList });
      });
    });
  }

  render() {
    return (
      <div className="row">
      <div className="col text-center">
        <h2>{this.state.recipe ? this.state.recipe.name : ''}</h2>
        <p>Yield: {this.state.recipe ? this.state.recipe.servings : ''}</p>
        <IngredientList className="text-left"
          ingredients={this.state.ingredients}
          recipeObj={this.state.recipe}
          addIngredient={this.addIngredient}
          deleteIngredient={this.deleteIngredient}
        />
        <MethodList className="text-left"
          methods={this.state.methods}
          recipeObj={this.state.recipe}
          addMethod={this.addMethod}
          deleteMethod={this.deleteMethod}
        />
      </div>
      </div>
    );
  }
}

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
            {/* <button onClick={() => deleteMethod(method.id)} className="btn btn-xs btn-primary ml-2 btn-circle rounded-circle"><i className="fas fa-times"></i></button> */}
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
          addIngredient={addMethod}
        />
      </Modal.Body>
    </Modal>
  </>
  );
};

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(RecipePage));
