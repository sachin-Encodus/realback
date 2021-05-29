import React, { useState } from 'react';
import authSvg from '../images/glogin.png';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';
import {  isAuth } from '../helpers/auth';
import { Link, NavLink, Redirect } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    textChange: 'Sign Up'
  });

  const { name, email, password1, password2, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .post("/api/register", {
            name,
            email,
            password: password1
          })
          .then(res => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Submitted'
            });

            toast.success(`email has been sent to ${email}`);
         
          //  setTimeout(function () {
          //       window.location = "https://www.gmail.com";
          //   }, 5000);

                toast.success(` Opening Gmail app`);
          })
        
          .catch(err => {
            setFormData({
              ...formData,
              name: '',
              email: '',
              password1: '',
              password2: '',
              textChange: 'Sign Up'
            });
            console.log(err.response);
            toast.error(err.response.data.errors);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.warning('Please fill all fields');
    }
  };

 
  return (
  <>
    <div className='container  login'>
      {isAuth() ? <Redirect to='/' /> : null}
          <ToastContainer /> 
          <h1 className='text-center mt-4'>
              Create Realback Account
                </h1>
                 <div  className='text-center  mt-3  ' >
                <p  className='text-center d-inline-flex font-weight-bold'>Already have an account?</p ><NavLink
                            className='py-3   justify-contect-center align-items-center'
                            to='/login' target='_self'>
                          
                            <span style={{color:'blue'}} className='ml-3 '>Sign In</span>
                        </NavLink>
                        </div>
                           <br/><br/>
      <div className="row">
     
        <div className="col-md-6">
          
 

                <form className='form-me' onSubmit={handleSubmit}>
                    <div className=''>
                        <input
                            className='input-block'
                            type='text' placeholder='Name' onChange={handleChange('name')} value={name} />
                        <input
                            className='input-block'
                            type='email' placeholder='Email' onChange={handleChange('email')} value={email} />
                        <input
                            className='input-block'
                            type='password' placeholder='Password' onChange={handleChange('password1')}
                            value={password1} />
                        <input
                            className='input-block'
                            type='password' placeholder='Confirm Password' onChange={handleChange('password2')}
                            value={password2} />

                             <div className="mt-3"
                            >
                           
                          <NavLink to='/users/password/forget' className=''>
                        Or Sign Up with email or social login
                    </NavLink>
                    </div>
                        <button type='submit'
                            className='btn  justify-contect-center align-items-center'>
                        
                            <span className=''>{textChange}</span>
                        </button>
                     {/* <div  className="d-inline-flex  icons " >
          <Link to="google.com"  classNam="" ><img src={authSvg1} width="30" alt="1"/></Link>   
          <Link to="/"  className="ml-3" ><img src={authpng} width="30"  alt="2"/> </Link>      

                    </div>   */}
                    </div>
                   
                   
                       
                   
                </form>
        </div>



        
        <div className="col-md-6"  >
   
          <div className=" imgBox" > 
          <img src={authSvg} alt="" className=" img-fluid"/>
          </div>

        </div>


<div  className="p-5 " >
  <p className="text-center" style={{color:'black'}} >* By Signing Up, you agree to our   <a href="#"><span  style={{color:"blue"}} >Terms of Use</span></a>   and to receive Realback emails & updates and acknowledge that you read our  <a href="#"> <span style={{color:"blue"}}  >Privacy Policy</span></a>.</p>
</div>

      </div>
     </div>
     </>
  );
};

export default Register;
