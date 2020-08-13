import React, { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from '../../helpers/apiKeys';

import LoginView from '../Login';
import NavBar from '../NavBar';
import Appbar from '../Appbar';
import Recipes from '../Recipes';
import CreateRecipe from '../Recipe/CreateRecipe';
import './index.scss';

firebase.initializeApp(apiKeys);

const defaultUser = { loggedIn: false, email: '' };
const UserContext = React.createContext(defaultUser);
const UserProvider = UserContext.Provider;

const onAuthStateChange = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback({ loggedIn: true, email: user.email, id: user.uid });
    } else {
      callback({ loggedIn: false });
    }
  });
};

const login = (username = null, password = null) => {
  if (username === null || password === null) {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  } else {
    firebase.auth().signInWithEmailAndPassword(username, password);
  }
};

const logout = () => {
  firebase.auth().signOut();
};

const App = (props) => {
  const [user, setUser] = useState({ loggedIn: false });
  const [recipeIn, setRecipeIn] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const requestLogin = useCallback((username, password) => {
    login(username, password);
  }, []);

  const requestLogout = useCallback(() => {
    logout();
  }, []);

  if (!user.loggedIn) {
    return <LoginView onClick={requestLogin} />;
  }

  return (
    <UserProvider value={user}>
      <NavBar onClick={requestLogout} context={UserContext} />
      <Appbar
        showSearchButton={showSearchButton}
        onSearchClick={() => setShowSearchBar(!showSearchBar)}
        onAddRecipeClick={() => setRecipeIn(true)}
      />
      <div className="content-holder">
        {recipeIn
          ? <CreateRecipe onClick={() => setRecipeIn(false)} />
          : <Recipes context={UserContext} showSearchBar={showSearchBar} />}
      </div>
    </UserProvider>
  );
};

export default App;
