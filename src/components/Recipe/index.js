// an index of all the recipes.
// needs imput field for creating new recipes
// eventually searchable

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import recipeData from '../../helpers/data/recipeData';

class RecipesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      recipes: [],
      currentRecipeId: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    recipeData.getRecipes().then((data) => {
      this.setState({
        recipes: data,
      });
    });
  }

  render() {
    const { recipes, loading } = this.state;
    return (
        <div>
          <h1>Recipes</h1>

          {loading && <div>Loading ...</div>}

          {recipes && <RecipeList recipes={recipes} />}
        </div>
    );
  }
}

const RecipeList = ({ recipes }) => (
  <ul>
    {recipes.map((recipe) => (
      <li key={recipe.uid}>
        <span>
          <strong>Name: </strong> {recipe.name}
        </span>
        <Link to={`/recipe/${recipe.uid}`}> (Link)</Link>
      </li>
    ))}
  </ul>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(RecipesPage));
