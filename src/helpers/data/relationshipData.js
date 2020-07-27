import axios from 'axios';
import apiKeys from '../apiKeys';

const baseUrl = apiKeys.databaseURL;

const getRelationshipId = (
  parentType,
  childType,
  childId,
) => axios.get(`${baseUrl}/${parentType}-${childType}.json?orderBy="${childType}Id"&equalTo="${childId}"&limitToFirst=1`);

// parent and child obj like thus: {name: 'recipe', id: '-MKi395hh6h9t94'}
const addRelationship = (parentObj, childObj) => {
  const newRecord = {
    [`${parentObj.name}Id`]: parentObj.id,
    [`${childObj.name}Id`]: childObj.id,
  };
  axios.post(`${baseUrl}/${parentObj.name}-${childObj.name}.json`, newRecord);
};

const deleteRelationship = (parentType, childType, childId) => {
  getRelationshipId(parentType, childType, childId)
    .then((data) => {
      const relId = Object.keys(data.data)[0];
      axios.delete(`${baseUrl}/${parentType}-${childType}/${relId}.json`);
    });
};

export default {
  addRelationship,
  deleteRelationship,
  getRelationshipId,
};
