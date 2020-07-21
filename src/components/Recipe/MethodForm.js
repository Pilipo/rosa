import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import methodDataHelper from '../../helpers/data/methodData';

const INITIAL_STATE = {
  content: '',
  error: null,
};

class MethodForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { content } = this.state;

    if (content === '') {
      return;
    }

    methodDataHelper
      .addMethod({ content })
      .then((data) => {
        this.setState({ content }); // put data in state
      })
      .catch((err) => this.setState({ err }));

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { content, error } = this.state;

    const isInvalid = content === '';

    return (
      <form className="user" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            className="form-control form-control-user"
            id="inputMethodContent"
            name="content"
            value={content}
            onChange={this.onChange}
            type="text"
            placeholder="Next Step: (e.g. In a bowl, mix wet ingredients)"
            aria-describedby="contentHelp"
          />
        </div>
        <div className="row">
        <div className="col-4">
            <button onClick={this.props.handler} className="btn btn-secondary btn-user btn-block" type="reset">
              Cancel
            </button>
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

export default withRouter(MethodForm);
