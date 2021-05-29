import React, { useState } from 'react';
import '../order.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';  
import {  isAuth } from '../helpers/auth';
import {  Redirect } from 'react-router-dom';

const Personal = () =>{
  const [formData, setFormData] = useState({
    name: '',
    email: '',
     number: '',
      country: '',
       state: '',
        city: '',
         pincode: '',
          Address: '',
   
  });

  const { name, email, number, country,  state,  city,  pincode,   Address,  } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if ( name && email && number && country &&  state &&  city &&  pincode &&   Address ) {
    
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .post("/api/personal", {
            name, email, number, country,  state,  city,  pincode,   Address,
          })
          .then(res => {
            setFormData({
              ...formData,
              name: '',
    email: '',
     number: '',
      country: '',
       state: '',
        city: '',
         pincode: '',
          Address: '',
   
            });

            toast.success(res.data.message);
         
          })
        
          .catch(err => {
            setFormData({
              ...formData,
             name: '',
    email: '',
     number: '',
      country: '',
       state: '',
        city: '',
         pincode: '',
          Address: '',
   
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
     
    } else {
      toast.warning('Please fill all fields');
    }
  };

 return (
 <>



<br/><br/><br/>
   
    <div id="svg_wrap"></div>
    <br/><br/><br/><br/><br/><br/>
    <div class="container">
       {!isAuth() ? <Redirect to='/login' /> : null}
<ToastContainer/>
        <div class="row">
            <div class="col-md-6">




                <section class="get-in-tou">
                    <h1 class="title">Personal detailes</h1>
                    
                    <form onSubmit={handleSubmit} class="contact-form">

                        <div class="form-field col-xl-6">

                            <input  onChange={handleChange('name')} class="input-text js-input" placeholder="Full Name" value={name} type="text" />

                        </div>
                        <div class="form-field col-xl-6">
                            <input onChange={handleChange('email')}  class="input-text js-input" placeholder="Email"  value={email} type="email"  />

                     


                        </div>
                        <div class="form-field col-xl-6">
                            <input onChange={handleChange('number')} class="input-text js-input"  value={number} placeholder="Mobile" type="num"
                                maxlength="10"  />

                        </div>
                        <div class="form-field col-xl-6">
                          
                             <input onChange={handleChange('country')}class="input-text js-input" placeholder="Country" type="string"
                                 value={country}  />

                        </div>
                        <div class="form-field col-xl-6">
                            <input onChange={handleChange('state')} class="input-text js-input" placeholder="State"         value={state} type="text" />

                        </div>
                        <div class="form-field col-xl-3">
                            <input onChange={handleChange('city')}  class="input-text js-input" placeholder="City"     value={city}type="text" />

                        </div>
                        <div class="form-field col-xl-3">
                            <input onChange={handleChange('pincode')}  class="input-text js-input" placeholder="Pincode"  value={pincode} type="number"
                                />

                        </div>

                        <div class="form-field col-xl-12">
                            <input onChange={handleChange('Address')}   class="input-text js-input" placeholder="Address"    value={Address} type="text"
                                />

                        </div>

                        <div class="form-field col x-100 align-center">
  <button type='submit' className='btn btn-primary justify-contect-center align-items-center'>
                        <i className='fas fa-sign-in-alt  ' />
                        <span className='ml-3'>Sign In</span>
                    </button>   
                           
                        </div>

                    </form>
                </section>




            </div>

            <div class="col-md-6">

                <div class="second">

                    <h2>24 Hours service</h2>
                    <img src="images/24.png" class="img-fluid" alt=""/>
                </div>
            </div>

        </div>
    </div>

 </>

 );}

export default Personal;

