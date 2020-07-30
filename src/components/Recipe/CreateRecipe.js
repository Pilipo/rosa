import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

import recipeHelper from '../../helpers/data/recipeData';

const CreateRecipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const [fieldValues, setFieldValues] = useState({ ingredient: '', method: '' });

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
      currentValueArr.push(value);
      setRecipeData({ ...recipeData, [name]: currentValueArr });
      setFieldValues({ ...fieldValues, [name]: '' });
      event.preventDefault();
    }
  };

  const handleSubmit = (event) => {
    recipeHelper.addRecipeWithChildren(recipeData);
    setRecipeData({});
  };

  return (
  <div className="col-xl-4 col-lg-6 mb-4">
    <div className="card border-left-success shadow h-100">
      <div className="card-header py-3">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <h6 className="m-0 font-weight-bold text-primary">Create a Recipe</h6>
          </div>
          <div className="col-auto">
            <i className="fas fa-folder-plus fa-2x text-gray-300"></i>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <form className="user" >
            <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                onKeyDown={handleEnter}
                onChange={handleChange}
              />
              <TextField
                label="Yield"
                name="servings"
                fullWidth
                margin="normal"
                onKeyDown={handleEnter}
                onChange={handleChange}
              />
              <hr />
              <TextField
                name="ingredient"
                label="Ingredient"
                fullWidth
                margin="normal"
                helperText="[return] to save and add another..."
                onKeyDown={handleChildEnter}
                onChange={handleChange}
                value={fieldValues.ingredient}
              />
              <ul>
              {recipeData.ingredient && recipeData.ingredient.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
              <TextField
                name="method"
                label="Method"
                fullWidth
                multiline
                margin="normal"
                helperText="[return] to save and add another..."
                onKeyDown={handleChildEnter}
                onChange={handleChange}
                value={fieldValues.method}
              />
              <ul>
                {recipeData.method && recipeData.method.map((met, i) => <li key={i}>{met}</li>)}
              </ul>
              <hr className="dropdown-divider" />
              <Button onClick={handleSubmit} variant="contained" color="primary">Save Recipe</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default CreateRecipe;
