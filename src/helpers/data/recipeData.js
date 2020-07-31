import axios from 'axios';
import apiKeys from '../apiKeys';
import utils from '../utils';
import relHelper from './relationshipData';
import ingredientHelper from './ingredientData';
import methodHelper from './methodData';

const baseUrl = apiKeys.databaseURL;

// *** Get ***

const getRecipes = (searchPhrase = null) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/recipes.json`)
    .then(({ data }) => {
      const convertedData = utils.convertFirebaseCollection(data);
      if (searchPhrase) resolve(utils.searchFirebaseCollection(convertedData, searchPhrase));
      else resolve(convertedData);
    })
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

const addRecipeWithChildren = (recipeObj) => new Promise((resolve, reject) => {
  // 1. post recipe and get id
  const {
    name,
    servings,
    ingredient,
    method,
  } = recipeObj;
  const promiseArr = [];
  addRecipe({ name, servings })
    .then((recipeData) => {
      // 2. iterate posting ingredients and methods and get ids
      // 3. iterate ingredient/method ids and post relationships
      if (ingredient) {
        ingredient.forEach((ing) => {
          const ingPromise = ingredientHelper.addIngredient({ name: ing });
          promiseArr.push(ingPromise);
          ingPromise
            .then((ingData) => relHelper.addRelationship({ id: recipeData.name, name: 'recipe' }, { id: ingData.name, name: 'ingredient' }));
        });
      }
      if (method) {
        method.forEach((met) => {
          const metPromise = methodHelper.addMethod({ name: met });
          promiseArr.push(metPromise);
          metPromise
            .then((metData) => relHelper.addRelationship({ id: recipeData.name, name: 'recipe' }, { id: metData.name, name: 'method' }));
        });
      }
    })
    .then(() => resolve(Promise.all(promiseArr)))
    .catch((err) => reject(err));
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
  addRecipeWithChildren,
  deleteRecipe,
};
