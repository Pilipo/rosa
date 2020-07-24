import React from 'react';

import { withToast } from '../Toast';

const Landing = (props) => {
  const click = () => {
    // console.log('landing props', props);
    props.toast
      .makeToast('New recipe created! Let\'s add ingredients and methods!');
  };
  return (
    <div>
      <h1>Landing Page</h1>
      <p>This page is visible to all visitors.</p>
      <button onClick={click}>test</button>
    </div>
  );
};

export default withToast(Landing);
