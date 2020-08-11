import React, { useContext } from 'react';
import Gravatar from 'react-gravatar';
import './index.scss';

const NavBar = ({ context, onClick }) => {
  const user = useContext(context);
  return (
  <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow navbar-fixed-top">
    <a href="/" className="sidebar-brand d-flex align-items-center justify-content-center">
      <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-2x fa-shopping-basket"></i>
      </div>
    </a>

    <ul className="navbar-nav ml-auto">
    {/* <Alerts /> */}
    <div className="topbar-divider d-none d-sm-block"></div>
    <li className="nav-item dropdown no-arrow">
        <a className="nav-link dropdown-toggle" href="/#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.username ? user.username : user.email}</span>
          <Gravatar className="img-profile rounded-circle" alt="" email={user.email} />
        </a>
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <button className="dropdown-item" ><i className="fas fa-info-circle fa-sm fa-fw mr-2 text-gray-400"></i>About</button>
          <button onClick={onClick} className="dropdown-item" ><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>Logout</button>
        </div>
      </li>
  </ul>
  </nav>
  );
};

export default NavBar;
