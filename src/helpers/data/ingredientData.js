import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.databaseURL;

const getIngredients = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ingredients.json`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const getIngredientById = (uid) => axios.get(`${baseUrl}/ingredients/${uid}.json`);

// *** Add ***

const addIngredient = (newIngredientObj, recipeId) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/ingredients.json`, newIngredientObj)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default {
  getIngredients,
  getIngredientById,
  addIngredient,
};
