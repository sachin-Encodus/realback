
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

import Admin from "./screens/Admin";
import Otp from "./screens/Otp.jsx";
import ForgetPassword from "./screens/ForgetPassword.jsx";
import ResetPassword from "./screens/ResetPassword";
import Private from "./screens/Private.jsx";
import Cart from "./models/components/Cart";
// import Payments from './models/components/Payments'
import PaymentStatus from "./comps/PaymentStatus";
// import HomePage from "./Dash1/Homepage";
import "../src/index.css";
import Terms from "./screens/Terms";
import Payment from "./screens/Payment";
import Device from "./models/components/Device.js";
import Problem from "./models/components/Problem";
import Feedback from "./screens/Feedback";
import Order from "./models/components/Order";
import OrderUpdate from "./screens/OrderUpdate";
// import Facebook from "./screens/Skelaton.jsx";
// import BottomTab from './screens/BottomTab'
import Pro from "./models/components/Pro";
function App() {
  return (
    <>
    
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={(props) => <Home {...props} />} />
          {/* <Route
            path="/dashboard/"
            render={(props) => <HomePage {...props} />}
          /> */}
          <Route path="/feedback" render={(props) => <Feedback {...props} />} />
          <Route path="/device" render={(props) => <Device {...props} />} />
          <Route path="/problem" render={(props) => <Problem {...props} />} />
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route path="/otp" exact render={(props) => <Otp {...props} />} />
          <Route path="/admin" exact render={(props) => <Admin {...props} />} />
          <Route
            path="/user"
            exact
            render={(props) => <Private {...props} />}
          />
          <Route path="/about" exact render={(props) => <About {...props} />} />
          {/* <Route
            path="/laptop"
            exact
            render={(props) => <Laptop {...props} />}
          /> */}
          <Route path="/order" exact render={(props) => <Order {...props} />} />
          {/* <Route
            path="/mobile"
            exact
            render={(props) => <Mobile {...props} />}
          />
          <Route path="/drone" exact render={(props) => <Drone {...props} />} />
          <Route path="/ipad" exact render={(props) => <Ipad {...props} />} />
          <Route path="/watch" exact render={(props) => <Watch {...props} />} /> */}
          <Route path="/cart" exact render={(props) => <Cart {...props} />} />
          <Route path="/pro" exact render={(props) => <Pro {...props} />} />

          {/* <Route
            path="/skeloton"
            exact
            render={(props) => <Facebook {...props} />}
          /> */}
          <Route
            path="/orderupdate"
            exact
            render={(props) => <OrderUpdate {...props} />}
          />
          <Route path="/terms" exact render={(props) => <Terms {...props} />} />
          <Route
            path="/forget"
            exact
            render={(props) => <ForgetPassword {...props} />}
          />
          <Route
            path="/reset/:token"
            exact
            render={(props) => <ResetPassword {...props} />}
          />
          {/* <Route path="/led" exact render={(props) => <Led {...props} />} /> */}

          <Route
            path="/register"
            exact
            render={(props) => <Register {...props} />}
          />
          <Route
            path="/payment/:payds"
            exact
            render={(props) => <Payment {...props} />}
          />
          <Route
            path="/payment/status/:paymentId"
            exact
            render={(props) => <PaymentStatus {...props} />}
          />
          <Route
            path="/service"
            exact
            render={(props) => <Service {...props} />}
          />
          <Route
            path="/activate/:token"
            exact
            render={(props) => <Activate {...props} />}
          />
          <Redirect to="/" />
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
