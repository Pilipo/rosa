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
    this.auth.onAuthStateChanged((user) => { this.shoppingList = new ShoppingList(user); });
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  // VVV Here is the reported issue.
  doSignInWithGoogle = () => {
    const googleProvider = new app.auth.GoogleAuthProvider();
    this.auth.signInWithPopup(googleProvider);
  }

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  makeToken = () => this.auth.getIdToken();
}

export default Firebase;
