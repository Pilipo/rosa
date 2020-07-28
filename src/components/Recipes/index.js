// an index of all the recipes.
// needs imput field for creating new recipes
// eventually searchable

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import recipeData from '../../helpers/data/recipeData';
import RecipeTitleForm from '../Recipe/RecipeForm';

class RecipesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      recipes: [],
    };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.handleRefresh();
  }

  handleRefresh() {
    recipeData.getRecipes().then((data) => {
      this.setState({
        recipes: data,
        loading: false,
        show: false,
      });
    });
  }

  handleDelete(recipeId) {
    recipeData.deleteRecipe(recipeId)
      .then((data) => this.handleRefresh());
  }

  handleCheck(evt, recipeId) {
    if (evt.target.checked) console.log(`Add ${recipeId} to the list`);
    else console.log(`Remove ${recipeId} from the list`);
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
        <input className="col-1" type="checkbox" onChange={(e) => handleCheck(e, recipe.id)}></input>
        <Link className="col-9" to={`/recipe/${recipe.id}`}>{recipe.name} </Link>
        <button className="col-2 text-center" onClick={() => handleDelete(recipe.id)}>Delete</button>
      </div>
    </div>
    ))}
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(RecipesPage));
