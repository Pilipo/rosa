import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import Toast, { ToastContext } from './components/Toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/sb-admin-2.css';

ReactDOM.render(
  <ToastContext.Provider value={new Toast()}>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </ToastContext.Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
