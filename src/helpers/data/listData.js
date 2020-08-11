import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.databaseURL;

const getList = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/lists/${userId}.json`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const setList = (userId, itemArray) => new Promise((resolve, reject) => {
  const obj = {
    recipes: itemArray,
  };
  axios.put(`${baseUrl}/lists/${userId}.json`, obj)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

export default {
  getList,
  setList,
};
