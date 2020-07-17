// an index of all the recipes.
// needs imput field for creating new recipes
// eventually searchable

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session'; 
import categoryData from '../../helpers/categoryData';

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
    categoryData().then((data => console.log(data)))
    console.log(categoryData);
  }

  render() {
    const { recipes, loading } = this.state;
    return (
        <div>
          <h1>Recipes</h1>

          {loading && <div>Loading ...</div>}

          <RecipeList recipes={recipes} />
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
