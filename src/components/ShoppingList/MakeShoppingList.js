import React, { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  makeStyles,
  InputBase,
  Paper,
  IconButton,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { ToggleButton } from '@material-ui/lab';
import CheckIcon from '@material-ui/icons/Check';
import recipeHelper from '../../helpers/data/recipeData';
import listHelper from '../../helpers/data/listData';
import './index.scss';

const MakeShoppingList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    recipeHelper.getRecipes(searchPhrase)
      .then((data) => setRecipes(data));
    selectedRecipes.length > 0 && listHelper.setList(props.authUser.uid, selectedRecipes);
  }, [searchPhrase, props.authUser.uid, selectedRecipes]);

  useEffect(() => {
    listHelper.getList(props.authUser.uid)
      .then((data) => data && setSelectedRecipes(data.recipes));
  }, [props.authUser.uid]);

  const handleChange = (e) => {
    setSearchPhrase(e.target.value);
  };

  const handleClick = (recipe, e) => {
    if (selectedRecipes.filter((selectedRecipe) => selectedRecipe.name === recipe.name).length) {
      setSelectedRecipes(selectedRecipes.filter((selectedRecipe) => selectedRecipe.name !== recipe.name));
    } else {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
    e.preventDefault();
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      marginBottom: 6,
    },
    wrapper: {
      marginBottom: 86,
      marginTop: 66,
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 88,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {props.showSearch
      && <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search Recipes"
          inputProps={{ 'aria-label': 'search recipes' }}
          onChange={handleChange}
          value={searchPhrase}
          autoFocus
        />
        <IconButton
          className={classes.iconButton}
          onClick={() => setSearchPhrase('')}
          onMouseDown={(e) => { e.preventDefault(); }}
        >
          {searchPhrase ? <BackspaceIcon /> : <SearchIcon />}
        </IconButton>
        </Paper>}
    {recipes ? (
      recipes.map((recipe) => (
        <Card className={classes.root}
          key={recipe.id}
        >
          <CardMedia
            className={classes.cover}
            image="http://via.placeholder.com/88.png"
            title="Live from space album cover"
          />
          <div className="col-7">
          <CardContent className={classes.content}>
            <div>{recipe.name}</div>
            <small className="ml-2">{recipe.servings}</small>
          </CardContent>
          </div>
          <div className="col-2 align-items-center d-flex">
            <ToggleButton
              onChange={(e) => handleClick(recipe, e)}
              selected={ selectedRecipes.filter((rec) => rec.name === recipe.name).length > 0 }
              value="check"
            >
              <CheckIcon />
            </ToggleButton>
          </div>
        </Card>
      ))) : 'loading...'}
      </div>
  );
};

export default MakeShoppingList;
