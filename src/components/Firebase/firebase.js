import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import ShoppingList from '../ShoppingList';
import apiKeys from '../../helpers/apiKeys';

class Firebase {
  constructor() {
    app.initializeApp(apiKeys);

    this.auth = app.auth();
    this.db = app.database();
    this.google = new app.auth.GoogleAuthProvider();
    this.auth.onAuthStateChanged((user) => { this.shoppingList = new ShoppingList(user); });
  }

  // *** Auth API ***

  doGoogleAuth = () => this.auth.signInWithRedirect(this.google);

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
