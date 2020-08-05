import React, { useState } from 'react';
import Gravatar from 'react-gravatar';
import {
  AppBar,
  Fab,
  IconButton,
  Toolbar,
  Paper,
  Fade,
  Slide,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RestoreIcon from '@material-ui/icons/Restore';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import CalendarIcon from '@material-ui/icons/Today';
import AddIcon from '@material-ui/icons/Add';
import { withAuthentication, AuthUserContext } from '../Session';
import CreateRecipe from '../Recipe/CreateRecipe';
import MakeShoppingList from '../ShoppingList/MakeShoppingList';

const App = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: `${100}%`,
      bottom: 0,
      position: 'fixed',
      zIndex: 3,
      borderTop: `${1}px #dddddd solid`,
      height: `${75}px`,
    },
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
      top: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 3,
      bottom: 80,
      right: 12,
      margin: '0 auto',
    },
  }));
  const [recipeIn, setRecipeIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const classes = useStyles();
  return (
      <div id="wrapper" className="App">
        <div id="content-wrapper" className="d-flex flex-column">
          <AuthUserContext.Consumer>
            {(authUser) => (authUser ? 'authed' : 'not authed')}
          </AuthUserContext.Consumer>
        <AppBar hidden={recipeIn} position="sticky" color="white" className={classes.appBar} >

          <Toolbar>
            <IconButton
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
            </IconButton>
            {/* <div className={classes.grow} /> */}
            <div className="col-4">
              <i className="w-100 text-center fas fa-2x text-primary fa-shopping-basket"></i>
            </div>
            {/* <IconButton className="col-4" color="inherit" onMouseDown={(e) => { e.preventDefault(); }}>
              <SearchIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Fab
              size="small"
              color="primary"
              aria-label="add"
              className={classes.fabButton}
              onMouseDown={(e) => { e.preventDefault(); }}
              onClick={() => setRecipeIn(!recipeIn)}
            >
              <AddIcon />
            </Fab>
        <BottomNavigation className={classes.root}>
          <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Calendar" value="calendar" icon={<CalendarIcon />} />
          <BottomNavigationAction label="Search" value="search" icon={<SearchIcon />} />
        </BottomNavigation>

        <SwipeableDrawer anchor="top" open={showMenu} onClose={() => setShowMenu(false)}>
          <List>
            {['Profile', 'Integration', 'Logout'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <SettingsIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>

        <Fade in={!recipeIn} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.paper}>
          <AuthUserContext.Consumer>
            {(authUser) => (authUser ? <MakeShoppingList authUser={authUser} /> : <div>Loading...</div>)}
          </AuthUserContext.Consumer>
          </Paper>
        </Fade>

        {/* <Slide direction="up" in={recipeIn} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.paper}>
            <CreateRecipe handleClose={() => setRecipeIn(!recipeIn)} />
          </Paper>
        </Slide> */}
      </div>
    </div>
  );
};

export default withAuthentication(App);
