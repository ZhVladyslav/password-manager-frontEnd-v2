import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

import AuthContainer from './guards/auth.container';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ReduxProvider store={store}>
    <AuthContainer>
        <App />
    </AuthContainer>
  </ReduxProvider>
);

reportWebVitals();
