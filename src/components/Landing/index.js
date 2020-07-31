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
      {(authUser) => (authUser ? <><CreateRecipe /> <MakeShoppingList authUser={authUser} /> <CheckShoppingList /></> : <h1 className="mt-3 text-center w-100"><a href='/signin'>Welcome</a></h1>)}
    </AuthUserContext.Consumer>
  </div>
</div>
);

export default withToast(Landing);
