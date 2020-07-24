import React from 'react';

const ToastContext = React.createContext(null);
export const withToast = (Component) => (props) => (
  <ToastContext.Consumer>
    {(toast) => <Component {...props} toast={toast} />}
  </ToastContext.Consumer>
);
export default ToastContext;
