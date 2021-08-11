import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Settings from "@material-ui/icons/Settings";
import Logout from "@material-ui/icons/Logout";
import { BiCartAlt } from "react-icons/bi";
// import { signout } from "../helpers/auth";
import "../order.css";
import axios from "axios";
import { BiLogOut, BiHome, BiDonateHeart } from "react-icons/bi";
import { ImWhatsapp } from "react-icons/im";
import { RiFeedbackLine } from "react-icons/ri";
import { FiSmartphone } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import Badge from "../images/b1.png";
import { AuthUser } from "../App";

const Navbar = (props) => {
  const history = useHistory();
  const { state, dispatch } = useContext(AuthUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { handleOpen, ProfileAprooved, paylater } =
    props === undefined ? "realback" : props;

  const [login, setLogin] = useState("");
  const [notification, setNotification] = useState(false);
  // const [logout, setLogout] = useState("logout");
  const [count, setCount] = useState("0");
  const [prouser, setProuser] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    cartdata();
    cheackbadge();
  }, []);

  const cartdata = () => {
    axios
      .get("/api/cart/")
      .then(({ data }) => {
        // setUserdata(data.user);
        notify(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cheackbadge = (_id) => {
    axios
      .get(`/api/user/${_id}`)
      .then(({ data }) => {
        // setUserdata(data.user);
        // notify(data.user[0]);

        if (data.user.subscriber[0].status === "approved") {
          ProfileAprooved(data.user.subscriber[0]);
        } else if (data.user.subscriber[0].status === "member") {
          setProuser(true);
          paylater();
        } else {
          handleOpen();
        }
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

  const logoutall = () => {
    axios
      .get("/api/logoutall")
      .then((res) => {
        console.log("=======.", res);
        dispatch({ type: "AuthUser", payload: null });
        history.push("/login");
      })
      .catch((err) => console.log("==>>>>>>logout error", err));
  };
  const logout = () => {
    axios
      .get("/api/logout")
      .then((res) => {
        console.log(res);
        dispatch({ type: "AuthUser", payload: null });
        history.push("/login");
      })
      .catch((err) => console.log("==>>>>>>logout error", err));
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
              {state === null ? (
                <li className="nav-item">
                  <NavLink
                    // onClick={Hello}
                    className="nav-link js-scroll-trigger"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              ) : (
                // <li className="nav-item">
                //   <NavLink
                //     // onClick={() => {
                //     //   signout(() => {
                //     //     Hello();
                //     //   });
                //     // }}
                //     className="nav-link js-scroll-trigger"
                //     to="/logout"
                //   >
                //     <p className="logouts" data-type="warning">
                //       <span> {state.name}</span>
                //     </p>
                //   </NavLink>
                // </li>,
                <li className="nav-item">
                  {/* <NavLink className="nav-link js-scroll-trigger  " to="/"> */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                    <Tooltip title="Account settings">
                      <IconButton
                        style={{ outline: "none", boarder: "none" }}
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{
                      horizontal: "right",
                      vertical: "top",
                    }}
                    anchorOrigin={{
                      horizontal: "right",
                      vertical: "bottom",
                    }}
                  >
                    <MenuItem>
                      <Avatar /> {state.name}
                    </MenuItem>
                    <MenuItem>
                      <Avatar /> {state.email}
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Add another account
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={() => logout()}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                    <MenuItem onClick={() => logoutall()}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout from all device
                    </MenuItem>
                  </Menu>

                  {/* <img
                        src={Badge}
                        alt="badge"
                        style={{ width: 20, height: 20 }}
                      /> */}
                </li>
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

              {state === null ? (
                <li className="menu-item " style={{ marginTop: 25 }}>
                  <AiOutlineUser color="white" />
                  <NavLink style={{ marginLeft: 10 }} to="/login">
                    Login
                  </NavLink>
                </li>
              ) : (
                <li className="menu-item">
                  {prouser ? (
                    <img
                      src={Badge}
                      alt="badge"
                      style={{ width: 20, height: 20 }}
                    />
                  ) : (
                    <BiLogOut color="white" />
                  )}

                  <NavLink
                    style={{ marginLeft: 10 }}
                    to=""
                    onClick={() => logout()}
                  >
                    {state.name}
                  </NavLink>
                  <li className="menu-item">
                    <NavLink
                      style={{ marginLeft: 10 }}
                      to=""
                      onClick={() => logout()}
                    >
                      Logout from all device
                    </NavLink>
                  </li>
                </li>
              )}
            </ul>

            <div className="shop icon icon-bag">
              {state === null ? (
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
};

export default Navbar;
