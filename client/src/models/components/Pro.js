import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useQuery from "../../screens/Query";
import logo from "../../images/realback.png";
import Menu from "../../screens/Menu";
// import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { FcApproval } from "react-icons/fc";
import Box from "@material-ui/core/Box";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  // backgroundColor: theme.palette.background.paper,
  // border: "none",
  // outline: "none",
  // boxShadow: theme.shadows[5],
  // padding: theme.spacing(2, 4, 3),
  // width: "50%",
  // borderRadius: 10,
};


const Order = () => {
  const query = useQuery();
  const dogString = query.get("routeName");
  const Price = query.get("price");
  const deive = query.get("device");
  const cartItems = JSON.parse(dogString);
  const status = "orderd";
  // console.log("============>>>>>>>>>>", cartItems);
  const [pro, setPro] = useState(true);
  const [payments, setPayments] = useState("");
  const [orderId, setOrderId] = useState("");
  const [signature, setSignature] = useState("");
  const [paymentID, setPaymentID] = useState("");
  const [adhaarImg, setAdhaarImg] = useState(
    "https://blogmedia.evbstatic.com/wp-content/uploads/engineering/2018/08/09141147/Flexible-Reusable-React-File-Uploader.png"
  );
  const [adhaarBackImg, setAdhaarBackImg] = useState(
    "https://blogmedia.evbstatic.com/wp-content/uploads/engineering/2018/08/09141147/Flexible-Reusable-React-File-Uploader.png"
  );
  const [panImg, setPanImg] = useState(
    "https://blogmedia.evbstatic.com/wp-content/uploads/engineering/2018/08/09141147/Flexible-Reusable-React-File-Uploader.png"
  );
  const totalPrice = "99";
  const [adds, setAdds] = React.useState([]);
  // console.log("=====xxxxx",adds);
  // const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    console.log("call open ");
    setOpen(true);
  };
  const ProfileAprooved = (data) => {
    console.log("call open ", data);
    setPayments(data);
    setPro(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const adhaarUpload = async (e) => {
    const data = new FormData();

    data.append("file", adhaarImg);
    data.append("upload_preset", "lntsiwkj");
    data.append("clouad_name", "realback");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/realback/image/upload",
      {
        data,
      }
    );

    console.log(response);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setAdhaarImg(reader.result);
    //   }
    // };
    // reader.readAsDataURL(e.target.files[0]);
    // console.log(reader);
  };

  const adhaarBackUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAdhaarBackImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const panUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPanImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
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
    textChange: "Submit",
  });

  const {
    email,

    adhar,
    pancard,

    number,

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

  const payment = async () => {
    console.log(">>>>>>> id for payment update");
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
        name: payments.name,
        email: payments.email,
        contact: payments.number,
      },
      notes: {
        address: "",
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
  console.log(adhar[0]);
  // sachin1245e@gmail.com

  const onSubmits = (event) => {
    event.preventDefault();

    if (email && adhar && pancard && number && textChange) {
      setFormData({ ...formData, textChange: "Submitting" });

      axios
        .post(`/api/subscriber`, {
          email,

          adhar,
          pancard,

          //   date,
          number,
          status: "request",
          //   screen,

          expiredate,
        })
        .then((res) => {
          setFormData({
            ...formData,
            //  email: '',

            adhar: "",
            pancard: "",

            number: "",

            textChange: "Submitted",
          });
          handleOpen();
          toast.dark(`Order OTP has been sent to ${res.data._id}`);
        })
        .catch((err) => {
          setFormData({
            ...formData,
            //  email: '',

            adhar: "",
            pancard: "",

            number: "",

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
      <Menu handleOpen={handleOpen} ProfileAprooved={ProfileAprooved} />
      <section>
        <div className="container ">
          <ToastContainer />
          <div>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              // className={modal}
              open={open}
              // onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Box sx={style}>
                <div className={style}>
                  <h2 id="transition-modal-title">Request Submitted</h2>
                  <p id="transition-modal-description">
                    Your profile request has been Submitted Successfully Our
                    team will contact you within next 15 minutes. for your
                    profile approval process and after that you will receive a
                    mail from Realback.
                  </p>
                  <Link
                    style={{
                      backgroundColor: "#c3ffc3",
                      padding: 10,
                      borderRadius: 10,
                      fontWeight: "bold",
                    }}
                    to="/"
                  >
                    Go back
                  </Link>
                </div>
              </Box>
            </Modal>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              // className={modal}
              open={pro}
              // onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Box sx={style}>
                <div className={style}>
                  <h2 id="transition-modal-title">
                    Profile Aprooved <FcApproval />
                  </h2>
                  <p id="transition-modal-description">
                    Hey! Congrates🎉🎉🎉 your profile have been approved now you
                    can buy our plan to become a Realback member.
                    <button
                      onClick={() => payment()}
                      style={{ padding: 15, float: "right" }}
                      class="app-btn blu flex vert  "
                    >
                      <span class="big-txt">{textChange}</span>
                    </button>
                  </p>
                </div>
              </Box>
            </Modal>
          </div>

          <div className="row   ">
            <div className="col-md-4">
              <img src={adhaarImg} alt="" id="img" className="img-fluid" />
              <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input1"
                onChange={(e) => setAdhaarImg(e.target.files[0])}
              />
              <button onClick={adhaarUpload}>submit</button>
              <label className="image-upload" htmlFor="input1">
                Upload adhaar front
              </label>
            </div>
            <div className="col-md-4">
              <img src={adhaarBackImg} alt="" id="img" className="img-fluid" />
              <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input2"
                onChange={adhaarBackUpload}
              />
              <label className="image-upload" htmlFor="input2">
                Upload adhaar back
              </label>
            </div>
            <div className="col-md-4">
              <img src={panImg} alt="" id="img" className="img-fluid" />
              <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input3"
                onChange={panUpload}
              />
              <label className="image-upload" htmlFor="input3">
                Upload adhaar pan
              </label>
            </div>

            <form onSubmit={onSubmits} className="contact-form ">
              <div>
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

                {/* <div className="form-field col-xl-6">
                  <input
                    id="adhar"
                    className="input-text js-input"
                    name="adhar"
                    onChange={handleChange("adhar")}
                    value={adhar}
                    placeholder="adhar"
                    type="file"
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
                    type="file"
                  />
                </div> */}

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
