import React from 'react';

import { withToast } from '../Toast';
import { AuthUserContext } from '../Session';
import CreateRecipe from '../Recipe/CreateRecipe';
import MakeShoppingList from '../ShoppingList/MakeShoppingList';
import CheckShoppingList from '../ShoppingList/CheckShoppingList';

const Landing = () => (
  <div className="container-fluid">
  <div className="row">
  <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <><CreateRecipe /> <MakeShoppingList /> <CheckShoppingList /></> : <h1>Welcome</h1>)}
    </AuthUserContext.Consumer>
  </div>
</div>
);

export default withToast(Landing);
