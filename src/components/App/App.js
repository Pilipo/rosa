import React from 'react';
import {
  AppBar,
  Fab,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingIcon from '@material-ui/icons/ShoppingBasket';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import { withAuthentication, AuthUserContext } from '../Session';

import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import RecipesPage from '../Recipes';
import RecipePage from '../Recipe';
import PasswordForgetPage from '../PasswordForget';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import Footer from '../Footer';
import NavBar from '../NavBar';
import MakeShoppingList from '../ShoppingList/MakeShoppingList';

const App = (props) => {
  const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }));
  const classes = useStyles();
  return (
      <div id="wrapper" className="App vh-100">
        <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Router>
            <div>
              <AuthUserContext.Consumer>
                {(authUser) => {
                  if (authUser) {
                    return (<>
                      <Route exact path={ROUTES.LANDING} render={(appProps) => (<MakeShoppingList {...appProps} authUser={authUser} />)} />
                      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                      <Route path={ROUTES.RECIPES} component={RecipesPage} />
                      <Route path={ROUTES.RECIPE} component={RecipePage} />
                      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                      <Route path={ROUTES.ADMIN} component={AdminPage} />
                    </>);
                  }
                  return <></>;
                }}
              </AuthUserContext.Consumer>
            </div>
          </Router>
        </div>
        <AppBar position="fixed" color="primary" className={classes.appBar} >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onMouseDown={(e) => { e.preventDefault(); }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create List
            </Typography>
            <Fab
              color="secondary"
              aria-label="add"
              className={classes.fabButton}
              onMouseDown={(e) => { e.preventDefault(); }}
            >
              <AddIcon />
            </Fab>
            <div className={classes.grow} />
            <IconButton color="inherit" onMouseDown={(e) => { e.preventDefault(); }}>
              <SearchIcon />
            </IconButton>
            <IconButton edge="end" color="inherit" onMouseDown={(e) => { e.preventDefault(); }}>
              <ShoppingIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default withAuthentication(App);
