import axios from 'axios';
import apiKeys from '../apiKeys';
import utils from '../utils';
import relHelper from './relationshipData';
import ingredientHelper from './ingredientData';
import methodHelper from './methodData';

const baseUrl = apiKeys.databaseURL;

// *** Get ***

const getRecipes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipes.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getRecipeById = (uid) => axios.get(`${baseUrl}/recipes/${uid}.json`).then(({ data }) => (data));

const getMethodsByRecipeId = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipe-method.json?orderBy="recipeId"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getIngredientsByRecipeId = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipe-ingredient.json?orderBy="recipeId"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

// *** Add ***

const addRecipe = (newRecipeObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/recipes.json`, newRecipeObj)
    .then((data) => resolve(data.data));
});

// *** Delete ***

const deleteRecipe = (recipeId) => new Promise((resolve, reject) => {
  Promise.all([
    getIngredientsByRecipeId(recipeId),
    getMethodsByRecipeId(recipeId),
  ])
    .then((data) => {
      const promiseArr = [];
      data.forEach((relType) => {
        relType.forEach((rel) => {
          const childRel = Object.keys(rel).filter((val) => val !== 'id' && val !== 'recipeId')[0];
          const childType = childRel.substring(0, childRel.length - 2);
          const childId = rel[childRel];
          promiseArr.push(relHelper.deleteRelationship('recipe', childType, childId));

          if (childType === 'ingredient') {
            promiseArr.push(ingredientHelper.deleteIngredient(childId));
          } else {
            promiseArr.push(methodHelper.deleteMethod(childId));
          }
        });
        promiseArr.push(axios.delete(`${baseUrl}/recipes/${recipeId}.json`));
        Promise.all(promiseArr)
          .then((promiseData) => resolve(promiseData))
          .catch((err) => reject(err));
      });
    });
});

export default {
  getRecipes,
  getRecipeById,
  getMethodsByRecipeId,
  getIngredientsByRecipeId,
  addRecipe,
  deleteRecipe,
};
