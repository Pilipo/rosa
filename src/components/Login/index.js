import React, { useState } from 'react';
import './index.scss';

const LoginView = ({ onClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="signin vh-100">
    <form className="form-signin">
      <div className="text-center mb-4">
        <i className="fas fa-4x text-primary fa-shopping-basket"></i>
      </div>
      <h1 className="h3 mb-3 font-weight-normal text-center">Welcome! Sign in</h1>
      <label htmlFor="inputEmail" className="sr-only">Email address</label>
      <input onChange={(e) => setUsername(e.target.value)} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
      <label htmlFor="inputPassword" className="sr-only">Password</label>
      <input onChange={(e) => setPassword(e.target.value)} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
      <button onClick={(e) => {
        e.preventDefault();
        onClick(username, password);
      }}
      className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <hr />
      <button onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="btn btn-lg btn-danger btn-block"><i className="fab fa-google-plus"></i> Google</button>
    </form>
    </div>
  );
};

export default LoginView;
