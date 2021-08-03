import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "../../realback work/css/style.css";
import useQuery from "../../screens/Query";
import logo from "../../images/realback.png";
import Menu from "../../screens/Menu";
import Footer from "./../../screens/Footer";
import Box from "@material-ui/core/Box";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Logo from "../../images/realback.png";
import { BiArrowBack } from "react-icons/bi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "100%",
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  overflow: "scroll",
  p: 4,
};

const Order = () => {
  const query = useQuery();
  const dogString = query.get("routeName");
  const Price = query.get("price");
  const device = query.get("device");
  const cartItems = JSON.parse(dogString);
  const status = "orderd";
  console.log("============>>>>>>>>>>", Price, device);
  const [prouser, setProuser] = useState(false);

  const [payments, setPayments] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [signature, setSignature] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [agreemnet, setAgreemnet] = useState(false);
  const totalPrice = Price;
  const [adds, setAdds] = React.useState([]);
  // console.log("=====xxxxx",adds);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var dt = new Date();
  var subscribe = 15;
  var month = dt.getMonth() + 1;
  var year = dt.getUTCFullYear();
  var day = dt.getUTCDate();

  const date = day + " " + monthNames[dt.getMonth()] + ", " + year;
  const expiredate =
    day + subscribe + " " + monthNames[dt.getMonth()] + ", " + year;
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const paylater = () => {
    setProuser(true);
  };
  const handleOpen = () => {
    console.log("call open ");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
  useEffect(() => {
    let loggedIn = JSON.parse(localStorage.getItem("user"));
    if (loggedIn !== null) {
      setFormData({
        ...formData,
        email: loggedIn.email,
      });

      axios
        .get(`/api/cart/${loggedIn.email}`)
        .then(({ data }) => setAdds(data.user[0]))
        .catch((err) => {
          console.log(err);
        });
      // console.log("========>>>>>>>>sssssss", adds);
      if (adds !== undefined) {
        // console.log("calling");
        setFormData({
          ...formData,
          email: adds.email,
          name: adds.name,
          country: adds.country,
          number: adds.number,
          city: adds.city,
          state: adds.state,
          pincode: parseInt(adds.pincode),
          Address: adds.Address,
        });
      }

      // setFormData({
      //   ...formData,
      //   name: loggedIn.name,
      //   email: loggedIn.email,
      // });
    } else {
      setFormData({ email: "noreply@gmai.com" });
    }
  }, [adds]);

  // useEffect(() => {
  //   let isMounted = true;
  //   addsdata();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [adds]);

  // const addsdata = () => {
  //   axios
  //     .get(`/api/cart/${email}`)
  //     .then(({ data }) => setAdds(data.user[0]))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // console.log("========>>>>>>>>sssssss", adds);
  //   if (adds !== undefined) {
  //     setFormData({
  //       ...formData,
  //       name: adds.name,
  //       country: adds.country,
  //       number: adds.number,
  //       city: adds.city,
  //       state: adds.state,
  //       pincode: parseInt(adds.pincode),
  //       Address: adds.Address,
  //     });
  //   }
  // };

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
  const payment = async (_id) => {
    console.log(">>>>>>> id for payment update", _id);
    const res = await axios.get(`/api/payment/${totalPrice}/`);

    // console.log("========>>>>>>>>>", res.data.amount);

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
    setFormData({
      ...formData,
      [text]: e.target.value,
      products: cartItems,
      company: device,
    });
  };
  // console.log("===>", products);
  // sachin1245e@gmail.com

  const onSubmits = (event) => {
    event.preventDefault();

    if (
      email &&
      company &&
      //   model &&
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
          status,
          date,
          number,
          totalPrice,
          expiredate,
          country,
          state,
          city,
          pincode,
          Address,
        })
        .then((res) => {
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

          toast.dark(`Order OTP has been sent to ${res.data._id}`);
          // setPayid(res.data._id);
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

  return (
    <div>
      <Menu paylater={paylater} />
      <section>
        <div className="container ">
          <ToastContainer />
          <div className="row   ">
            <form onSubmit={onSubmits} className="contact-form ">
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Box sx={style}>
                  <div className={style}>
                    <BiArrowBack
                      onClick={handleClose}
                      color="black"
                      size={25}
                    />
                    <div class="agreement">
                      <div class="realback-logo">
                        <img src={Logo} alt="7" />
                      </div>

                      <div class="personal-info">
                        <p>Pay later Date: {date}</p>
                        <p>Money Deposit date: {expiredate}</p>
                        <br />
                        <span>
                          {name}{" "}
                          <img
                            style={{ width: 18, height: 18 }}
                            src="https://res.cloudinary.com/realback/image/upload/v1627900773/b1_x8lghx.png"
                            alt="b"
                          />{" "}
                          <br />
                          <br />
                          {Address} , {pincode} , {city} , {state} , {country}
                        </span>
                      </div>
                      <br />
                      <div class="subject-msg">
                        <p>Dear Sir/Madam,</p>
                        <h4>
                          Sub: Sanction of Pay later method of Rs. {Price}
                        </h4>
                        <p class="details">
                          with refrence to your application dated on {date} for
                          availing the pay later amount of
                          {Price}
                          we are pleased to sanction same subject to the term
                          and condition as metioned below and in the pay later
                          agreement to be executed.
                        </p>
                      </div>
                      <div class="loan-desc">
                        <table>
                          <tbody>
                            <tr>
                              <td data-column="First Name">Company Name</td>
                              <td data-column="Last Name">{device}</td>
                            </tr>
                            <tr>
                              <td data-column="First Name">Device service</td>
                              <td data-column="Last Name">
                                {cartItems.map((item) => {
                                  return item.name;
                                })}
                              </td>
                            </tr>

                            <tr>
                              <td data-column="First Name">Total amount</td>
                              <td data-column="Last Name">{Price}</td>
                            </tr>
                            <tr>
                              <td data-column="First Name">Duration of loan</td>
                              <td data-column="Last Name">15 Days</td>
                            </tr>
                            <tr>
                              <td data-column="First Name">
                                Last date of paymnet
                              </td>
                              <td data-column="Last Name">{expiredate}</td>
                            </tr>
                            <tr>
                              <td data-column="First Name">
                                intrest after payment date
                              </td>
                              <td data-column="Last Name">
                                Rs. 16 per day on delayed/non-payment of pay
                                later service
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="other-desc">
                        <p>
                          * payable in the manner as mentioned in the agreement
                          to be executed
                        </p>
                        <p class="long_desc">
                          You can only have the advantage of pay later service
                          if you pay on time However if you fail to pay there
                          will a due of Rs. 16 per day and you can't have the
                          pay later service till you repay the amount.
                        </p>
                        <h1>
                          We look forward to availing of the sanctioned loan and
                          assure you our best service.
                          <br />
                          <br />
                          Thanking You,
                        </h1>
                      </div>
                      <div class="company-details">
                        <h2>For Realback Financial services private limited</h2>
                        <img
                          src="https://res.cloudinary.com/realback/image/upload/v1627907057/9a4b5115e7fe50553de4db605d0889ef_c8oktg.png"
                          alt="3"
                          class="sign-img"
                        />
                        <p>Authorized Signatory</p>
                      </div>
                      <div class="contact">
                        <h3>Contact Us</h3>
                        <p>
                          Mobile No. +9174203189 ,+919340421225, +917747882423
                        </p>
                        <p>Email: realback4c@gmail.com</p>
                      </div>
                      <button
                        style={{ padding: 18, marginBottom: 60 }}
                        class="app-btn blu flex vert col-md-4 "
                        onClick={() => {
                          setAgreemnet(true);
                          handleClose();
                        }}
                      >
                        <span class="big-txt">Agree</span>
                      </button>
                    </div>
                  </div>
                </Box>
              </Modal>
              <div>
                <h1>Give your details </h1>
                <div className="form-field  col-xl-3">
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
                <div
                  className=" col-xl-6"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    style={{ padding: 20 }}
                    class="app-btn blu flex vert  "
                    onClick={() =>
                      setFormData({
                        ...formData,
                        mode: "COD",
                      })
                    }
                  >
                    <span class="big-txt">{textChange}</span>
                  </button>

                  <button
                    style={{ padding: 20 }}
                    class="app-btn blu flex vert  "
                    onClick={() =>
                      setFormData({
                        ...formData,
                        mode: "online",
                      })
                    }
                  >
                    <span class="big-txt"> Payment Now</span>
                  </button>
                  {prouser ? (
                    agreemnet ? (
                      <button
                        style={{ padding: 20 }}
                        class="app-btn blu flex vert  "
                        onClick={() =>
                          setFormData({
                            ...formData,
                            mode: "paylater",
                          })
                        }
                      >
                        <span class="big-txt">Pay later</span>
                      </button>
                    ) : (
                      <div
                        to=""
                        style={{ padding: 20 }}
                        class="app-btn blu flex vert  "
                        onClick={handleOpen}
                      >
                        <span class="big-txt">Agree term</span>
                      </div>
                    )
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};;

export default Order;
