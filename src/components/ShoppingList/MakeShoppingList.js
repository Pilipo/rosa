import React, { useState, useEffect } from 'react';

import recipeHelper from '../../helpers/data/recipeData';
import listHelper from '../../helpers/data/listData';
import './index.scss';

const MakeShoppingList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    recipeHelper.getRecipes(searchPhrase)
      .then((data) => setRecipes(data));
    selectedRecipes.length > 0 && listHelper.setList(props.authUser.uid, selectedRecipes);
  }, [searchPhrase, props.authUser.uid, selectedRecipes]);

  useEffect(() => {
    listHelper.getList(props.authUser.uid)
      .then((data) => setSelectedRecipes(data.recipes));
  }, [props.authUser.uid]);

  const handleChange = (e) => {
    setSearchPhrase(e.target.value);
  };

  const handleClick = (recipe, e) => {
    if (selectedRecipes.filter((selectedRecipe) => selectedRecipe.name === recipe.name).length) {
      setSelectedRecipes(selectedRecipes.filter((selectedRecipe) => selectedRecipe.name !== recipe.name));
    } else {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
    e.preventDefault();
  };

  return (
    <div className="col-xl-4 col-lg-6 mb-4">
      <div className="card border-left-success shadow h-100">
        <div className="card-header py-3">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <h6 className="m-0 font-weight-bold text-primary">Make a shopping list</h6>
            </div>
            <div className="col-auto">
              <i className="fas fa-list fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
        <div className="card-body">
        <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2 mb-2">
          <input onChange={handleChange} className="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search"
            aria-label="Search" />
          <i className="fas fa-search" aria-hidden="true"></i>
        </form>
          <div className="row no-gutters align-items-center">
            <div className="col mr-2 overflow-hide">
              <div className="list-group list-group-flush">
                {recipes ? (
                  recipes.map((recipe) => (
                      <button
                        key={recipe.id}
                        className={`list-group-item list-group-item-action ${selectedRecipes.filter((rec) => rec.name === recipe.name).length > 0 ? 'active' : ''}`}
                        onClick={(e) => handleClick(recipe, e)}
                        onMouseDown={(e) => { e.preventDefault(); }}
                      >
                        <div>{recipe.name}</div>
                        <small className="ml-2">{recipe.servings}</small>
                      </button>
                  ))) : 'loading...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeShoppingList;
