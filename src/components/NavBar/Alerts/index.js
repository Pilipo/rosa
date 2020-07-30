import React from 'react';

const Alerts = () => (
<li className="nav-item dropdown no-arrow mx-1">
        <a className="nav-link dropdown-toggle" href="/#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-clipboard-list fa-fw"></i>
          <span className="badge badge-danger badge-counter">4</span>
        </a>
        <div name="MenuAlertList" className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
          <h6 className="dropdown-header">
            Your Menu
          </h6>
          {/* MenuAlertGroup starts here */}
          <a className="dropdown-item d-flex align-items-center" href="/#">
            <div className="mr-3">
              <div className="icon-circle bg-success">
                <i className="fas fa-coffee text-white"></i>
              </div>
            </div>
            <div>
              <div className="small text-gray-500">Breakfast</div>
              <ul className="list-unstyled">
                <li>Quiche</li>
                <li>Biscuits</li>
              </ul>
            </div>
          </a>
          {/* MenuAlertGroup ends here */}
          {/* MenuAlertGroup starts here */}
          <a className="dropdown-item d-flex align-items-center" href="/#">
            <div className="mr-3">
              <div className="icon-circle bg-success">
                <i className="fas fa-hamburger text-white"></i>
              </div>
            </div>
            <div>
              <div className="small text-gray-500">Lunch</div>
              <ul className="list-unstyled">
                <li>PB and J</li>
              </ul>
            </div>
          </a>
          {/* MenuAlertGroup ends here */}
          {/* MenuAlertGroup starts here */}
          <a className="dropdown-item d-flex align-items-center" href="/#">
            <div className="mr-3">
              <div className="icon-circle bg-success">
                <i className="fas fa-utensils text-white"></i>
              </div>
            </div>
            <div>
              <div className="small text-gray-500">Dinner</div>
              <ul className="list-unstyled">
                <li>Sushi Bowl</li>
              </ul>
            </div>
          </a>
          {/* MenuAlertGroup ends here */}
          <a className="dropdown-item text-center small text-gray-500" href="/#">Show the List</a>
        </div>
      </li>);

export default Alerts;
