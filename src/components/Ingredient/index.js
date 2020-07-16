import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session'; 

class IngredientPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      ingredients: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.ingredients().on('value', (snapshot) => {
      const ingObject = snapshot.val();

      if (ingObject !== null) {
        const usersList = Object.keys(ingObject).map((key) => ({
          ...ingObject[key],
          uid: key,
        }));

        this.setState({
            ingredients: usersList,
          loading: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.ingredients().off();
  }


  render() {
    const { ingredients, loading } = this.state;
    return (
        <div>
          <h1>Admin</h1>

          {loading && <div>Loading ...</div>}

          <IngredientList ingredients={ingredients} />
        </div>
    );
  }
}

const IngredientList = ({ ingredients }) => (
  <ul>
    {ingredients.map((ingredient) => (
      <li key={ingredient.uid}>
        <span>
          <strong>ID:</strong> {ingredient.uid}
        </span>
        <span>
          <strong>Name:</strong> {ingredient.name}
        </span>
      </li>
    ))}
  </ul>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(withFirebase(IngredientPage));
