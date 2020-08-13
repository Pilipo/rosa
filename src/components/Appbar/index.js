import React from 'react';
import './index.scss';

const Appbar = ({ context, onSearchClick, onAddRecipeClick }) => (
  <nav className="navbar fixed-bottom navbar-light bg-white shadow-lg border-top">
    <div className="row no-gutter w-100">
      <div className="col-4 text-secondary">
        <button onClick={onSearchClick} className="btn navbar-brand w-100" >
          <i className="fas fa-sm fa-search text-primary"></i>
        </button>
        <div className="text-center"><small>Search</small></div>
      </div>
      <div className="col-4 text-secondary">
        <button onClick={onAddRecipeClick} className="btn navbar-brand w-100" >
          <i className="fas fa-sm fa-plus-square text-primary"></i>
        </button>
        <div className="text-center"><small>New Recipe</small></div>
      </div>
      <div className="col-4 text-secondary">
        <button className="btn navbar-brand w-100" >
          <i className="fas fa-sm fa-clipboard-list text-primary"></i>
        </button>
        <div className="text-center"><small>Go Shopping</small></div>
      </div>
    </div>
  </nav>
);

export default Appbar;
