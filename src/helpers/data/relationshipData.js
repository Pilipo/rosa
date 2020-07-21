import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.databaseURL;

// parent and child obj like thus: {name: 'recipe', id: '-MKi395hh6h9t94'}
const addRelationship = (parentObj, childObj) => {
  const newRecord = {
    [`${parentObj.name}Id`]: parentObj.id,
    [`${childObj.name}Id`]: childObj.id,
  };
  axios.post(`${baseUrl}/${parentObj.name}-${childObj.name}.json`, newRecord);
};

export default { addRelationship };
