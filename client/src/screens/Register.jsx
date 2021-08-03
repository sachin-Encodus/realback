import React, { useState } from 'react';
import authSvg from "../images/illustration_register.png";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { isAuth } from "../helpers/auth";
import { Link, NavLink, Redirect } from "react-router-dom";
import { Stack, Button, TextField, Typography } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password1: "",
    password2: "",
    textChange: "Sign Up",
  });

  const { name, email, mobile, password1, password2, textChange } = formData;

  const stringLength = mobile.length;

  console.log("==========", stringLength);
  if (stringLength > 10) {
    toast.dark("invalid phone number");
  }
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && mobile && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: "Submitting" });
        axios
          .post("/api/register", {
            name,
            mobile,
            email,
            password: password1,
          })
          .then((res) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              mobile: "",
              password1: "",
              password2: "",
              textChange: "Submitted",
            });

            toast.success(`email has been sent to ${email}`);

            //  setTimeout(function () {
            //       window.location = "https://www.gmail.com";
            //   }, 5000);

            toast.success(` Opening Gmail app`);
          })

          .catch((err) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              mobile: "",
              password1: "",
              password2: "",
              textChange: "Sign Up",
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.warning("Please fill all fields");
    }
  };

  return (
    <>
      <div className="container  login">
        {isAuth() ? <Redirect to="/" /> : null}
        <ToastContainer />
        <h1 className="text-center mt-4">Create Realback Account</h1>
        <div className="text-center  mt-3  ">
          <p className="text-center d-inline-flex font-weight-bold">
            Already have an account?
          </p>
          <NavLink
            className="py-3   justify-contect-center align-items-center"
            to="/login"
            target="_self"
          >
            <span style={{ color: "blue" }} className="ml-3 ">
              Sign In
            </span>
          </NavLink>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-6">
            <div className=" imgBox">
              <img src={authSvg} alt="" className=" img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                    Hi, Welcome Back
                  </Typography> */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
                  <TextField
                    id="outlined-basic"
                    label="Full Name"
                    variant="outlined"
                    type="text"
                    onChange={handleChange("name")}
                    value={name}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    type="email"
                    onChange={handleChange("email")}
                    value={email}
                  />
                </Stack>

                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Number"
                  variant="outlined"
                  type="number"
                  onChange={handleChange("mobile")}
                  value={mobile}
                />
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
                  label="password"
                  variant="outlined"
                  type="password"
                  onChange={handleChange("password2")}
                  value={password2}
                />
                <div>
                  <NavLink to="/users/password/forget" className="">
                    Or Sign Up with email or social login
                  </NavLink>
                </div>

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
      </div>
    </>
  );
};

export default Register;
