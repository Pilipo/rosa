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
}

export default Firebase;
