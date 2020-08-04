import React, { useState, useRef } from 'react';
import { TextField, Button } from '@material-ui/core';

import recipeHelper from '../../helpers/data/recipeData';

const CreateRecipe = (props) => {
  const [recipeData, setRecipeData] = useState({});
  const [fieldValues, setFieldValues] = useState({ ingredient: '', method: '' });
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
      currentValueArr.push(value);
      setRecipeData({ ...recipeData, [name]: currentValueArr });
      setFieldValues({ ...fieldValues, [name]: '' });
      event.preventDefault();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    formRef.current.reset();
    nameRef.current.focus();
    recipeHelper.addRecipeWithChildren(recipeData);
    setRecipeData({});
    props.handleClose();
  };

  return (
  <div className="col-xl-4 col-lg-6 mb-4 mt-2">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            {}
            <form className="user" ref={formRef} autoComplete="off" >
            <TextField
                label="Recipe Name"
                name="name"
                fullWidth
                margin="normal"
                onKeyDown={handleEnter}
                onChange={handleChange}
                ref={nameRef}
                autoFocus={true}
              />
              <TextField
                label="Recipe Yield"
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
              <div>
                <Button type="reset" onClick={props.handleClose} variant="contained" color="secondary">Cancel</Button>
                <Button style={{ textAlign: 'right' }} type="submit" onClick={handleSubmit} variant="contained" color="primary">Save Recipe</Button>
              </div>
            </form>
          </div>
        </div>
  </div>
  );
};

export default CreateRecipe;
