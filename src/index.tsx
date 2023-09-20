import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import AuthContainer from './guards/auth.container';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ReduxProvider store={store}>
    <AuthContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContainer>
  </ReduxProvider>,
);

reportWebVitals();
