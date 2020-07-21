import React, { Component } from 'react';

import ingredientDataHelper from '../../helpers/data/ingredientData';

function IngredientForm() {
  return (
    <IngredientFormBase />
  );
}

const INITIAL_STATE = {
  name: '',
  amount: '',
  unit: '',
  error: null,
};

class IngredientFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { name, amount, unit } = this.state;

    if (name === '' || amount === '' || unit === '') {
      return;
    }

    ingredientDataHelper
      .addIngredient({ name, amount, unit })
      .then((data) => {
        this.setState({ name, amount, unit }); // put data in state
        // load ingredient modal
      })
      .catch((err) => this.setState({ err }));

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      name, amount, unit, error,
    } = this.state;

    const isInvalid = name === '' || amount === '' || unit === '';

    return (
      <form className="user" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            className="form-control form-control-user"
            id="inputIngredientName"
            name="name"
            value={name}
            onChange={this.onChange}
            type="text"
            placeholder="Name: (e.g. AP Flour)"
            aria-describedby="nameHelp"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control form-control-user"
            id="inputIngredientAmount"
            name="amount"
            value={amount}
            onChange={this.onChange}
            type="text"
            placeholder="Amount: (e.g. 1)"
          />
        </div>
        <div className="form-group">
          <input
            className="form-control form-control-user"
            id="inputIngredientUnit"
            name="unit"
            value={unit}
            onChange={this.onChange}
            type="text"
            placeholder="Unit: (e.g. cup)"
          />
        </div>
        <div className="row">
        <div className="col-4">
            <a href="/recipes" className="btn btn-secondary btn-user btn-block">
              Cancel
            </a>
          </div>
          <div className="col-4">
            <button disabled={isInvalid} className="btn btn-primary btn-user btn-block" type="submit">
              Save and Close
            </button>
          </div>
          <div className="col-4">
            <button disabled={isInvalid} className="btn btn-primary btn-user btn-block" type="submit">
              Another...
            </button>
          </div>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default IngredientForm;
