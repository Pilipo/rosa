import React, { useState } from 'react';
import Gravatar from 'react-gravatar';
import {
  AppBar,
  IconButton,
  Toolbar,
  Paper,
  Fade,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import NewListIcon from '@material-ui/icons/CreateNewFolder';
import BackIcon from '@material-ui/icons/ArrowBack';
import ExitIcon from '@material-ui/icons/ExitToApp';
import MergeIcon from '@material-ui/icons/MergeType';
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
      position: 'fixed',
      zIndex: 3,
      bottom: 80,
      right: 12,
      margin: '0 auto',
    },
  }));
  const [recipeIn, setRecipeIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const handleLogOut = () => {
    props.firebase.doSignOut();
  };
  const classes = useStyles();
  return (
    <>
    <AppBar hidden={recipeIn} position="fixed" color="default" className={classes.appBar} >

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
          </Toolbar>
        </AppBar>
        <BottomNavigation showLabels={true} className={classes.root}>
          <BottomNavigationAction
            label="Search"
            value="search"
            icon={<SearchIcon/>}
            onClick={() => {
              setShowSearch(!showSearch);
              window.scrollTo(0, 0);
            }}
            onMouseDown={(e) => { e.preventDefault(); }}
          />
          <BottomNavigationAction
            label="New Recipe"
            value="add"
            icon={recipeIn ? <BackIcon /> : <AddIcon />}
            onClick={() => setRecipeIn(!recipeIn)}
            onMouseDown={(e) => { e.preventDefault(); }}
          />
          <BottomNavigationAction disabled={true} label="New Shopping List" value="list" icon={<NewListIcon />} />
          {/* <BottomNavigationAction disabled={true} label="Calendar" value="calendar" icon={<CalendarIcon />} /> */}
        </BottomNavigation>

        <SwipeableDrawer anchor="top" open={showMenu} onOpen={() => {}} onClose={() => setShowMenu(false)}>
          <List>
          <ListItem button key="Profile">
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button key="Integration">
              <ListItemIcon><MergeIcon /></ListItemIcon>
              <ListItemText primary="Integration" />
            </ListItem>
            <ListItem button key="Logout" onClick={handleLogOut}>
              <ListItemIcon><ExitIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </SwipeableDrawer>

        <Fade in={!recipeIn} mountOnEnter unmountOnExit>
          <Paper elevation={0} className={classes.paper}>
          <AuthUserContext.Consumer>
            {(authUser) => <MakeShoppingList showSearch={showSearch} authUser={authUser} />}
          </AuthUserContext.Consumer>
          </Paper>
        </Fade>

        <Fade in={recipeIn} mountOnEnter unmountOnExit>
          <Paper elevation={0} className={classes.paper}>
            <CreateRecipe handleClose={() => setRecipeIn(!recipeIn)} />
          </Paper>
        </Fade>
        </>
  );
};

export default withAuthentication(App);
