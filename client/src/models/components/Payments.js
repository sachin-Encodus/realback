import React, { useState, useEffect } from "react";
import { getOrder } from "../components/apiCalls";

const App = () => {
  const [values, setValues] = useState({
    amount: 0,
    orderId: "",
    error: "",
    success: false,
  });

  const { amount, orderId, success, error } = values;
  useEffect(() => {
    createOrder();
  }, []);

  const createOrder = () => {
    getOrder().then((response) => {
      if (response.error) {
        setValues({ ...values, error: response.error, success: false });
      } else {
        setValues({
          ...values,
          error: "",
          success: true,
          orderId: response.id,
          amount: response.amount,
        });
      }
    });
  };

  useEffect(() => {
    if (amount > 0 && orderId !== "") {
      showRazoryPay();
    }
  }, [amount]);

  const showRazoryPay = () => {
    const form = document.createElement("form");
    form.setAttribute(
      "action",
      `/api/payment/callback`
    );
    form.setAttribute("method", "POST");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.setAttribute("data-key", "rzp_live_yim6z2vfc3HOs6");
    script.setAttribute("data-amount", amount);
    script.setAttribute("data-name", "Realback");
    script.setAttribute("data-prefill.contact", "9174203189");
    script.setAttribute("data-prefill.email", "babuchauhan878@gmail.com");
    script.setAttribute("data-order_id", orderId);
    script.setAttribute("data-prefill.name", "Lalit Patel");
    script.setAttribute("data-image", `/api/logo`);
    script.setAttribute("data-buttontext", "Pay now");
    document.body.appendChild(form);
    form.appendChild(script);
    const input = document.createElement("input");
    input.type = "hidden";
    input.custom = "Hidden Element";
    input.name = "hidden";
    form.appendChild(input);
  };
  return <div>{amount === 0 && orderId === "" && <h1>Loading...</h1>}</div>;
};

export default App;



// CLIENT_URL
// https://realback4c.herokuapp.com

// EMAIL
// realback4c@gmail.com

// JWT_ACC_ACTIVATE
// accountactivateusingtoverifyemail

// JWT_ACCOUNT_ACTIVATION
// accountactivateusingtoverifygemails

// JWT_RESET_PASSWORD
// accountactivateusingtoverifygemailsachin

// MONGO_URI
// mongodb+srv://realback4c:02may2018@cluster0.fce46.mongodb.net/realback?retryWrites=true&w=majority

// PASS
// bmqkbsakoddlgxgy

// SECRET_KEY
// mynameisrealbackcompanyhellowelcome

// KEY
