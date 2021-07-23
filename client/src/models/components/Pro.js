import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useQuery from "../../screens/Query";
import logo from "../../images/realback.png";
import Menu from "../../screens/Menu";
import Footer from "./../../screens/Footer";

const Order = () => {
  const query = useQuery();
  const dogString = query.get("routeName");
  const Price = query.get("price");
  const deive = query.get("device");
  const cartItems = JSON.parse(dogString);
  const status = "orderd";
  // console.log("============>>>>>>>>>>", cartItems);
  const [pro, setPro] = useState(false);
  const [payments, setPayments] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [signature, setSignature] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [payid, setPayid] = useState("helloooox636d7d");
  const totalPrice = Price;
  const [adds, setAdds] = React.useState([]);
  // console.log("=====xxxxx",adds);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    adhar: "",
    pancard: "",

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
    adhar,
    pancard,

    number,
    country,

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
    } else {
      setFormData({ email: "noreply@gmai.com" });
    }
  }, [adds]);

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

  var dt = new Date();
  var subscribe = 3;
  var month = dt.getMonth() + 1 + subscribe;
  var year = dt.getUTCFullYear();
  var day = dt.getUTCDate();

  const expiredate = day + "/" + month + "/" + year;
  const handleChange = (text) => (e) => {
    setFormData({
      ...formData,
      [text]: e.target.value,
    });
  };

  // sachin1245e@gmail.com

  const onSubmits = (event) => {
    event.preventDefault();

    if (
      email &&
      adhar &&
      pancard &&
      name &&
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
        .post(`/api/subscriber`, {
          email,
          name,
          adhar,
          pancard,

          //   date,
          number,
          status: true,
          //   screen,
          country,
          state,
          city,
          pincode,
          Address,
          expiredate,
        })
        .then((res) => {
          setFormData({
            ...formData,
            //  email: '',
            name: "",
            adhar: "",
            pancard: "",

            number: "",
            country: "",
            state: "",
            city: "",
            pincode: "",
            Address: "",
            textChange: "Submitted",
          });

          toast.dark(`Order OTP has been sent to ${res.data._id}`);
        })
        .catch((err) => {
          setFormData({
            ...formData,
            //  email: '',
            name: "",
            adhar: "",
            pancard: "",

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
      <Menu />
      <section>
        <div className="container ">
          <ToastContainer />
          <div className="row   ">
            <form onSubmit={onSubmits} className="contact-form ">
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

                <div className="form-field col-xl-6">
                  <input
                    id="adhar"
                    className="input-text js-input"
                    name="adhar"
                    onChange={handleChange("adhar")}
                    value={adhar}
                    placeholder="adhar"
                    type="text"
                  />
                </div>
                <div className="form-field col-xl-3">
                  <input
                    id="pancard"
                    className="input-text js-input"
                    name="adhar"
                    onChange={handleChange("pancard")}
                    value={pancard}
                    placeholder="PAN"
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
                  >
                    <span class="big-txt">{textChange}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
