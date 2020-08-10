import React, { useContext } from 'react';

const LogoutView = ({ onClick, context }) => {
  const user = useContext(context);
  return (
    <div>
      <span>You are logged in as {user.email}</span>
      <button onClick={onClick}>Logout</button>
    </div>
  );
};

export default LogoutView;
