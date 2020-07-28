import listHelper from '../../helpers/data/listData';

class ShoppingList {
  constructor(userObj) {
    this.list = [];
    this.userObj = userObj;
    userObj && this.get();
  }

  get = () => {
    const promise = listHelper.getList(this.userObj.uid);
    promise
      .then((data) => { this.list = data.recipes; });
    return promise;
  }

  add = (userId, recipeId) => {
    this.list.push(recipeId);
    return listHelper.setList(userId, this.list);
  }

  delete = (userId, recipeId) => {
    this.list.splice(this.list.indexOf(recipeId), 1);
    return listHelper.setList(userId, this.list);
  }
}

export default ShoppingList;
