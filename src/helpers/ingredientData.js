import axios from 'axios';
import apiKeys from './apiKeys';

const baseUrl = apiKeys.databaseURL;

const getIngredients = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ingredients.json`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const getIngredientById = (uid) => axios.get(`${baseUrl}/ingredients/${uid}.json`);

export default {
  getIngredients,
  getIngredientById,
};
