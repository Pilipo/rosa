import React from 'react';

import { withToast } from '../Toast';
import CreateRecipe from '../Recipe/CreateRecipe';
import MakeShoppingList from '../ShoppingList/MakeShoppingList';
import CheckShoppingList from '../ShoppingList/CheckShoppingList';

const Landing = () => (
  <div className="container-fluid">
  <div className="row">
    <CreateRecipe />
    <MakeShoppingList />
    <CheckShoppingList />
  </div>
</div>
);

export default withToast(Landing);
