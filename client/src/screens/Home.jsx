import React ,{useEffect}from 'react';



// import Watch from '../images/large.mp4'

import Footer from './Footer'
import { ToastContainer, toast } from 'react-toastify';
import Menu from './Menu';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

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






 <header class="masthead">
    <img src="images/gpod.png" alt="" class="img-fluid gpod"/>
        <div class="masthead-heading">
      <div class="masthead-subheading">
    </div>
        </div>
    </header>
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

<section>


  <div className="container-fluid  text-center">
               

      
   
<h1 className="text-center"  >The React Framework
for Production</h1>
   
         
  </div>
</section>



<section>


  <div className="container-fluid  text-center">
               

      
    <div className="row text-center ">

     
 <figure data-aos="fade-in"  >

<img   src={process.env.PUBLIC_URL+"images/mi.jpeg"} alt="" className="img-fluid"/>

   </figure>     
          </div>
  </div>
</section>

<section>


  <div className="container-fluid  text-center">
               

      
    <div className="row text-center ">
<div className="col-md-6">
 <figure data-aos="fade-in"  >

<img   src={process.env.PUBLIC_URL+"images/front.jpeg"} alt="" className="img-fluid"/>

   </figure> 
</div>
  <div className="col-md-6">
   <figure data-aos="fade-in"  >

<img   src={process.env.PUBLIC_URL+"images/back.jpeg"} alt="" className="img-fluid"/>

   </figure> 
</div>   
 <figure data-aos="fade-in"  >

<img   src={process.env.PUBLIC_URL+"images/iphone.jpg"} alt="" className="img-fluid"/>

   </figure>     
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