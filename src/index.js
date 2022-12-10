import React from 'react';
import ReactDOM from 'react-dom/client';
import { Suspense, lazy } from "react";
import Loading from './components/Loading';
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const App = lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  // <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter  basename="/" >
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
