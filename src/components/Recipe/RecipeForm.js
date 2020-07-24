import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import recipeDataHelper from '../../helpers/data/recipeData';
import { withToast } from '../Toast';

const INITIAL_STATE = {
  name: '',
  servings: '',
  error: null,
};

class RecipeTitleForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { name, servings } = this.state;

    if (name === '' || servings === '') {
      return;
    }
    recipeDataHelper
      .addRecipe({ name, servings })
      .then((data) => {
        this.setState({ name, servings });
        this.props.history.push(`/recipe/${data.name}`);
        this.props.toast.makeToast('Recipe created. Let\'s add ingredients and methods!');
      })
      .catch((err) => this.setState({ err }));

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, servings, error } = this.state;

    const isInvalid = name === '' || servings === '';

    return (
      <form className="user" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            className="form-control form-control-user"
            id="inputRecipeName"
            name="name"
            value={name}
            onChange={this.onChange}
            type="text"
            placeholder="Chicken and Waffles"
            aria-describedby="nameHelp"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control form-control-user"
            id="inputRecipeYield"
            name="servings"
            value={servings}
            onChange={this.onChange}
            type="text"
            placeholder="4 servings"
          />

        </div>
        <div className="row">
        <div className="col-5">
            <a href="/recipes" className="btn btn-primary btn-user btn-block">
              Cancel
            </a>
          </div>
          <div className="offset-2 col-5">
            <button disabled={isInvalid} className="btn btn-primary btn-user btn-block" type="submit">
              Continue...
            </button>
          </div>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(withToast(RecipeTitleForm));
