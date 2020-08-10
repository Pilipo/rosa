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
      .then((data) => data && setSelectedRecipes(data.recipes));
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
    <div>
      <div component="form">
        <input
          placeholder="Search Recipes"
          onChange={handleChange}
          value={searchPhrase}
          autoFocus
        />
        <i
          onClick={() => setSearchPhrase('')}
          onMouseDown={(e) => { e.preventDefault(); }}
          className="fas fa-search"
        >
        </i>
      </div>
    {recipes.length ? (
      recipes.map((recipe) => (
        <div
          className="card"
          key={recipe.id}
        >
          <div
            className="card-img-left"
            image="http://via.placeholder.com/88.png"
            title="Live from space album cover"
          />
          <div className="col-7">
            <div>{recipe.name}</div>
            <small className="ml-2">{recipe.servings}</small>
          </div>
          <div className="col-2 align-items-center d-flex">
            <button
              onChange={(e) => handleClick(recipe, e)}
              selected={ selectedRecipes.filter((rec) => rec.name === recipe.name).length > 0 }
              value="check"
            >
              <i className="fas fa-check"></i>
            </button>
          </div>
        </div>
      )))
      : <div className="card">
            <div>No recipes found</div>
            <small className="ml-2">Why don't you {searchPhrase ? 'clear your search?' : 'create a new one?'}</small>
        </div>
      }
      </div>
  );
};

export default MakeShoppingList;
