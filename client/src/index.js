import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// core styles

// import "./Dashboard/scss/volt.scss";

// // vendor styles
// import "@fortawesome/fontawesome-free/css/all.css";
// import "react-datetime/css/react-datetime.css";
import 'react-toastify/dist/ReactToastify.css';
// import HomePage from './Dashboard/pages/HomePage.js';
// import ChangeRoutes from './ChangeRoutes.js';

// import HomePage from './Dashboard/pages/HomePage';


ReactDOM.render(
  <BrowserRouter>

   {/* <Route path='/' exact render={props => <App {...props} />} /> */}
   {/* <Route path='/dash' exact render={props => <HomePage {...props} />} /> */}
   <App/>
   {/* <HomePage/> */}
   
  </BrowserRouter>,
  document.getElementById('root')
);
