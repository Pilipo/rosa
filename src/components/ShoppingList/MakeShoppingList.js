import React from 'react';

function MakeShoppingList() {
  return (
    <div className="col-xl-4 col-lg-6 mb-4">
      <div className="card border-left-success shadow h-100">
        <div className="card-header py-3">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <h6 className="m-0 font-weight-bold text-primary">Make a shopping list</h6>
            </div>
            <div className="col-auto">
              <i className="fas fa-list fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeShoppingList;
