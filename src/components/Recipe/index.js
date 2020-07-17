// an index of all the recipes.
// needs imput field for creating new recipes
// eventually searchable

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session'; 

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

    this.props.firebase.recipes().on('value', (snapshot) => {
      const recipeObject = snapshot.val();

      if (recipeObject !== null) {
        const recipesList = Object.keys(recipeObject).map((key) => ({
          ...recipeObject[key],
          uid: key,
        }));

        this.setState({
            recipes: recipesList,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.recipes().off();
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

class RecipePage extends Component {
  componentDidMount() {
    const {
      params: { uid }
    } = this.props.match;
    this.setState({ 
      loading: true,
      uid: uid,
     });

    this.props.firebase.recipe(uid).on('value', (snapshot) => {
      const recipeObject = snapshot.val();
      if (recipeObject !== null) {
        const recipesList = Object.keys(recipeObject).map((key) => ({
          ...recipeObject[key],
          uid: key,
        }));

        this.setState({
            data: recipesList,
          loading: false,
        });
      }
    });
  }


  render() {
    const {
      params: { uid }
    } = this.props.match;
    return (
      <h1>{uid}</h1>
    )
  }

} 



const condition = (authUser) => !!authUser;
const eRecipePage = withAuthorization(condition)(withFirebase(RecipePage));
const eRecipesPage = withAuthorization(condition)(withFirebase(RecipesPage));

export { eRecipePage, eRecipesPage };
