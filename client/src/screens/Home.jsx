import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
// import Watch from '../images/large.mp4'

import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import Menu from "./Menu";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Service from "./Service";
import App from "../images/airpods.png";
import myvideo from "../images/App2.mp4";
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../images/realback.png";
import Card from "../images/card.webp";
// import { AuthUser } from "../App";
// import Pod from '../images/.png'
const Home = () => {
  // const UserAuth = useContext(AuthUser);
  // console.log("userAuth", UserAuth);
  const [closed, setClosed] = useState(false);
  const [prouser, setProuser] = useState(false);
  const [date, setDate] = useState("");

  // const name = "sachin"
  // const price = "500"
  // const number ="9147203189"
  // var dt = new Date();
  // var subscribe = 3;
  // var month = dt.getMonth() + 1 + subscribe;
  // var year = dt.getUTCFullYear();
  // dt.setMonth(dt.getMonth() + 1);
  // console.log(month + "/" + year);
  // const qs = new URLSearchParams(payds);
  // console.log('====================================',payds);

  useEffect(() => {
    let loggedIn = JSON.parse(localStorage.getItem("user"));
    if (loggedIn !== null) {
      cheackbadge(loggedIn.email);
    } else {
      console.log("====================================");
    }
    AOS.init({
      offset: 300, // offset (in px) from the original trigger point
      delay: 10, // values from 0 to 3000, with step 50ms
      duration: 1400, // values from 0 to 3000, with step 50ms
    });
  }, []);
  const cheackbadge = (email) => {
    axios
      .get(`/api/user/${email}`)
      .then(({ data }) => {
        // setUserdata(data.user);
        // notify(data.user[0]);
        if (data.user.subscriber[0].status === true) {
          setProuser(true);
          setDate(data.user.subscriber[0].expiredate);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Menu />

      <div style={{ backgroundColor: "#000" }}>
        <ToastContainer />
        {/* 
  <div className="container-fluid  text-center">
               

      
    <div className="row text-center ">

     
 <figure  >

<img   src={process.env.PUBLIC_URL+"images/apple.jpg"} alt="" className="img-fluid"/>

   </figure>     
          </div>
  </div> */}

        <section style={{}}>
          {/* <div class="feedback-btn">
            <p class="feedback-txt">Feedback</p>
          </div> */}
          <div className="container">
            <div className="row  ">
              {closed === false ? (
                <div
                  className="notification  col-md-12 "
                  style={{
                    backgroundColor: "rgb(16 16 16 / 81%)",
                    fontFamily: "sans-serif",
                    padding: 20,
                    textAlign: "center",
                    borderRadius: 10,
                    // marginTop: 50,
                    color: "#6b6b6b",
                  }}
                >
                  {" "}
                  <FiAlertCircle
                    size="25"
                    color="white"
                    style={{ marginRight: 10 }}
                  />
                  Welcome to Realback services we notify you that our services
                  only Available in Jaipur now{" "}
                  <AiOutlineClose
                    style={{
                      marginLeft: "auto",
                      float: "right",
                    }}
                    onClick={() => setClosed(true)}
                    color="white"
                    size="20"
                  />
                </div>
              ) : null}

              <div
                style={{
                  margin: "auto",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="col-md-7 p-2 mt-5 "
              >
                <figure data-aos="fade-in ">
                  <img src={App} alt="" className="img-fluid" />
                </figure>
              </div>
              <div className="col-md-5 mt-5 ">
                <div style={{ padding: 20 }}>
                  <h1
                    style={{ color: "#fff", fontFamily: "unset" }}
                    className="gradtext"
                  >
                    Realback for your
                  </h1>
                  <h3 className="gradtext" style={{ color: "#fff" }}>
                    all devices solutions
                  </h3>
                  <p className="gradtext" style={{ color: "#fff" }}>
                    You can esaliy repair your elctronics devices with Realback
                    get your service Now!
                  </p>
                  <div class=" social-btns mt-5">
                    <Link
                      style={{
                        padding: 15,
                        backgroundColor: "#0070f3",
                        boxShadow: "0 4px 14px 0 rgb(0 118 255 / 39%)",
                      }}
                      class="app-btn blu flex vert  "
                      to="/service"
                    >
                      <span class="big-txt">Service</span>
                    </Link>

                    {/* <Link
                    to={{
                      pathname: "/service",
                      search: `choosenDog=${Data}`, //dog is the object to pass along
                    }}
                  >
                    {" "}
                    <span class="big-txt">Service me</span>
                  </Link> */}
                    {/* 4vwsYy1_MRH2xGJnidDh6W-eMD4kRcQNwJcRVyLz */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="logoMarqueeSection mt-5">
          <div class="container" id="logoMarqueeSection">
            <div class="default-content-container flex items-center">
              <div class="default-content-container-inner marquee-wrapper relative overflow-hidden inline-block">
                <div class="marquee" style={{ animationDuration: "57s" }}>
                  <a target="_blank">
                    <img
                      src="https://1000logos.net/wp-content/uploads/2018/09/Honor-logo.png"
                      title=""
                      class="marqueelogo"
                    />
                  </a>
                  <a target="_blank">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Realme-realme-_logo_box-RGB-01.png"
                      title=""
                      class="marqueelogo"
                    />
                  </a>
                  <a target="_blank">
                    <img
                      src="https://www.freepnglogos.com/uploads/xiaomi-png/xiaomi-logo-logos-marcas-8.png"
                      title=""
                      class="marqueelogo"
                    />
                  </a>
                  <a target="_blank">
                    <img
                      src="https://www.searchpng.com/wp-content/uploads/2019/01/vivo-Phone-logo.png"
                      title=""
                      class="marqueelogo"
                    />
                  </a>
                  <a target="_blank">
                    <img
                      src="https://www.freepnglogos.com/uploads/oppo-logo-png/oppo-green-logo-transparent-0.png"
                      title=""
                      class="marqueelogo"
                    />
                  </a>
                  <a target="_blank">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOXkMpw3xPGNNNto3lgm9Phz9jsfz80-AITBKiEpgL5ZuXy-It_5v5Ar2cVjXI-nwjFIY&usqp=CAU"
                      title=""
                      class="marqueelogo"
                    />
                  </a>
                  <a target="_blank">
                    <img
                      src="https://pngimg.com/uploads/sony_logo/sony_logo_PNG5.png"
                      title=""
                      class="marqueelogo"
                    />
                  </a>
                  <a target="_blank">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/2560px-ASUS_Logo.svg.png"
                      title=""
                      class="marqueelogo"
                    />
                  </a>
                  {/* <a target="_blank">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nokia_wordmark.svg/1024px-Nokia_wordmark.svg.png"
                    title=""
                    class="marqueelogo"
                  />
                </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <header class="masthead">
    <img src="images/gpod.png" alt="" class="img-fluid gpod"/>
        <div class="masthead-heading">
          Realback for your device solution
      <div class="masthead-subheading">
        Get repair your all electronics devices by realback 
    </div>
        </div>
    </header>  */}
        {/* <section>
<div className="container">
  <div className="row   justify-content-center   align-items-center">
<div className="col-md-6 p-5" >
  <h1   data-aos="fade-up" >Airpods Max </h1>
  <p  data-aos="fade-up"  >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, excepturi! sit amet, consectetur adipisicing elit. Facere, excepturi!</p>
  <Link  data-aos="fade-up" to="#">Book now </Link>
</div>
<div className="col-md-6">
 <img src={m1} alt="1"    data-aos="fade-up" className="img-fluid  "/>
</div>
  
   
  </div>
</div>
</section>
<section   >
  <div className="conatiner"    >
    <div className="row   ">
    
      <div className="col-md-6">
<img src={process.env.PUBLIC_URL+"images/"}  alt="" className="img-fluid"/>
      </div>
<div className="col-md-6  p-5">
  <h1>Apple iWatch</h1>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat minima est assumenda magni itaque, voluptate omnis vitae officiis totam fuga magnam quaerat veniam non quae. Assumenda minima delectus animi necessitatibus?</p>
</div>
    </div>
  </div>
</section> */}

        {/* <section  style={{backgroundColor:'#FFFFFF'}} >


<Service/>
</section> */}

        <section className="mt-5">
          <div class="container">
            <div class="row">
              <div className="col-md-6 col-xl-4  ">
                <div style={{ margin: "auto" }}>
                  <div class="cardd ">
                    <img
                      src={Logo}
                      alt="logo"
                      style={{ width: 50, height: 50 }}
                    />
                    <p style={{ float: "right" }}>{date}</p>
                    <h2 class="card_title"></h2>
                    <p class="pricing">
                      1.32$<span class="small">/3 month</span>
                    </p>

                    <ul class="features">
                      <li>10% 0ff</li>
                      <li>Free delivery</li>
                      <li>Gift and rewards</li>
                      <li>Pay later amount below 4000</li>
                    </ul>
                    {prouser ? (
                      <Link to="/" class="cta_btn">
                        Realback Member
                      </Link>
                    ) : (
                      <Link to="/pro" class="cta_btn">
                        Buy Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <img src={Card} alt="23" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
          {/* <a href="https://youtu.be/RLReK22LWTo" target="_blank" class="link">
            Watch on youtube <i class="fab fa-youtube"></i>
          </a> */}
        </section>
        {/* <figure data-aos="fade-in"  >

<img   src={Pod} alt="" className="img-fluid"/>

   </figure>  */}

        <section style={{}}>
          <div className="container-fluid ">
            <div className="row  ">
              <div className="col-md-12 ">
                <div class="wrapper ">
                  <video autoplay="autoplay" muted class="wrapper__video ">
                    <source type="video/mp4" src={myvideo} />
                  </video>
                </div>
                <div style={{ paddingLeft: 10 }}>
                  <h1
                    style={{
                      fontWeight: "bold",
                      color: "#fff",
                      textAlign: "center",
                    }}
                    className="gradtext"
                  >
                    Available on App Store
                  </h1>
                  <p
                    className="gradtext"
                    style={{ color: "#fff", textAlign: "center" }}
                  >
                    Download our App from App Store for both Android and IOS
                    platform soon.
                  </p>
                  {/* <div
                  class="mt-5 social-btns"
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <Link class="app-btn blu flex vert" to="http:google.com">
                    <i class="fab fa-google-play"></i>
                    <p>
                      Get it on <br /> <span class="big-txt">Google Play</span>
                    </p>
                  </Link>
                </div> */}
                </div>
              </div>
              {/* <div className="col-md-1"></div> */}
            </div>
          </div>
        </section>

        {/* <section style={{ backgroundColor: "#000" }}>
        <div className="container-fluid  text-center">
          <div className="row text-center ">
            <div class="wrapper">
              <video autoplay="autoplay" muted class="wrapper__video">
                <source type="video/mp4" src={myvideo} />
              </video>
            </div>
          </div>
        </div>
      </section> */}

        {/* 
<section  >


  <div className="container-fluid  text-center">
         <h1 className="mb-5"   data-aos="fade-in" >  ipad pro max </h1>      

      
    <div className="row text-center ">

     
 <figure>

<img  data-aos="fade-in" src={process.env.PUBLIC_URL+"images/8d94cb1265c6b450789b756b6c2c49cd.webp "} alt="" className="img-fluid"/>

   </figure>     
          </div>
  </div>
</section> */}

        {/* 

<section style={{backgroundColor:'white'}} >


  <div className="container-fluid  text-center">
               

      
    <div className="row text-center ">

     
 <figure>

<img  data-aos="fade-in" src={process.env.PUBLIC_URL+"images/wallpaperflare.com_wallpaper (16).jpg "} alt="" className="img-fluid"/>

   </figure>     
          </div>
  </div>
</section> */}

        {/* 
<section>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <figure>
          <img src="https://www.gstatic.com/devrel-devsite/prod/vc5f5097f7e98f45082257ed44f785e23f8176f944afb30dfad7aee218957f132/android/images/lockup.svg" alt="" className="img-fluid p-5" data-aos="slide-up"  />
        </figure>
        <figure  className="p-5" >
                  <img src={process.env.PUBLIC_URL+"images/PngItem_201873.png"} className="ml-5 img-fluid  " data-aos="slide-up"  alt=""/>
        </figure>
      </div>
      <div className="col-md-6">

        <img src={process.env.PUBLIC_URL+"images/PngItem_5299050.png"} className="   img-fluid" data-aos="slide-up"  alt=""/>
     
      </div>
    </div>
  </div>
</section> */}
        {/* 
<section >

  <div className="conatiner-fluid">
<div className="row">

<div className="col-md-6">
<img  data-aos="fade-in" src={m2} alt="" className="img-fluid"/>
</div>
<div className="col-md-6">
<img  data-aos="fade-in" src={dogs} alt="" className="img-fluid"/>
</div>


</div>





<div className="row">

<div className="col-md-6">
<img  data-aos="fade-in" src={Sam} alt="" className="img-fluid"/>
</div>
<div className="col-md-6">
<img  data-aos="fade-in" src={Sam} alt="" className="img-fluid"/>
</div>


</div>

  </div>
</section> */}

        {/* 

<section>
  <div className="container-fluid">
    <div className="col-md-6">
 <div className="">
  <img src="https://media.giphy.com/media/TJgrpxS9xedgWzA1Jn/giphy.gif" alt=""/>
        <img src="https://media.giphy.com/media/J2HtbUFutpfhw4Av28/giphy.gif" alt=""/>
        <img src="https://media.giphy.com/media/fvTskke3321jINuYKt/giphy.gif" alt=""/>
      </div>
    </div>
    <div className="col-md-6">
      <div className="">
        <img src="https://media.giphy.com/media/fUjQwgstPJrIIjIIXy/giphy.gif" alt=""/>
        <img src="" alt=""/>
        <img src="" alt=""/>
      </div>
      <div className="">
  <img src="" alt=""/>
        <img src="" alt=""/>
        <img src="" alt=""/>
      </div>
    </div>
  </div>
</section> */}

        {/* 
<div class="wrapper1">

   <video autoPlay loop muted class="wrapper__video">
      <source src={Watch}  type="video/mp4" />
   </video>
  
</div>  */}
      </div>

      <Footer />
    </>
  );
};

export default Home;

// background: rgba(255, 255, 255, 0.1);
// box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
// border-top: 1px solid rgba(255, 255, 255, 0.5);
// border-left: 1px solid rgba(255, 255, 255, 0.5);
// backdrop-filter: blur(5px);
