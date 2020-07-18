import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import recipeData from '../../helpers/data/recipeData';
import ingredientData from '../../helpers/data/ingredientData';
import methodData from '../../helpers/data/methodData';
import ModalContainer from './modalContainer';

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
        <p>Yield: {this.state.recipe ? this.state.recipe.yield : ''}</p>
        <IngredientList ingredients={this.state.ingredients} />
        <MethodList methods={this.state.methods} />
        <ModalContainer />
      </div>
    );
  }
}

const IngredientList = ({ ingredients }) => (
  <ul>
    {ingredients.map((ingredient) => (
      <li key={ingredient.id}>
        <span>
          {ingredient.amount} {ingredient.unit} {ingredient.name}
        </span>
      </li>
    ))}
  </ul>
);

const MethodList = ({ methods }) => (
  <ol>
    {methods.map((method) => (
      <li key={method.id}>
        {method.content}
      </li>
    ))}
  </ol>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(RecipePage));
