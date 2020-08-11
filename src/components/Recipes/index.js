import React, { useState, useEffect, useContext } from 'react';
import recipeHelper from '../../helpers/data/recipeData';
import listHelper from '../../helpers/data/listData';
import './index.scss';

const Recipes = ({ context }) => {
  const user = useContext(context);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    recipeHelper.getRecipes(searchPhrase)
      .then((data) => setRecipes(data));
    selectedRecipes.length > 0 && listHelper.setList(user.id, selectedRecipes);
  }, [searchPhrase, user.id, selectedRecipes]);

  useEffect(() => {
    listHelper.getList(user.id)
      .then((data) => data && setSelectedRecipes(data.recipes));
  }, [user.id]);

  const handleChange = (e) => {
    setSearchPhrase(e.target.value);
  };

  const handleClick = (recipe, e) => {
    e.preventDefault();
    if (selectedRecipes.filter((selectedRecipe) => selectedRecipe.name === recipe.name).length) {
      setSelectedRecipes(selectedRecipes.filter((selectedRecipe) => selectedRecipe.name !== recipe.name));
    } else {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
  };

  const isRecipeSelected = (recipeName) => (selectedRecipes.filter((rec) => rec.name === recipeName).length > 0);

  const noRecipeContent = () => (
    <div className="card">
      <div>No recipes found</div>
      <small className="ml-2">Why don't you {searchPhrase ? 'clear your search?' : 'create a new one?'}</small>
    </div>
  );

  if (recipes.length) {
    return (
      <div>
        <div component="form">
          <input placeholder="Search Recipes" onChange={handleChange} value={searchPhrase} autoFocus />
          <i onClick={() => setSearchPhrase('')} onMouseDown={(e) => { e.preventDefault(); }} className="fas fa-search" ></i>
        </div>
        {recipes.map((recipe) => (
          <div className="card m-1" key={recipe.id} >
            <div className="row no-gutters">
              <div className="col-3">
                <img className="card-img" src="http://via.placeholder.com/88.png" alt="food shot" />
              </div>
              <div className="col-7">
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <small className="ml-2">{recipe.servings}</small>
                </div>
              </div>
              <div className="col-2 align-items-center d-flex">
                <button
                  onClick={(e) => handleClick(recipe, e)}
                  className={`btn ${isRecipeSelected(recipe.name) ? 'btn-success' : 'btn-secondary'}`}
                >
                  <i className="fas fa-check"></i>
                </button>
              </div>

          </div>
        </div>
        ))}
      </div>
    );
  }

  return noRecipeContent();
};

export default Recipes;
