import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.databaseURL;

const getSections = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sections.json`)
    .then(({ data }) => resolve(data))
    .catch((err) => reject(err));
});

const getSectionById = (uid) => axios.get(`${baseUrl}/sections/${uid}.json`);

export default {
  getSections,
  getSectionById,
};
