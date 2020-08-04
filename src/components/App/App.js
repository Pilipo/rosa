import React, { useState } from 'react';
import {
  AppBar,
  Fab,
  IconButton,
  Toolbar,
  Typography,
  Paper,
  Fade,
  Slide,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingIcon from '@material-ui/icons/ShoppingBasket';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import { withAuthentication, AuthUserContext } from '../Session';

import CreateRecipe from '../Recipe/CreateRecipe';
import MakeShoppingList from '../ShoppingList/MakeShoppingList';

const App = (props) => {
  const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      zIndex: 2,
      position: 'relative',
      margin: theme.spacing(1),
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
  const [recipeIn, setRecipeIn] = useState(false);
  const classes = useStyles();
  return (
      <div id="wrapper" className="App">
        <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
        </div>
        <AppBar hidden={recipeIn} position="fixed" color="primary" className={classes.appBar} >
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
              onClick={() => setRecipeIn(!recipeIn)}
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
        <Fade in={!recipeIn} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.paper}>
          <AuthUserContext.Consumer>
                {(authUser) => (authUser ? <MakeShoppingList authUser={authUser} /> : <div>Loading...</div>)}
          </AuthUserContext.Consumer>
          </Paper>
        </Fade>
        <Slide direction="up" in={recipeIn} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.paper}>
            <CreateRecipe />
          </Paper>
        </Slide>
      </div>
    </div>
  );
};

export default withAuthentication(App);
