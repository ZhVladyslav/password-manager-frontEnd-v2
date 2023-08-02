import React from 'react';
import ReactDOM from 'react-dom/client';

// routs
import { BrowserRouter } from 'react-router-dom';

// redux
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

// App
import App from './App';
import AuthContainer from './auth/AuthContainer';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <AuthContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContainer>
  </ReduxProvider>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
