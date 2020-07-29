import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import methodDataHelper from '../../helpers/data/methodData';
import relationshipHelper from '../../helpers/data/relationshipData';

const INITIAL_STATE = {
  content: '',
  error: null,
};

class MethodForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      recipeId: props.recipeId,
    };
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
    const { content } = this.state;

    if (content === '') {
      return;
    }

    if (event.keyCode === 13 && event.ctrlKey) {
      // ctrl + enter
      this.onSubmit(event, true);
    } else if (event.keyCode === 13) {
      // just enter
      this.onSubmit(event);
      this.setState({
        content: '',
      });
      this.nameInput.current.focus();
    }
  }

  onSubmit = (event, closeAfter = false) => {
    const { content } = this.state;

    if (content === '') {
      return;
    }
    methodDataHelper
      .addMethod({ content })
      .then((data) => {
        // this.setState({ content });
        relationshipHelper.addRelationship({
          name: 'recipe',
          id: this.state.recipeId,
        },
        {
          name: 'method',
          id: data.name,
        });

        this.props.addMethod({
          content,
          id: data.name,
        });
      })
      .then(() => {
        closeAfter && this.props.handler();
      })
      .catch((err) => this.setState({ err }));

    event.preventDefault && event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      content, error,
    } = this.state;

    const isInvalid = content === '';

    return (
      <form className="user" onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            ref={this.nameInput}
            className="form-control form-control-user"
            id="inputMethodContent"
            name="content"
            value={content}
            onChange={this.onChange}
            type="text"
            placeholder="Name: (e.g. In a bowl, combine dry ingredients)"
            aria-describedby="contentHelp"
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
            <button onClick={ () => this.handleKeyDown({ keyCode: 13, ctrlKey: true })} disabled={isInvalid} className="btn btn-primary btn-user btn-block" type="reset">
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

export default withRouter(MethodForm);
