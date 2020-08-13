import React, { useState, useRef } from 'react';

import recipeHelper from '../../helpers/data/recipeData';
import './recipe.scss';

const groceryAisle = [
  'produce',
  'bakery',
  'deli',
  'butcher',
  'dairy',
  'frozen',
  'canned',
  'baking',
  'pasta/rice',
  'sauces/oils',
  'condiments',
  'spices',
  'snacks',
  'other',
];

const CreateRecipe = ({ onClick }) => {
  const [recipeData, setRecipeData] = useState({});
  const [fieldValues, setFieldValues] = useState({ ingredient: '', section: '', method: '' });
  const [filteredAisles, setFilteredAisles] = useState(groceryAisle);
  const [section, setSection] = useState('');
  const formRef = useRef(null);
  const nameRef = useRef(null);

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      const { form } = event.target;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name' || name === 'servings') {
      setRecipeData({ ...recipeData, [name]: value });
    } else {
      setFieldValues({ ...fieldValues, [name]: value });
    }
  };

  const handleChildEnter = (event) => {
    if (event.keyCode === 13) {
      const { name, value } = event.target;
      const currentValueArr = recipeData[name] || [];
      if (name === 'ingredient') {
        currentValueArr.push([value, section]);
      } else {
        currentValueArr.push(value);
      }
      setRecipeData({ ...recipeData, [name]: currentValueArr });
      setFieldValues({ ...fieldValues, [name]: '' });
      event.preventDefault();
    }
  };

  const findIndexOfGroceryAisle = (phrase) => setFilteredAisles(groceryAisle.filter((aisle) => aisle.indexOf(phrase) !== -1));

  const handleSubmit = (event) => {
    event.preventDefault();
    formRef.current.reset();
    nameRef.current.focus();
    recipeHelper.addRecipeWithChildren(recipeData);
    setRecipeData({});
    onClick();
  };

  return (
  <div className="col-xl-4 col-lg-6 mb-4 mt-2">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            {}
            <form className="user" ref={formRef} autoComplete="off" >

            <div className="md-form mb-3">
              <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Recipe Name"
                  aria-label="Recipe Name"
                  aria-describedby="material-addon1"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                  ref={nameRef}
                  autoFocus={true}
                />
            </div>
            <div className="md-form mb-3">
              <input
                  type="text"
                  name="servings"
                  className="form-control"
                  placeholder="Recipe Yield"
                  aria-label="Recipe Name"
                  aria-describedby="material-addon1"
                  onKeyDown={handleEnter}
                  onChange={handleChange}
                />
            </div>
              <hr />
              <div className="md-form input-group mb-3">
                <input
                  type="text"
                  name="ingredient"
                  className="form-control"
                  placeholder="Ingredient"
                  aria-label="Ingredient"
                  aria-describedby="material-addon1"
                  onKeyDown={handleChildEnter}
                  onChange={handleChange}
                  value={fieldValues.ingredient}
                />
                <div className="input-group-append input-group-prepend">
                  <span className="input-group-text">in</span>
                </div>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {filteredAisles.map((s, index) => (
                    <button
                      onClick={(e) => { e.preventDefault(); setSection(s); fieldValues.ingredient && handleChildEnter(); }}
                      className="btn dropdown-item"
                      key={index}
                      value={s}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <input
                  className="form-control dropdown-toggle"
                  data-toggle="dropdown"
                  id="appendedInputButton"
                  size="16"
                  type="text"
                  placeholder={section || 'Grocery Aisle'}
                  value={section}
                  onChange={(e) => { findIndexOfGroceryAisle(e.target.value); setSection(e.target.value); }}
                  onFocus={(e) => e.target.click()}
                />
              </div>
              <ul>
                  {recipeData.ingredient && recipeData.ingredient.map((ing, i) => <li key={i}>{ing[0]}{ing[1] && ` in ${ing[1]} aisle.`}</li>)}
              </ul>
              <input
                  type="text"
                  name="method"
                  className="form-control"
                  placeholder="Method"
                  aria-label="Method"
                  aria-describedby="material-addon1"
                  onKeyDown={handleChildEnter}
                  onChange={handleChange}
                  value={fieldValues.method}
                  />
              <ul>
                {recipeData.method && recipeData.method.map((met, i) => <li key={i}>{met}</li>)}
              </ul>
              <hr className="dropdown-divider" />
              <div className="row">
                <div className="col-6 text-center">
                  <button className="btn btn-secondary" type="reset" onClick={onClick}>Cancel</button>
                </div>
                <div className="col-6 text-center">
                  <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Save Recipe</button>
                </div>
              </div>
            </form>
          </div>
        </div>
  </div>
  );
};

export default CreateRecipe;
