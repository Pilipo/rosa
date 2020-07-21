import axios from 'axios';
import apiKeys from '../apiKeys';
import utils from '../utils';

const baseUrl = apiKeys.databaseURL;

// *** Get ***

const getRecipes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipes.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getRecipeById = (uid) => axios.get(`${baseUrl}/recipes/${uid}.json`).then(({ data }) => (data));

const getMethodsByRecipeId = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipe-method.json?orderBy="recipeId"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getIngredientsByRecipeId = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipe-ingredient.json?orderBy="recipeId"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

// *** Add ***

const addRecipe = (newRecipeObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/recipes.json`, newRecipeObj)
    .then((data) => resolve(data.data));
});

export default {
  getRecipes,
  getRecipeById,
  getMethodsByRecipeId,
  getIngredientsByRecipeId,
  addRecipe,
};
