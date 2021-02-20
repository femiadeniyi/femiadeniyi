import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

console.log(process.env.REACT_APP_SITE,"d")
function getApp() {
    return lazy(() => import(`./${process.env.REACT_APP_SITE}/App.tsx`))
}

const App = getApp()

ReactDOM.render(
  <React.StrictMode>
      <Suspense fallback={<div>Loading... </div>}>
          <App />
      </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
