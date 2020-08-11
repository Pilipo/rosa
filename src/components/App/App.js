import React, { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from '../../helpers/apiKeys';

import LoginView from '../Login';
import NavBar from '../NavBar';
import Appbar from '../Appbar';
import Recipes from '../Recipes';
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
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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
      <Appbar />
      <div className="content-holder">
        <Recipes context={UserContext} />
      </div>
    </UserProvider>
  );

  // return (
  //   <>
  //   <nav hidden={recipeIn} position="fixed" color="default" >

  //         <div>
  //           <button
  //             className="col-4"
  //             color="inherit"
  //             aria-label="open drawer"
  //             onMouseDown={(e) => { e.preventDefault(); }}
  //             onClick={() => setShowMenu(true)}
  //           >
  //             {/* <AuthUserContext.Consumer>
  //               {(authUser) => (authUser
  //                 ? <Gravatar height={32} width={32} className="img-profile rounded-circle" alt="" email={authUser.email} />
  //                 : <i className="w-100 text-center fas fa-lg fa-user-circle"></i>
  //               )}
  //             </AuthUserContext.Consumer> */}
  //           </button>
  //           {/* <div className={classes.grow} /> */}
  //           <div className="col-4">
  //             <i className="w-100 text-center fas fa-2x text-primary fa-shopping-basket"></i>
  //           </div>
  //         </div>
  //       </nav>

  //       <div>
  //         {/* <AuthUserContext.Consumer>
  //           {(authUser) => <MakeShoppingList showSearch={showSearch} authUser={authUser} />}
  //         </AuthUserContext.Consumer> */}
  //       </div>

  //       </>
  // );
};

export default App;
