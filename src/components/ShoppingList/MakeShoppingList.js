import React, { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  makeStyles,
} from '@material-ui/core';
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
    playIcon: {
      height: 38,
      width: 38,
    },
  }));

  const classes = useStyles();

  return (
    <div>
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
          <div className="col-2 align-items-center block">
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

  // return (
  //   <div className="col mb-5">
  //     <div className="row no-gutters align-items-center mb-5">
  //       <div className="col mr-2 mb-5">
  //         <div className="list-group list-group-flush">
  //           {recipes ? (
  //             recipes.map((recipe) => (
  //                 <button
  //                   key={recipe.id}
  //                   className={`list-group-item list-group-item-action ${selectedRecipes.filter((rec) => rec.name === recipe.name).length > 0 ? 'active' : ''}`}
  //                   onClick={(e) => handleClick(recipe, e)}
  //                   onMouseDown={(e) => { e.preventDefault(); }}
  //                 >
  //                   <div>{recipe.name}</div>
  //                   <small className="ml-2">{recipe.servings}</small>
  //                 </button>
  //             ))) : 'loading...'}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default MakeShoppingList;
