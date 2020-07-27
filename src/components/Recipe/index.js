import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import recipeData from '../../helpers/data/recipeData';
import ingredientData from '../../helpers/data/ingredientData';
import IngredientList from '../Ingredient';
import methodData from '../../helpers/data/methodData';
import MethodList from '../Method';
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
    this.addMethod = this.addMethod.bind(this);
    this.deleteMethod = this.deleteMethod.bind(this);
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
    this.setState({
      methods: [...this.state.methods, methodObj],
    });
  }

  deleteMethod(methodId) {
    const filteredMethods = this.state.methods.filter((item) => item.id !== methodId);
    this.setState({ methods: filteredMethods });
    methodData.deleteMethod(methodId);
    relationshipData.deleteRelationship('recipe', 'method', methodId);
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

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(RecipePage));
