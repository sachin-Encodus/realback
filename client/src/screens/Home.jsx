import React ,{useEffect}from 'react';

import { Link } from 'react-router-dom';

// import Watch from '../images/large.mp4'

import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import Menu from './Menu';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Service from './Service';
import App from '../images/macpro.png'
import Electrical from '../images/ele.webp'
// import Pod from '../images/.png'
const Home = () =>{

useEffect(() => {

 
  AOS.init({
  offset: 200, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 1200, // values from 0 to 3000, with step 50ms
  });
}, [])


return (
<>
 <Menu/>

<div  style={{backgroundColor:'black'}} >
 <ToastContainer />
{/* 
  <div className="container-fluid  text-center">
               

      
    <div className="row text-center ">

     
 <figure  >

<img   src={process.env.PUBLIC_URL+"images/apple.jpg"} alt="" className="img-fluid"/>

   </figure>     
          </div>
  </div> */}

<section style={{backgroundColor:'black'}}  >


  <div className="container-fluid  text-center">
               

      
    <div className="row text-center ">

 

<div className="col-md-5">
  
<h1 style={{color:'#fff'}} className=" p-5 mt-5"  >Realback for your all devices solutions</h1>
<div class="flex social-btns">
  <Link  style={{padding:15}} class="app-btn blu flex vert  " to="/service">
   
    <span class="big-txt">Service</span>
  </Link>


	

</div>
	<p className=" p-5 mt-1"  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, nulla ab! Alias excepturi at optio sint! Ut est sit veniam molestias qui illum laborum nobis recusandae, expedita amet et voluptate!</p>

</div>
   
 
<div className="col-md-7 p-5 justify-content-center ">
   <figure data-aos="fade-in "  >

<img   src={App} alt="" className="img-fluid"/>

   </figure> 
</div> 
    
          </div>
  </div>

</section>

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


{/* 
<section>


  <div className="container-fluid  text-center">
               

      
    <div className="row text-center ">

     
 <figure data-aos="fade-in"  >

<img   src={process.env.PUBLIC_URL+"images/mi.jpeg"} alt="" className="img-fluid"/>

   </figure>     
          </div>
  </div>
</section> */}
   {/* <figure data-aos="fade-in"  >

<img   src={Pod} alt="" className="img-fluid"/>

   </figure>  */}

<section  style={{backgroundColor:'rgb(227 229 232)'}}  >


  <div className="container-fluid  text-center">
               

      
    <div className="row text-center ">


<div className="col-md-7">
   <figure data-aos="fade-in"  >

<img   src={Electrical} alt="" className="img-fluid"/>

   </figure> 
</div>  

<div className="col-md-5">
  
<h1 className=" p-5 mt-5"  >Download the Realback Android and ios app soon.</h1>
<div class="flex social-btns">
  <Link class="app-btn blu flex vert" to="http:apple.com">
    <i class="fab fa-apple"></i>
    <p>Available on the <br/> <span class="big-txt">App Store</span></p>
  </Link>

  <Link class="app-btn blu flex vert" to="http:google.com">
    <i class="fab fa-google-play"></i>
    <p>Get it on <br/> <span class="big-txt">Google Play</span></p>
  </Link>
	

</div>
	<p className=" p-5 mt-1"  >Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, nulla ab! Alias excepturi at optio sint! Ut est sit veniam molestias qui illum laborum nobis recusandae, expedita amet et voluptate!</p>

</div>
   
 
    
          </div>
  </div>
</section>

{/* 
<section>


  <div className="container  text-center">

      
    <div className="row text-center ">

     
 <figure  data-aos="fade-in">

<img  data-aos="fade-in" src={process.env.PUBLIC_URL+"images/wallpaperflare.com_wallpaper (15).jpg "} alt="" className="img-fluid"/>

   </figure>     
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

    <Footer/>
</>

);



}

export default Home;








// background: rgba(255, 255, 255, 0.1);
// box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
// border-top: 1px solid rgba(255, 255, 255, 0.5);
// border-left: 1px solid rgba(255, 255, 255, 0.5);
// backdrop-filter: blur(5px);