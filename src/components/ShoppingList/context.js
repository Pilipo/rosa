import React from 'react';

const ShoppingListContext = React.createContext(null);
export const withShoppingList = (Component) => (props) => (
  <ShoppingListContext.Consumer>
    {(shoppingList) => <Component {...props} shoppingList={shoppingList} />}
  </ShoppingListContext.Consumer>
);
export default ShoppingListContext;
