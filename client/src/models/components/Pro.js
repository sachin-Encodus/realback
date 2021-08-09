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
import { TextField, Stack } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

import CircularProgress from "@material-ui/core/CircularProgress";
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
  const [pro, setPro] = useState(false);
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
  const [loading, setloading] = useState(false);
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

  const adhaarUpload = (e) => {
    const files = e.target.files;
    const imagedata = new FormData();
    setloading(true);
    imagedata.append("file", files[0]);
    imagedata.append("upload_preset", "tiklma54");

    imagedata.append("upload_preset", "tiklma54");
    fetch("  https://api.cloudinary.com/v1_1/realback/image/upload", {
      method: "post",
      body: imagedata,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.url);
        setAdhaarImg(data.url);
        setloading(false);
      })
      .catch((err) => console.log(err));

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
    const files = e.target.files;
    const imagedata = new FormData();
    setloading(true);
    imagedata.append("file", files[0]);
    imagedata.append("upload_preset", "tiklma54");

    imagedata.append("upload_preset", "tiklma54");
    fetch("  https://api.cloudinary.com/v1_1/realback/image/upload", {
      method: "post",
      body: imagedata,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.url);
        setAdhaarBackImg(data.url);
        setloading(false);
      })
      .catch((err) => console.log(err));
  };
  const panUpload = (e) => {
    const files = e.target.files;
    const imagedata = new FormData();
    setloading(true);
    imagedata.append("file", files[0]);
    imagedata.append("upload_preset", "tiklma54");

    imagedata.append("upload_preset", "tiklma54");
    fetch("  https://api.cloudinary.com/v1_1/realback/image/upload", {
      method: "post",
      body: imagedata,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.url);
        setPanImg(data.url);
        setloading(false);
      })
      .catch((err) => console.log(err));
  };
  const [formData, setFormData] = useState({
    email: "",

    number: "",

    textChange: "Submit",
  });

  const {
    email,

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

  // sachin1245e@gmail.com

  const onSubmits = (event) => {
    event.preventDefault();

    if (email && number && textChange) {
      setFormData({ ...formData, textChange: "Submitting" });

      axios
        .post(`/api/subscriber`, {
          email,

          adhaarImg,
          adhaarBackImg,
          panImg,

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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
                Your profile request has been Submitted Successfully Our team
                will contact you within next 15 minutes. for your profile
                approval process and after that you will receive a mail from
                Realback.
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
                Hey! Congrates🎉🎉🎉 your profile have been approved now you can
                buy our plan to become a Realback member.
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
      <section>
        <div className="container probox">
          <ToastContainer />

          <div style={{ marginTop: 20, marginBottom: 20 }}>
            <h3 style={{ textAlign: "center", fontSize: 30 }}>
              Upload your documents
            </h3>
          </div>
          <div className="row">
            <div className="col-md-4">
              <img src={adhaarImg} alt="" id="img" className=" upload  mb-4" />
              <input
                type="file"
                id="input1"
                accept="image/*"
                name="image-upload"
                onChange={adhaarUpload}
              />

              <label className="image-upload mb-4" htmlFor="input1">
                Upload adhaar front
              </label>
            </div>

            <div className="col-md-4 ">
              <img
                src={adhaarBackImg}
                alt=""
                id="img"
                className="mb-4 upload"
              />
              <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input2"
                onChange={adhaarBackUpload}
              />
              <label className="image-upload mb-4" htmlFor="input2">
                Upload adhaar back
              </label>
            </div>
            <div className="col-md-4 ">
              <img src={panImg} alt="" id="img" className="mb-4 upload" />
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
            <div className="form-field  col-md-4 "></div>
            <div className="form-field mt-5 mb-5 col-md-4 pl-4 pr-4">
              <form onSubmit={onSubmits}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Number"
                    variant="outlined"
                    type="number"
                    onChange={handleChange("number")}
                    value={number}
                    maxlength={10}
                  />
                  {/* <div class="form-field  col-xl-3">
                  <input
                    onChange={handleChange("number")}
                    class="input-text js-input"
                    value={number}
                    placeholder="Mobile"
                    type="num"
                    maxlength="10"
                  />
                </div> */}

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
                  {/* <div
                  className=" col-xl-6"
                  style={{ display: "flex", justifyContent: "space-between" }}
                > */}
                  <LoadingButton
                    style={{
                      backgroundColor: "#0070f3",
                      padding: 10,
                      outline: "none",
                      boarder: "none",
                    }}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {textChange}
                  </LoadingButton>
                </Stack>
                {/* <button style={{ padding: 20 }} class="app-btn blu flex vert  ">
                  <span class="big-txt">{textChange}</span>
                </button> */}
                {/* </div> */}
              </form>
            </div>
            <div className="form-field  col-md-4 "></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
