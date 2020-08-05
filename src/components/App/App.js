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
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingIcon from '@material-ui/icons/ShoppingBasket';
import SearchIcon from '@material-ui/icons/Search';
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
      zIndex: 1,
      top: -46,
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
        <AppBar hidden={recipeIn} position="sticky" color="white" className={classes.appBar} >

          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onMouseDown={(e) => { e.preventDefault(); }}
              onClick={() => setShowMenu(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Create List
            </Typography>
            <Fab
              size="small"
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

        <BottomNavigation className={classes.root}>
          <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
        </BottomNavigation>

        <SwipeableDrawer anchor="bottom" open={showMenu} onClose={() => setShowMenu(false)}>
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
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

        <Slide direction="up" in={recipeIn} mountOnEnter unmountOnExit>
          <Paper elevation={4} className={classes.paper}>
            <CreateRecipe handleClose={() => setRecipeIn(!recipeIn)} />
          </Paper>
        </Slide>
      </div>
    </div>
  );
};

export default withAuthentication(App);
