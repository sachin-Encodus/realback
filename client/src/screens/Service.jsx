import React ,{useEffect}from 'react';
import { Link ,Redirect } from 'react-router-dom';
import Footer from './Footer';
import { isAuth } from '../helpers/auth';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Menu from './Menu';
// ..
const Service = () =>{

useEffect(() => {
  AOS.init({
      
 
  duration: 1000, // values from 0 to 3000, with step 50ms
 
  });
}, [])




 return (

<>
<Menu/>
 {!isAuth() ? <Redirect to='/login' /> : null}
 <div  className="container-fluid">
     <div className="row">
    <div className="wrapper mt-5 d-flex justify-content-center align-items-center ">
  


 <img src={process.env.PUBLIC_URL+"images/mi.jpeg"}  alt="" className="  mt-5"/>

    </div>

     </div>

 </div>



    <br/><br/><br/><br/><br/><br/>
    <div className="container">
        <h4 style={{display: 'inline-block'}}>Repair Services</h4>
      
        <br/>
        <div className="row ">

            <div className="cards"     data-aos="zoom-in" >
                <Link to="/mobile">
                    <div className="card-item">
                        <div className="card-image-1">
                    <img src="assets/img/R7.jpg" alt="" className="img-fliuid"/> 
                        </div>
                        <div className="card-info text-center ">
                            <h2 className="card-title">Mobile</h2>
                            <p className="card-intro">Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia, there live the blind texts.</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="cards"     data-aos="zoom-in" >
                <div className="card-item">
                    <Link to="/laptop">
                    <div className="card-image-2">
                    </div></Link>
                    <div className="card-info text-center">
                        <h2 className="card-title">Laptop</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
            </div>
            <div className="cards"     data-aos="zoom-in"   >
                <div className="card-item">
                    <Link to="/ipad">
                    <div className="card-image-3">
                    </div></Link>
                    <div className="card-info">
                        <h2 className="card-title">IPad</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
            </div>
            <div  className="cards"     data-aos="zoom-in" >
                <div className="card-item">
                    <Link to="/watch">
                    <div className="card-image-4">
                    </div></Link>
                    <div className="card-info text-center">
                        <h2 className="card-title">Smartwatch</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
            </div>
            <div className="cards"     data-aos="zoom-in" >
                <div className="card-item">
                    <Link to="/airpod">
                    <div className="card-image-5">
                    </div></Link>
                    <div className="card-info text-center">
                        <h2 className="card-title">Airpods</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
            </div>
            <div className="cards"     data-aos="zoom-in" >
                <div className="card-item">
                    <Link to="/led">
                    <div className="card-image-6">
                    </div></Link>
                    <div className="card-info text-center">
                        <h2 className="card-title">Smart tv </h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
            </div>
            <div className="cards"     data-aos="zoom-in" >
                <div className="card-item">
                    <Link to="/">
                    <div className="card-image-7">
                    </div>
                    </Link>
                    <div className="card-info text-center">
                        <h2 className="card-title">Tablets</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
            </div>
            <div className="cards"     data-aos="zoom-in" >
                <div className="card-item">
                    <Link to="/drone">
                    <div className="card-image-8">
                    </div></Link>
                    <div className="card-info text-center">
                        <h2 className="card-title">Camera</h2>
                        <p className="card-intro">Far far away, behind the word mountains, far from the countries Vokalia
                            and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
            </div>



        </div>
    </div>

    <br/><br/><br/><br/><br/>
    <div className="container">

        <div className="row     justify-content-center">
            <h2>partner with companies</h2>

            <br/><br/><br/><br/><br/>


            <div className="col-md-10   ">

                <img src="https://www.angelcellular.com/uploads/1/2/4/0/124019334/brands-orig_orig.jpg"
                    alt="" className="img-fluid    justify-content-center align-items-center         "/>
            </div>

        </div>

    </div>
    <br/><br/><br/><br/><br/>
    <div className="container-fluid">
        <div className="row">   
            <div className="col-md-6">

                <img src={process.env.PUBLIC_URL+"images/PngItem_1342317.png"} alt="" data-aos="slide-right" className="img-fluid  "/>
            </div>
            <div className="col-md-6 text-center ">
                <div style={{padding: '40px', position: 'relative'  ,top: '250px'}}>
                    <h4>delivery</h4>
                    <p> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit aperiam doloremque modi, sint
                        nemo, ut voluptas molestiae quaerat at accusamus, recusandae ad. Dolorem esse quasi vero fuga
                        totam qui tempore!</p>
                </div>
            </div>
        </div>

    </div>



    <div className="container-fluid">
        <div className="row">

            <div className="col-md-6 text-center">
                <div style={{padding: '40px', position: 'relative'  ,top: '250px'}}>
                    <h4>deliver to your door</h4>
                    <p>Lorem ipsum dolor,. Dolorem esse quasi vero fuga totam qui tempore! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Pariatur quisquam atque officia, qui error commodi repellendus
                        quasi, earum consequatur, nesciunt optio quidem dicta quos enim? Asperiores numquam id aliquid
                        voluptatum!</p>
                </div>

            </div>
            <div className="col-md-6">
                <img src={process.env.PUBLIC_URL+"images/i.jpg"} alt="" data-aos="slide-up" className="img-fluid  "/>
            </div>
        </div>


    </div>



 
    <br/><br/>
    <br/><br/>
    <br/><br/>
    <br/><br/>   <br/><br/>
   

<Footer/>


</>


 );


}
    
export default Service;

   

   