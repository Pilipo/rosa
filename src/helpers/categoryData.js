import axios from 'axios';
import apiKeys from './apiKeys';

const baseUrl = apiKeys.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/categories.json`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default getCategories;