import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import Footer from "./Footer";
import Menu from "./Menu";
import { isAuth } from "../helpers/auth";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// import { AuthUser } from "../App";

import data from "./Servicedata";

const Service = () => {
  // const UserAuth = useContext(AuthUser);
  // console.log("=============>>>>>>>>", UserAuth);
  const { mobile } = data;

  useEffect(() => {
    AOS.init({
      duration: 1000, // values from 0 to 3000, with step 50ms
    });
  }, []);

  return (
    <div>
      <Menu />

      <div class="container ">
        {/* <h1 class=" mt-5 ">Get your </h1>
        <h1>device service</h1> */}
      </div>

      <div class="shell">
        <div class="container">
          <div
            style={{
              backgroundColor: "#f5f5f7",
              fontFamily: "sans-serif",
              padding: 20,
              textAlign: "center",
              borderRadius: 10,
              marginTop: 55,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Choose your device for which you are looking for services
          </div>
          <div class="row">
            {mobile.map((product) => (
              <div class="col-6 col-sm-6  col-md-3 col-lg-3 ">
                <div class="wsk-cp-product">
                  <Link to={"/device/" + product.data.name}>
                    {/* <Link
                    to={{
                      pathname: "/device",
                      search: `routeName=${JSON.stringify(product.data)}`, //dog is the object to pass along
                    }}
                  > */}
                    <div class="wsk-cp-img">
                      <img
                        src={product.image}
                        alt="Product"
                        class="img-responsive"
                      />
                    </div>

                    <div class="wsk-cp-text">
                      {/* <div style={{backgroundColor:'#000' , borderRadius:20}}  > */}

                      <div class="category">
                        <span>{product.productName}</span>
                      </div>

                      <div class="title-product">
                        {/* <h3>Get your device Service</h3> */}
                      </div>

                      {/* </div> */}
                      {/* <div class="card-footer">
              <div class="wcf-left"><span class="price">Rp500.000</span></div>
              <div class="wcf-right"><a href="#" class="buy-btn"><i class="zmdi zmdi-shopping-basket"></i></a></div>
            </div> */}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
