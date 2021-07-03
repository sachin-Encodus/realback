import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { saveCartData } from "../../helpers/auth";
import logo from "../../images/real.jpg";
import { selectFields } from "express-validator/src/select-fields";

export default function Basket(props) {
  const {
    cartItems,
    onAdd,
    hidedata,
    countCartItems,
    showdata,
    onRemove,
    screen,
  } = props;
  const currentdate = new Date();

  const datetime =
    "Last Sync: " +
    currentdate.getDay() +
    "/" +
    currentdate.getMonth() +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  const date = datetime;

  // Function to generate OTP
  function generateOTP() {
    // Declare a digits variable
    // which stores all digits
    var digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }

  const orderOtp = generateOTP();
  console.log("=============>>>>>>bbbbbb", orderOtp);

  console.log("date time", date);

  console.log("xxxxxxxxxxx", cartItems);
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 1;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const discount = 5;
  const totalPrice = itemsPrice;
  const [next, setNext] = useState(false);
  const [payments, setPayments] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [signature, setSignature] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [payid, setPayid] = useState("helloooox636d7d");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    model: "",
    message: "",
    products: "",
    mode: "",
    number: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    Address: "",
    textChange: "COD Payment",
  });

  const decrease = () => {
    toast.dark("item removed");
  };

  // if(cartItems.length !== 0){
  //   const i = cartItems.length

  // if(i+1 > cartItems.length - 1){
  //   toast.dark("item added")
  // }else{
  //    console.log("decreasing");
  // }
  // }else{
  //   console.log("k");
  // }

  useEffect(() => {
    let loggedIn = JSON.parse(localStorage.getItem("user"));
    if (loggedIn !== null) {
      console.log("my email", loggedIn.email);
      setFormData({
        ...formData,
        email: loggedIn.email,
        name: loggedIn.name,
      });

      //  fetch('https://jsonplaceholder.typicode.com/posts')
      // .then(response => response.json())
      // .then(json =>
      //   setFormData({...formData, products:json})
      //  )

      // fetch('https://jsonplaceholder.typicode.com/posts')
      // .then(response => response.json())
      // .then(json =>
      //  console.log("===,,,,,,", json)
      //  )
    } else {
      setFormData({ email: "noreply@gmai.com" });
    }
  }, []);

  console.log(orderId, signature, paymentID, payments);

  // const products = cartItems.map( (order) => {
  //           return(`${order.productName}: ${order.name}.${order.price}.${order.qty}.${order.image} `
  //             ) ;

  //  });
  // console.log(products);

  const {
    email,
    name,
    company,
    model,
    message,
    mode,
    number,
    country,
    products,
    state,
    city,
    pincode,
    Address,
    textChange,
  } = formData;

  const payment = async (_id) => {
    console.log(">>>>>>> id for payment update", _id);
    const res = await axios.get(`/api/payment/${totalPrice}/`);

    console.log("========>>>>>>>>>", res.data.amount);

    if (res.status !== 200) {
      return;
    }

    const options = {
      key: "rzp_live_yim6z2vfc3HOs6", // Enter the Key ID generated from the Dashboard
      amount: res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: res.data.currency,
      name: "Realback",
      description: "paying to realback",
      image: logo,
      order_id: res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
        setPaymentID(response.razorpay_payment_id);
        setOrderId(response.razorpay_order_id);
        setSignature(response.razorpay_signature);
        setPayments(true);
        toast.dark("payment Successfull");
      },
      prefill: {
        name: name,
        email: email,
        contact: number,
      },
      notes: {
        address: _id,
      },
      // "theme": {
      //     "color": "#3399cc"
      // }
    };

    var rzp1 = new window.Razorpay(options);

    rzp1.open();
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
  };

  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value, products: cartItems });
  };
  console.log("===>", products);

  const getData = () => {
    if (company && model) {
      showdata();
    } else {
      toast.dark("please fill company and model no.");
    }
  };

  // sachin1245e@gmail.com

  const onSubmits = (event) => {
    event.preventDefault();

    if (
      email &&
      company &&
      model &&
      message &&
      mode &&
      number &&
      country &&
      state &&
      city &&
      pincode &&
      Address &&
      textChange
    ) {
      setFormData({ ...formData, textChange: "Submitting" });

      axios
        .post(`/api/device`, {
          email,
          name,
          company,
          model,
          message,
          products,
          mode,
          orderOtp,
          date,
          number,
          totalPrice,
          screen,
          country,
          state,
          city,
          pincode,
          Address,
        })
        .then((res) => {
          saveCartData(res, () => {
            setFormData({
              ...formData,
              //  email: '',
              name: "",
              company: "",
              model: "",
              message: "",
              products: "",
              mode: "",
              otp: "",
              number: "",
              country: "",
              state: "",
              city: "",
              pincode: "",
              Address: "",
              textChange: "Submitted",
            });
          });

          toast.dark(`Order OTP has been sent to ${res.data._id}`);
          setPayid(res.data._id);
          if (mode === "online") {
            payment(res.data._id);
          }
        })
        .catch((err) => {
          setFormData({
            ...formData,
            //  email: '',
            name: "",
            company: "",
            model: "",
            message: "",
            products: "",
            mode: "",
            number: "",
            country: "",
            state: "",
            city: "",
            pincode: "",
            Address: "",
            textChange: "submit error",
          });

          toast.error(err.response.data.errors);
        });
    } else {
      toast.error("Please fill all fields");
    }
  };

  //  const setLocalStorage = (key, value) => {
  //     if (window !== 'undefined') {
  //         localStorage.setItem(key, JSON.stringify(value));
  //     }
  // };

  //  const saveCartData = (response, next) => {
  //     // console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);

  //     setLocalStorage('cart',"sachin");
  //     next();
  // };

  return (
    <>
      <div className="container justify-contect-center">
        <ToastContainer />
        <div className="row  justify-content-center align-item-center  ">
          <div className="contact-form   justify-content-center align-item-center">
            <div style={{ display: next === true ? "none" : "block" }}>
              <h1>{countCartItems}</h1>
              <div className="form-field    col-xl-3">
                <input
                  id="city"
                  className="input-text  js-input"
                  type="company"
                  placeholder="company"
                  onChange={handleChange("company")}
                  value={company}
                />
              </div>
              <div className="form-field   col-xl-3">
                <input
                  id="pincode"
                  className="input-text js-input"
                  type="model"
                  placeholder="model"
                  onChange={handleChange("model")}
                  value={model}
                />
              </div>
              <button className="btn" onClick={() => getData()}>
                Next
              </button>
            </div>
            <button
              className="btn"
              style={{ backgroundColor: "#000" }}
              onClick={() => setNext(false)}
            >
              back
            </button>
          </div>

          <div className=" justify-content-center align-item-center">
            <form
              onSubmit={onSubmits}
              className="contact-form   justify-content-center align-item-center"
            >
              <div style={{ display: next === true ? "block" : "none" }}>
                <h1>Give your details </h1>
                <div className="form-field  justify-content-center align-item-center col-xl-3">
                  <input
                    id="city"
                    className="input-text js-input"
                    type="email"
                    placeholder="email"
                    onChange={handleChange("email")}
                    value={email}
                    disabled
                  />
                </div>
                <div class="form-field  col-xl-3">
                  <input
                    onChange={handleChange("name")}
                    class="input-text js-input"
                    placeholder="Full Name"
                    value={name}
                    type="text"
                  />
                </div>

                <div class="form-field col-xl-3">
                  <input
                    onChange={handleChange("number")}
                    class="input-text js-input"
                    value={number}
                    placeholder="Mobile"
                    type="num"
                    maxlength="10"
                  />
                </div>
                <div class="form-field col-xl-3">
                  <input
                    onChange={handleChange("country")}
                    class="input-text js-input"
                    placeholder="Country"
                    type="string"
                    value={country}
                  />
                </div>

                <div className="form-field col-xl-9">
                  <input
                    id="Address"
                    className="input-text js-input"
                    name="message"
                    onChange={handleChange("message")}
                    value={message}
                    placeholder="Please type here if your problem is not mentioned in the above section."
                    type="text"
                  />
                </div>

                <div class="form-field col-xl-3">
                  <input
                    onChange={handleChange("state")}
                    class="input-text js-input"
                    placeholder="State"
                    value={state}
                    type="text"
                  />
                </div>
                <div class="form-field col-xl-3">
                  <input
                    onChange={handleChange("city")}
                    class="input-text js-input"
                    placeholder="City"
                    value={city}
                    type="text"
                  />
                </div>
                <div class="form-field col-xl-3">
                  <input
                    onChange={handleChange("pincode")}
                    class="input-text js-input"
                    placeholder="Pincode"
                    value={pincode}
                    type="number"
                  />
                </div>

                <div class="form-field col-xl-6">
                  <input
                    onChange={handleChange("Address")}
                    class="input-text js-input"
                    placeholder="Address"
                    value={Address}
                    type="text"
                  />
                </div>
                {/* <Link className="btn"  style={{padding:10}}  onClick={() => {showdata(); setNext(true);}} >Next</Link> */}
                <div>
                  <button
                    className="btn"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        mode: "COD",
                      })
                    }
                    style={{ display: "block" }}
                  >
                    {textChange}
                  </button>

                  <button
                    className="btn"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        mode: "online",
                      })
                    }
                  >
                    Payment Now
                  </button>
                </div>
              </div>

              {/* https://signal-clone-f1ebb.web.app/ */}

              <div className="container">
                <div
                  className="row"
                  style={{ display: next === true ? "none" : "flex" }}
                >
                  <div className="col-md-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          justifyContent: "space-between",
                          display: "flex",
                          backgroundColor: "#f5f5f7",
                          fontFamily: "sans-serif",
                          padding: 20,
                          marginTop: 10,
                          borderRadius: 10,
                        }}
                      >
                        <div className="">
                          <img
                            src={item.image}
                            className="image-cart d-flex"
                            alt=""
                          />
                          <p style={{ fontSize: 17, color: "#171717" }}>
                            {item.name}
                          </p>
                        </div>
                        {/* <div className="col-2">{item.name}</div> */}

                        <div className="  ">
                          <a
                            onClick={() => {
                              decrease();
                              onRemove(item);
                            }}
                            style={{
                              width: "30px",
                              height: "40px",
                              fontSize: "25px",
                              borderRadius: "10px",
                              marginLeft: 30,
                              padding: "0 0.4rem",
                              backgroundColor: "#fff",
                            }}
                            className="btn"
                          >
                            x
                          </a>

                          {/* <a  onClick={() => onAdd(item)} style={{width:'30px', height:'40px' , fontSize:"25px", borderRadius:'10px' ,marginLeft:10,  padding:' 0 0.2rem'}} className="btn">+</a> */}
                        </div>

                        <div className=" ">{item.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                  {cartItems.length !== 0 && (
                    <>
                      <div className="col-md-6  p-3">
                        <div
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                            marginBottom: 5,
                          }}
                        >
                          <div className="">Items Price</div>
                          <div className="">{itemsPrice.toFixed(2)}</div>
                        </div>

                        <div
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                            marginBottom: 5,
                          }}
                        >
                          <div>Tax Price</div>
                          <div>{taxPrice.toFixed(2)}</div>
                        </div>

                        <div
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                            marginBottom: 5,
                          }}
                        >
                          <div>Shipping Price</div>
                          <div>{shippingPrice.toFixed(2)}</div>
                        </div>

                        <div
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                            marginBottom: 5,
                          }}
                        >
                          <div>discount</div>
                          <div>{discount.toFixed(2)}</div>
                        </div>

                        <div
                          style={{
                            justifyContent: "space-between",
                            display: "flex",
                            marginBottom: 5,
                          }}
                        >
                          <div>Total Price</div>
                          <div>{totalPrice.toFixed(2)}</div>
                        </div>
                        <hr />
                        <Link
                          onClick={() => {
                            hidedata();
                            setNext(true);
                          }}
                        >
                          <button className="btn" style={{ display: "block" }}>
                            Next
                          </button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// products:[
//       {
//              productName:{
//               type:String,
//               required:true
//            },

//              name:{
//               type:String,
//            },
//            price:{
//               type:String,
//            },

//            image:{
//               type:String,

//            },
//             qty:{
//               type:String,

//            },
//       }
//     ],
