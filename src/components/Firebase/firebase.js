import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import apiKeys from '../../helpers/apiKeys';

class Firebase {
  constructor() {
    app.initializeApp(apiKeys);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Recipe API ***

  recipe = (uid) => this.db.ref(`recipes/${uid}`);
  
  recipes = () => this.db.ref('recipes');

  ingredientsByRecipeId = (uid) => this.db.ref(`recipes/${uid}/ingredients`);

  methodssByRecipeId = (uid) => this.db.ref(`recipes/${uid}/methods`);

  // *** Ingredient API ***

  ingredient = (uid) => this.db.ref(`ingredients/${uid}`);
  
  ingredients = () => this.db.ref('ingredients');

  categoryByIngredientId = (uid) => this.db.ref(`ingredients/${uid}/category`);

  // *** Method API ***

  method = (uid) => this.db.ref(`methods/${uid}`);

  methods = () => this.db.ref('methods');
  
  // *** Category API ***

  category = (uid) => this.db.ref(`categories/${uid}`);

  categories = () => this.db.ref('categories');

  // *** IngredientEntry API ***

  ingredientEntry = (uid) => this.db.ref(`ingredientEntries/${uid}`);

  ingredientEntries = () => this.db.ref('ingredientEntries');

  ingredientsByIngredientEntryId = (uid) => this.db.ref(`ingredientEntries/${uid}/ingredients`);

}

export default Firebase;
