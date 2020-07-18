import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.databaseURL;

const getMethods = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/methods.json`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const getMethodById = (uid) => axios.get(`${baseUrl}/methods/${uid}.json`);

export default {
  getMethods,
  getMethodById,
};
