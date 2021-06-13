
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Login from './screens/Login.jsx';
import Register from './screens/Register.jsx';
import Activate from './screens/Activate.jsx';
import Service from './screens/Service.jsx';
import Home from './screens/Home'
import 'react-toastify/dist/ReactToastify.css';
import '../src/index.css';
import About from './screens/About'
import Laptop from './models/Laptop'
import Led from './models/Led'
import Watch from './models/Watch'
import Drone from './models/Drone'
import Ipad from './models/Ipad'
import Airpods from './models/Airpods.jsx';
import Mobile from './models/Mobile'
import Admin from './screens/Admin'
import Otp from './screens/Otp.jsx'
import ForgetPassword from './screens/ForgetPassword.jsx';
import ResetPassword from './screens/ResetPassword'
import Private from './screens/Private.jsx';
import Cart from './models/components/Cart'
import Payments from './models/components/Payments'
import PaymentStatus from './comps/PaymentStatus';
import HomePage from './Dashboard/pages/HomePage'
import '../src/index.css'



function App() {






  return (
    <>
  
    <BrowserRouter>
     <Switch>
         <Route path='/' exact render={props => <Home {...props} />} />
         <Route path='/dashboard/'  render={props => <HomePage {...props} />} />
         <Route path='/login' exact render={props => <Login {...props} />} />
          <Route path='/otp' exact render={props => <Otp {...props} />} />
         <Route path='/admin' exact render={props => <Admin {...props} />} />
         <Route path='/user' exact render={props => <Private {...props} />} />
         <Route path='/about' exact render={props => <About {...props} />} />
         <Route path='/laptop' exact render={props => <Laptop {...props} />} />
         <Route path='/mobile' exact render={props => <Mobile {...props} />} />
         <Route path='/drone' exact render={props => <Drone {...props} />} />
         <Route path='/ipad' exact render={props => <Ipad {...props} />} />
         <Route path='/watch' exact render={props => <Watch {...props} />} />
         <Route path='/cart' exact render={props => <Cart {...props} />} />
         <Route path='/forget' exact render={props => <ForgetPassword {...props} />} />
         <Route path='/reset/:token' exact render={props => <ResetPassword {...props} />} />
         <Route path='/led' exact render={props => <Led {...props} />} />
         <Route path='/airpod' exact render={props => <Airpods {...props} />} />
         <Route path='/register' exact render={props => <Register {...props} />} />
         <Route path='/paymentme' exact render={props => <Payments {...props} />} />
         <Route path="/payment/status/:paymentId" exact render={props => < PaymentStatus {...props} />} />
         <Route path='/service' exact render={props => <Service {...props} />} />
         <Route path='/activate/:token' exact render={props => <Activate {...props} />} />
         <Redirect to='/' />
    </Switch>
    </BrowserRouter>
        {/* <MessengerCustomerChat
    pageId="113164043777947"
    appId="976657536472023"
    
  /> */}
    </>
  );
}

export default App;
