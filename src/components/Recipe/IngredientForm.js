import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ingredientDataHelper from '../../helpers/data/ingredientData';

const INITIAL_STATE = {
  name: '',
  amount: '',
  unit: '',
  error: null,
};

class IngredientForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.nameInput = React.createRef();
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyDown, false);
    setTimeout(() => this.nameInput.current.focus(), 1);
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  handleKeyDown = (event) => {
    const { name, amount, unit } = this.state;

    if (name === '' || amount === '' || unit === '') {
      return;
    }

    if (event.keyCode === 13 && event.ctrlKey) {
      // ctrl + enter
      this.onSubmit(event);
      this.props.handler();
    } else if (event.keyCode === 13) {
      // just enter
      this.onSubmit(event);
      this.setState({
        name: '',
        amount: '',
        unit: '',
      });
      this.nameInput.current.focus();
    }
  }

  onSubmit = (event) => {
    const { name, amount, unit } = this.state;

    if (name === '' || amount === '' || unit === '') {
      return;
    }

    ingredientDataHelper
      .addIngredient({ name, amount, unit })
      .then((data) => {
        this.setState({ name, amount, unit });
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
            ref={this.nameInput}
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
            <button onClick={this.props.handler} className="btn btn-secondary btn-user btn-block" type="reset">
              <div>Cancel</div>
              <div className="text-gray-300 font-italic">(esc)</div>
            </button>
          </div>
          <div className="col-4">
            <button onClick={this.props.handler} disabled={isInvalid} className="btn btn-primary btn-user btn-block" type="submit">
              <div>Save and Close</div>
              <div className="text-gray-300 font-italic">(ctrl + enter)</div>
            </button>
          </div>
          <div className="col-4">
            <button disabled={isInvalid} className="btn btn-primary btn-user btn-block" type="submit">
              <div>Another...</div>
              <div className="text-gray-300 font-italic">(enter)</div>
            </button>
          </div>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(IngredientForm);
