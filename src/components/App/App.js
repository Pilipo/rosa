import React, { useState } from 'react';
import Gravatar from 'react-gravatar';
import { withAuthentication, AuthUserContext } from '../Session';
import MakeShoppingList from '../ShoppingList/MakeShoppingList';

const App = (props) => {
  const [recipeIn, setRecipeIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const handleLogOut = () => {
    props.firebase.doSignOut();
  };
  return (
    <>
    <nav hidden={recipeIn} position="fixed" color="default" >

          <div>
            <button
              className="col-4"
              color="inherit"
              aria-label="open drawer"
              onMouseDown={(e) => { e.preventDefault(); }}
              onClick={() => setShowMenu(true)}
            >
              <AuthUserContext.Consumer>
                {(authUser) => (authUser
                  ? <Gravatar height={32} width={32} className="img-profile rounded-circle" alt="" email={authUser.email} />
                  : <i className="w-100 text-center fas fa-lg fa-user-circle"></i>
                )}
              </AuthUserContext.Consumer>
            </button>
            {/* <div className={classes.grow} /> */}
            <div className="col-4">
              <i className="w-100 text-center fas fa-2x text-primary fa-shopping-basket"></i>
            </div>
          </div>
        </nav>

        <div>
          <AuthUserContext.Consumer>
            {(authUser) => <MakeShoppingList showSearch={showSearch} authUser={authUser} />}
          </AuthUserContext.Consumer>
        </div>

        </>
  );
};

export default withAuthentication(App);
