import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import { withFirebase } from '../Firebase';
import recipeData from '../../helpers/data/recipeData';
import RecipeTitleForm from '../Recipe/RecipeForm';

class RecipesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      recipes: [],
      selectedRecipesIds: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.auth.onAuthStateChanged((user) => this.handleRefresh());
  }

  handleRefresh() {
    Promise.all([
      recipeData.getRecipes(),
      this.props.firebase.shoppingList.get(),
    ])
      .then((data) => {
        const newRecipes = data[0].map((recipe) => {
          const newRecipe = recipe;
          newRecipe.inList = false;
          if (data[1] && data[1].recipes.indexOf(newRecipe.id) !== -1) newRecipe.inList = true;
          return newRecipe;
        });
        this.setState({
          loading: false,
          recipes: newRecipes,
          selectedRecipesIds: data[1],
        });
      });
  }

  handleDelete(recipeId) {
    recipeData.deleteRecipe(recipeId)
      .then((data) => this.handleRefresh());
  }

  handleCheck(evt) {
    if (evt.target.checked) {
      this.props.firebase.shoppingList.add(this.props.firebase.auth.currentUser.uid, evt.target.name)
        .then(() => this.handleRefresh());
    } else {
      this.props.firebase.shoppingList.delete(this.props.firebase.auth.currentUser.uid, evt.target.name)
        .then(() => this.handleRefresh());
    }
  }

  render() {
    const { recipes, loading } = this.state;

    const handleClick = () => this.setState({ show: true });
    const handleClose = () => this.setState({ show: false });

    return (
        <div>
          <h1>
            Recipes
            <Button onClick={handleClick} variant="primary" size="sm" className="ml-2 rounded-circle text-right"><i className="fas fa-plus">Add New</i></Button>
          </h1>

          {loading && <div>Loading ...</div>}

          {recipes && <RecipeList recipes={recipes} handleDelete={this.handleDelete} handleCheck={this.handleCheck} />}

          <Modal show={this.state.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Add Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body><RecipeTitleForm /></Modal.Body>
          </Modal>

        </div>
    );
  }
}

const RecipeList = ({ recipes, handleDelete, handleCheck }) => (
  <div className="list-group list-group-flush">
    {recipes.map((recipe) => (
    <div key={recipe.id} className="list-group-item list-group-item-action">
      <div className="row">
        <input className="col-1" name={recipe.id} type="checkbox" checked={recipe.inList} onChange={(e) => handleCheck(e, recipe.id)}></input>
        <Link className="col-9" to={`/recipe/${recipe.id}`}>{recipe.name} </Link>
        <button className="col-2 text-center" onClick={() => handleDelete(recipe.id)}>Delete</button>
      </div>
    </div>
    ))}
  </div>
);

export default withFirebase(RecipesPage);
