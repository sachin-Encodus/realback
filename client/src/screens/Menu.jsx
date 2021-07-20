import { useEffect, useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import { FaServer } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { BiCartAlt } from "react-icons/bi";
import { signout } from "../helpers/auth";
import "../order.css";
import axios from "axios";
import { BiLogOut, BiHome, BiDonateHeart } from "react-icons/bi";
import { ImWhatsapp } from "react-icons/im";
import { RiFeedbackLine } from "react-icons/ri";
import { FiSmartphone } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
const Menu = () => {
  const [login, setLogin] = useState("");
  const [notification, setNotification] = useState(false);
  const [logout, setLogout] = useState("logout");
  const [count, setCount] = useState("0");
  // const [latitude, setLatitude] = useState("");

  // const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    let loggedIn = JSON.parse(localStorage.getItem("user"));
    if (loggedIn !== null) {
      console.log(loggedIn.name);
      setLogin(loggedIn.name);
      cartdata(loggedIn.email);
    } else {
      setLogin("");
    }
  }, [logout]);

  const cartdata = (email) => {
    axios
      .get(`/api/cart/${email}`)
      .then(({ data }) => {
        // setUserdata(data.user);
        notify(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("====================================", userdata);
  function notify(user) {
    // console.log("====================================<<<<<<<<<<<<<<", user);
    setCount(user.length);
    user.map((item) => {
      // console.log("====================================", item.mode);

      return item.mode !== "success"
        ? setNotification(true)
        : setNotification(false);
    });
  }
  // console.log("====================================>>>>>>>>>>>", notification);

  //    https://codepen.io/GA-MO/pen/yJzERy?editors=0110

  //   function mylogin(){
  //    let loggedIn =  JSON.parse(localStorage.getItem('user'));
  //    if(loggedIn !== null){
  //    console.log(loggedIn.name);
  //    setLogin(loggedIn.name)
  //    }else{
  //    setLogin("login")
  //    }

  //    }

  const Hello = () => {
    setLogout("logged out");
  };

  //   const navBar = document.getElementById("navBars");
  //       window.onscroll = function() {
  //         if (window.scrollY > 22) {
  //           navBar.classList.add("scrolled");
  //         } else {
  //           navBar.classList.remove("scrolled");
  //         }
  //       };

  // function loginame (){

  // let login = "realback";
  // console.log(login)

  // }
  //  }

  //   }

  // const loggedIn = () =>{
  // // let loggedIn =  JSON.parse(localStorage.getItem('user'));

  //  setLogin("Rohit")
  // console.log(loggedIn);

  // }

  // let loggedIn =  JSON.parse(localStorage.getItem('user'));

  // console.log(loggedIn);

  // setLogin("Rohit");
  // if(isAuth){
  //     let loggedIn =  JSON.parse(localStorage.getItem('user'));
  //    setLogin(loggedIn.name)
  // }else{
  // console.log(login)
  // }

  // (function(){
  //     const burger = document.querySelector('.burger-container'),
  //         header = document.querySelector('.header');

  //     burger.onclick = function() {
  //         header.classList.toggle('menu-opened');
  //     }
  // }());

  const mymenu = () => {
    const burger = document.querySelector(".burger-container"),
      header = document.querySelector(".header");

    header.classList.toggle("menu-opened");
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top"
        id="mainNav"
      >
        <div className="container">
          <NavLink className="navbar-brand js-scroll-trigger" to="/">
            Realback
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav  ml-auto">
              {/* <input type="submit" value="" className="search-submit" />
              <input
                type="search"
                name=""
                className="search-text"
                placeholder="Search..."
                autocomplete="on"
              /> */}
              <li className="nav-item ">
                <NavLink className="nav-link js-scroll-trigger  " to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink className="nav-link js-scroll-trigger  " to="/service">
                  Services
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link js-scroll-trigger" to="/about">
                  About
                </NavLink>
              </li> */}
              <li className="nav-item">
                {notification === true ? (
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 30,
                      marginLeft: 50,
                      marginTop: 5,
                      position: "absolute",
                      backgroundColor: "red",
                    }}
                  ></div>
                ) : null}
                <NavLink className="nav-link js-scroll-trigger" to="/cart">
                  Orders
                </NavLink>
              </li>
              <li className="nav-item">
                <a
                  target="blank"
                  className="nav-link js-scroll-trigger"
                  href="https://api.whatsapp.com/send?phone=919522540020&text=hello Realback"
                >
                  WhatsApp Us
                </a>
              </li>
              {login === "" ? (
                <li className="nav-item">
                  <NavLink
                    onClick={Hello}
                    className="nav-link js-scroll-trigger"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              ) : (
                [
                  <li className="nav-item">
                    <NavLink
                      onClick={() => {
                        signout(() => {
                          Hello();
                        });
                      }}
                      className="nav-link js-scroll-trigger"
                      to="/logout"
                    >
                      <p className="logouts" data-type="warning">
                        <span> {login}</span>
                      </p>
                    </NavLink>
                  </li>,
                ]
              )}

              {/* <li className="nav-item"><NavLink onClick={mylogin} className="nav-link js-scroll-trigger" to="/">check</NavLink></li> */}

              {/* <button style={{ }} onClick={mylogin}>check</button> */}
            </ul>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      {/* 

<div className="mobile">
    <div className="window">
        <div className="header">
            <div className="burger-container">
                <div id="burger">
                    <div className="bar topBar"></div>
                    <div className="bar btmBar"></div>
                </div>
            </div>

            <div className="icon icon-apple">
                <NavLink className="js-scroll-trigger" to="#page-top">
                </NavLink>
            </div>




            <form className="form-search" method="get" action="#">
                <input type="search" name="search" placeholder="search your book here for.." />
                <button type="submit">Search</button>

            </form>
            <ul className="menu">



                <li className="menu-item">
                    <NavLink to="realbackroderform.html">order</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="aboutus11.html">about</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="#">contact</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="index4.html">Services</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="#">TV</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="#">Music</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="signinupform.html">signIn</NavLink>
                </li>

            </ul>

            <div className="shop icon icon-bag">
                <NavLink to="signinupform.html"><i className="fas fa-user "></i></NavLink>
            </div>
        </div>
        <div className="content">
        </div>
    </div>
</div> */}

      {/* 
mobile menu */}
      <div className="mobile ">
        <div className="window ">
          <div className="header">
            <div className="burger-container">
              <div id="burger" onClick={mymenu}>
                <div className="bar topBar"></div>
                <div className="bar btmBar"></div>
              </div>
            </div>

            <div className="icon icon-apple">
              <NavLink className="js-scroll-trigger" to="#page-top">
                <img
                  src={process.env.PUBLIC_URL + "images/realback.png"}
                  className="logos"
                />
              </NavLink>
            </div>

            {/* <form className="form-search" method="get" action="#">
                <input type="search" name="search" placeholder="search your book here for.." />
                <button type="submit">Search</button>

            </form> */}
            <ul className="menu">
              <li className="menu-item ">
                <BiHome color="white" />{" "}
                <NavLink style={{ marginLeft: 10 }} to="/">
                  Home
                </NavLink>
              </li>
              <li className="menu-item d-flex justify-content-between ">
                <div>
                  <BiCartAlt color="white" />
                  <NavLink style={{ marginLeft: 10 }} to="/cart">
                    Orders
                  </NavLink>
                </div>

                <div
                  style={{
                    borderRadius: 5,
                    padding: "0px 5px 21px 5px",
                    backgroundColor: "#171717",
                    height: 15,
                    color: "red",
                    marginTop: 5,
                  }}
                >
                  {count}
                </div>
              </li>
              <li
                className="menu-item"
                style={{ borderBottom: "1px solid #333" }}
              >
                <FiSmartphone color="white" />
                <NavLink style={{ marginLeft: 10 }} to="/service">
                  Service
                </NavLink>
              </li>
              {/* <li className="menu-item">
                <NavLink to="/about">about</NavLink>
              </li> */}
              <li className="menu-item " style={{ marginTop: 25 }}>
                <ImWhatsapp color="white" />
                <a
                  target="blank"
                  style={{ marginLeft: 10 }}
                  href="https://api.whatsapp.com/send?phone=919522540020&text=hello Realback"
                >
                  WhatsApp Us
                </a>
              </li>
              <li className="menu-item">
                <RiFeedbackLine color="white" />
                <NavLink style={{ marginLeft: 10 }} to="/feedback">
                  Feedback
                </NavLink>
              </li>

              <li
                className="menu-item"
                style={{ borderBottom: "1px solid #333" }}
              >
                <BiDonateHeart color="white" />
                <a style={{ marginLeft: 10 }} href="https://rzp.io/l/ypLTEOH">
                  Donate to realback
                </a>
              </li>

              {login === "" ? (
                <li className="menu-item " style={{ marginTop: 25 }}>
                  <AiOutlineUser color="white" />
                  <NavLink style={{ marginLeft: 10 }} to="/login">
                    Login
                  </NavLink>
                </li>
              ) : (
                <li className="menu-item">
                  <BiLogOut color="white" />
                  <NavLink
                    style={{ marginLeft: 10 }}
                    onClick={() => {
                      signout(() => {
                        Hello();
                      });
                    }}
                    to="/logout"
                  >
                    {login}
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="shop icon icon-bag">
              {login === "" ? (
                <NavLink to="/login">
                  <i className="fas fa-user " style={{ color: "white" }}></i>
                </NavLink>
              ) : (
                <NavLink to="/cart">
                  {notification === true ? (
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: 30,
                        marginLeft: 30,
                        marginTop: 5,
                        position: "absolute",
                        backgroundColor: "red",
                      }}
                    ></div>
                  ) : null}
                  <BiCartAlt color="white" />
                </NavLink>
              )}
            </div>
          </div>
          <div className="content"></div>
        </div>
      </div>
    </>
  );
};;


export default Menu;

