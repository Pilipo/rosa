import React from 'react';
import './index.scss';

const Appbar = ({ context, onClick }) => (
  <nav className="navbar fixed-bottom navbar-light bg-white shadow-lg border-top">
    <div className="row no-gutter w-100">
      <div className="col-4 text-secondary">
        <button className="btn navbar-brand w-100" >
          <i className="fas fa-sm fa-search text-primary"></i>
        </button>
        <div className="text-center"><small>Search</small></div>
      </div>
      <div className="col-4 text-secondary">
        <button className="btn navbar-brand w-100" >
          <i className="fas fa-sm fa-plus-square text-primary"></i>
        </button>
        <div className="text-center"><small>Recipe</small></div>
      </div>
      <div className="col-4 text-secondary">
        <button className="btn navbar-brand w-100" >
          <i className="fas fa-sm fa-clipboard-list text-primary"></i>
        </button>
        <div className="text-center"><small>Shopping</small></div>
      </div>
    </div>
  </nav>
);

export default Appbar;
