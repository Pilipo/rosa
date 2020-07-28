class ShoppingList {
  constructor() {
    this.list = [];
  }

  add = (recipeId) => this.list.push(recipeId);

  delete = (recipeId) => this.list.splice(this.list.indexOf(recipeId), 1);

}

export default ShoppingList;
