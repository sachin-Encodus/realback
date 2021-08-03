import React, { useState } from 'react';
// import authSvg from '../assests/forget.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import authSvg2 from "../images/password.webp";
import { Stack, Button, TextField, Typography } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

const ForgetPassword = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    textChange: "Submit",
  });
  const { email, textChange } = formData;
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .put("/api/forgotpassword", {
          email,
        })
        .then((res) => {
          setFormData({
            ...formData,
            email: "",
          });
          toast.success(`Please check your email`);
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.error);
        });
    } else {
      toast.error("Please fill all fields");
    }
  };
  return (
    <>
      <div className="">
        <div className="container  ">
          <ToastContainer />
          <div className="row justify-content-center align-items-center ">
            <div className="col-md-6">
              <div className="">
                <img src={authSvg2} className="img-fluid" alt="3" />
              </div>
            </div>
            <div className="col-md-6  ">
              <form onSubmit={handleSubmit}>
                <h1 className="mb-5">Forget Password </h1>
                <Stack spacing={2}>
                  {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                    Hi, Welcome Back
                  </Typography> */}
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    onChange={handleChange("email")}
                    value={email}
                  />

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
              </form>
            </div>
          </div>
          <div className="p-5 ">
            <p className="text-center" style={{ color: "black" }}>
              * By logging in, you agree to our{" "}
              <a href="#">
                <span style={{ color: "blue" }}>Terms of Use</span>
              </a>{" "}
              and to receive Realback emails & updates and acknowledge that you
              read our{" "}
              <a href="#">
                {" "}
                <span style={{ color: "blue" }}>Privacy Policy</span>
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
