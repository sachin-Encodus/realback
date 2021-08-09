import React, { useState, useEffect } from 'react';
// import authSvg from '../assests/reset.svg';
import { ToastContainer, toast } from 'react-toastify';
import authSvg2 from "../images/illustration_login.png";
import axios from "axios";
import { LoadingButton } from "@material-ui/lab";

import { Stack, Button, TextField, Typography } from "@material-ui/core";
const ResetPassword = ({ match }) => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
    token: "",
    textChange: "Submit",
  });
  const { password1, password2, textChange, token } = formData;

  useEffect(() => {
    let token = match.params.token;
    if (token) {
      setFormData({ ...formData, token });
    }
  }, []);
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log(password1, password2);
    e.preventDefault();
    if (password1 === password2 && password1 && password2) {
      setFormData({ ...formData, textChange: "Submitting" });
      axios
        .put("/api/resetpassword", {
          newPassword: password1,
          resetPasswordLink: token,
        })
        .then((res) => {
          console.log(res.data.message);
          setFormData({
            ...formData,
            password1: "",
            password2: "",
          });
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error("Something is wrong try again");
        });
    } else {
      toast.error("Passwords don't matches");
    }
  };
  return (
    <>
      <div className="container  login ">
        <h1 className="mb-5 mt-5 text-center">Reset Password</h1>
        <ToastContainer />
        <div className="row  ">
          <div className="col-md-6">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={authSvg2} className="img-fluid" alt="3" />
            </div>
          </div>
          <div className="col-md-6 ">
            <div
              style={{
                marginTop: 30,
              }}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                    Hi, Welcome Back
                  </Typography> */}
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={handleChange("password1")}
                    value={password1}
                  />
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    onChange={handleChange("password2")}
                    value={password2}
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

                {/* <input
                    className="input-block  "
                    type="password"
                    placeholder="password"
                    onChange={handleChange("password1")}
                    value={password1}
                  />
                  <input
                    className="input-block  "
                    type="password"
                    placeholder="Confirm password"
                    onChange={handleChange("password2")}
                    value={password2}
                  />
                  <button
                    type="submit"
                    className="btn  justify-contect-center align-items-center"
                  >
                    <span className="ml-3">{textChange}</span>
                  </button> */}
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

export default ResetPassword;
