import axios from 'axios';
import apiKeys from '../apiKeys';
import utils from '../utils';

const baseUrl = apiKeys.databaseURL;

const getRecipes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipes.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getRecipeById = (uid) => axios.get(`${baseUrl}/recipes/${uid}.json`);

export default {
  getRecipes,
  getRecipeById,
};
