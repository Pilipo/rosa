import React from 'react';

import { withToast } from '../Toast';
import ShoppingList from '../ShoppingList';

const Landing = (props) => {
  const click = () => {
    // console.log('landing props', props);
    props.toast
      .makeToast('New recipe created! Let\'s add ingredients and methods!');
  };
  return (
    <div>Build the list</div>
  );
};

export default withToast(Landing);
