import React, { useState, useEffect, useContext } from 'react';
import recipeHelper from '../../helpers/data/recipeData';
import listHelper from '../../helpers/data/listData';
import './index.scss';

const Recipes = ({ context, showSearch }) => {
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
    <div className="card text-center mt-4 p-3">
      <div>No recipes found</div>
      <small className="ml-2">Why don't you {searchPhrase ? 'clear your search?' : 'create a new one?'}</small>
    </div>
  );

  const searchForm = () => (
    <form className="form-inline d-flex justify-content-center md-form form-sm active-purple active-purple-2 mt-2">
      <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Recipes"
        aria-label="Search" onChange={handleChange} value={searchPhrase} autoFocus />
      {searchPhrase.length
        ? <button onClick={(e) => { setSearchPhrase(''); e.preventDefault(); }} className="btn"><i className="ml-3 fas fa-times-circle" aria-hidden="true"></i></button>
        : <button onClick={(e) => { setSearchPhrase(''); e.preventDefault(); }} className="btn"><i className="ml-3 fas fa-search" aria-hidden="true"></i></button>
      }
    </form>
  );

  if (recipes.length) {
    return (
      <div className="animated slideInUp">
        {showSearch && searchForm()}

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

  return (
    <>
    {showSearch && searchForm()}
    {noRecipeContent()}
    </>
  );
};

export default Recipes;
