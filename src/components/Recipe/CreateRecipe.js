import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';

function handleEnter(event) {
  if (event.keyCode === 13) {
    const { form } = event.target;
    const index = Array.prototype.indexOf.call(form, event.target);
    form.elements[index + 1].focus();
    event.preventDefault();
  }
}

const CreateRecipe = () => (
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
                fullWidth
                margin="normal"
                onKeyDown={handleEnter}
              />
              <TextField
                label="Yield"
                fullWidth
                margin="normal"
                onKeyDown={handleEnter}
              />
              <hr />
              <TextField
                label="Ingredient"
                fullWidth
                margin="normal"
                helperText="[return] to save and add another..."
                onKeyDown={handleEnter}
              />
              <TextField
                label="Method"
                fullWidth
                multiline
                margin="normal"
                helperText="[return] to save and add another..."
                onKeyDown={handleEnter}
              />
              <hr className="dropdown-divider" />
              <Button variant="contained" color="primary">Save Recipe</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CreateRecipe;
