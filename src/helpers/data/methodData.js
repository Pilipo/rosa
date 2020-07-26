import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.databaseURL;

const getMethods = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/methods.json`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const getMethodById = (uid) => axios.get(`${baseUrl}/methods/${uid}.json`);

const getMethodsById = (idArr) => {
  const promiseArr = idArr.map((uid) => axios.get(`${baseUrl}/methods/${uid}.json`));
  return Promise.all(promiseArr);
};

// *** Add ***

const addMethod = (newMethodObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/methods.json`, newMethodObj)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

// *** Delete ***

const deleteMethod = (methodId) => {
  axios.delete(`${baseUrl}/methods/${methodId}.json`);
};

export default {
  getMethods,
  getMethodById,
  getMethodsById,
  addMethod,
  deleteMethod,
};
