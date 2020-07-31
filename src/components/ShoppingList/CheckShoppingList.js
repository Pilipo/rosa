import React from 'react';

function CheckShoppingList() {
  return (
    <div className="col-xl-4 col-lg-6 mb-4">
      <div className="card border-left-success shadow h-100">
        <div className="card-header py-3">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <h6 className="m-0 font-weight-bold text-primary">Check off the list</h6>
            </div>
            <div className="col-auto">
              <i className="fas fa-tasks fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <li>list of selected recipes</li>
              <li>recipes are checkable</li>
              <li>confirm button for complete (deletes the list)</li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckShoppingList;
