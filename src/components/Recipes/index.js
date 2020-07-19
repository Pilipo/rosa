// an index of all the recipes.
// needs imput field for creating new recipes
// eventually searchable

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import recipeData from '../../helpers/data/recipeData';

class RecipesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      recipes: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    recipeData.getRecipes().then((data) => {
      this.setState({
        recipes: data,
        loading: false,
        show: false,
      });
    });
  }

  render() {
    const { recipes, loading } = this.state;

    const handleClick = () => this.setState({ show: true });
    const handleClose = () => this.setState({ show: false });

    return (
        <div>
          <h1>
            Recipes
            <Button onClick={handleClick} variant="primary" size="sm" className="ml-2 rounded-circle text-right"><i className="fas fa-plus"></i></Button>
          </h1>

          {loading && <div>Loading ...</div>}

          {recipes && <RecipeList recipes={recipes} />}

          <Modal show={this.state.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">Add Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>This should be replaced with an input field.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Continue...
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
    );
  }
}

const RecipeList = ({ recipes }) => (
  <ul>
    {recipes.map((recipe) => (
      <li key={recipe.id}>
        <span>
          <strong>Name: </strong> {recipe.name}
        </span>
        <Link to={`/recipe/${recipe.id}`}> (Link)</Link>
      </li>
    ))}
  </ul>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(RecipesPage));
