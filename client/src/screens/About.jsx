import React from 'react';
import Menu from './Menu'

import image from '../images/team2.png';
import image1 from '../images/aboutrb.png';
import Footer from './Footer';
import {  isAuth } from '../helpers/auth';
import {  Redirect } from 'react-router-dom';
const About = () =>{



    
return (
<>
<Menu/>
<div  style={{backgroundColor: '#ebf5fc'}}>
     {!isAuth() ? <Redirect to='/login' /> : null}

        <div className="arrow animated bounce"></div>

        <div className="container-fluid">

            <div className="row">

                <div className="col-md-6">
                    <figure className='about'  >
  <img src={image1} className="img-fluid"  alt=""/>
                    </figure>
               
                </div>
                <div className="col-md-6">

                    <div className="about">
                        <h1 style={{fontSize: '70px'}}>About <span style={{color:'#ffc107'}}>Real</span>back</h1>
                        <br/>
                        <p style={{paddingRight: '10px'}}> Free up youself like here and give your software and gadgets
                            problems to us. Realback has a vast commuminty of Developers and best Engineers to solve
                            your problems Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam nihil, amet
                            exercitationem dignissimos facilis doloremque doloribus quod, modi iste velit reiciendis et
                            dolore consequatur vitae tempora. </p>



                    </div>



                </div>
            </div>
        </div>




        <br/><br/><br/><br/><br/>



        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="imgBx">
                            <img src="https://image.flaticon.com/icons/svg/2092/2092063.svg" alt=""/>
                        </div>
                        <div className="contentBx">
                            <h2>Design</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam laboriosam omnis dolore
                                amet sequi nobis provident nisi esse optio recusandae quod.</p>
                            <a href=""><span>Read More</span></a>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="imgBx">
                            <img src="https://image.flaticon.com/icons/svg/1197/1197460.svg" alt=""/>
                        </div>
                        <div className="contentBx">
                            <h2>Code</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam laboriosam omnis dolore
                                amet sequi nobis provident nisi esse optio recusandae quod.</p>
                            <a href=""><span>Read More</span></a>
                        </div>
                    </div>
                </div>


                <div className="col-md-4">
                    <div className="card">
                        <div className="imgBx">
                            <img src="https://image.flaticon.com/icons/svg/1067/1067256.svg" alt=""/>
                        </div>
                        <div className="contentBx">
                            <h2>Launch</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam laboriosam omnis dolore
                                amet sequi nobis provident nisi esse optio recusandae quod.</p>
                            <a href="#"><span>Read More</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br/><br/><br/><br/><br/> <br/><br/><br/>


        <div className="container text-center">
            <div className="row">
                <div className="col-md-10 text-center">
                    <img src={image} className="img-fluid"  alt="1"  />

                    <h1>Realback</h1>
                    <br/>
                    <p> Lorem ipsum className, sit amet consectetur adipisicing elit. Aliquid magnam enim corporis ullam
                        libero necessitatibus inventore laboriosam ab error laborum dignissimos temporibus, eum
                        veritatis earum velit odio voluptates officiis rerum.</p>

                </div>
            </div>
        </div>



        {/* <div className="container me text-center">

            <div className="row">

                <div className="col-sm-3">
                    <img src="assets/img/group.svg" style={ {width: '100px', height: '100px'}} alt=""/>
                    <h2 data-max="50">+ Happy Customers</h2>
                </div>
                <div className="col-sm-3">
                    <img src="assets/img/customer-service.svg"  style={ {width: '100px', height: '100px'}}alt=""/>
                    <h2 data-max="25000">+ Lines of code</h2>
                </div>
                <div className="col-sm-3">
                    <img src="assets/img/settings.svg"  style={ {width: '100px', height: '100px'}}alt=""/>
                    <h2 data-max="10">+ Projects</h2>
                </div>
                <div className="col-sm-3">
                    <img src="assets/img/chat.svg"  style={ {width: '100px', height: '100px'}}alt=""/>
                    <h2 data-max="30" id="test">+ Developers</h2>
                </div>
            </div>
        </div> */}
<br/><br/><br/><br/><br/>
</div>

<Footer/>


</>

);

}
export default About;