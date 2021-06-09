import React, { useState } from 'react';

import authSvg2 from '../images/Global Workforce.jpeg'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import { authenticate, isAuth } from '../helpers/auth'
import {  NavLink, Redirect } from 'react-router-dom';
import '../index.css'
  

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    textChange: 'Sign In'
  });
  const { email, password, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

// sachin1245e@gmail.com
 


// Google login
  const sendGoogleToken = tokenId => {
    axios
      .post("http://localhost:5000/api/googlelogin", {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
          console.log("send");
           toast.success("success");
      })
      .catch(error => {
          toast.error('send');
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  const informParent = response => {
    authenticate(response, () => {
    console.log("Done");
    });
  };


   const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };
// end

  const handleSubmit = e => {
    // console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(  "/api/signin", {
          email,
          password: password
        })
        .then(res => {
            authenticate(res, () => {
            setFormData({
              ...formData,
              email: '',
              password: '',
              textChange: 'Submitted'
            });
 isAuth() && isAuth().role === 'admin'
              ? history.push('/admin')
              : history.push('/');
 
            // toast.success(`Hey ${res.data.token}, Welcome back!`);
        toast.dark(res.data.myname);
    
        })
      })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password: '',
            textChange: 'Sign In'
          });
          console.log(err.response);
          toast.dark(err.response.data.errors);
        
        });
    } else {
      toast.dark('Please fill all blocks');
    }
  };
  return (
    <>
    <div className='container  login
    '>
       <h1 className='text-center mt-4 '>
 Sign In
                </h1>
                <div  className='text-center  mt-4   ' >
                <p  className='text-center d-inline-flex font-weight-bold'>Don't have an account?</p ><NavLink
                            className='py-3   justify-contect-center align-items-center'
                            to='/register' target='_self'>
                          
                            <span style={{color:'blue'}} className='ml-3 '>Sign Up</span>
                        </NavLink>
                        </div>
      {isAuth() ? <Redirect to='/' /> : null}
          <ToastContainer />
      <div className="row  ">
       
        
        <div className="col-md-6  mb-3 ml-auto mt-5">
 


<div   className="  ">
                <form className='form-me '   onSubmit={handleSubmit}>
                    <div className=''>

        <input
            className='input-block  '
            type='email' placeholder='Email'  onChange={handleChange('email')} value={email} />
     
                       <input className='input-block  ' type='password' placeholder='Password'
                        onChange={handleChange('password')} value={password} />
  <div className="mt-4"
                            >
                           
                          <NavLink to='/forget' className=''>
                        Forget password?
                    </NavLink>
                    </div>
                    <button  type='submit'  className='btn  justify-contect-center align-items-center'>
                       
                     <span >Sign In</span>
                     </button> 
                     <div  className="d-inline-flex  icons " >

                {/* <GoogleLogin
                  clientId="363253994087-8v0st55651s53q0ni7t18i1gke5qkqpf.apps.googleusercontent.com"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                  
                       <button  className="btn" onClick={renderProps.onClick}
                      disabled={renderProps.disabled}  classNam="" ><img src={authSvg} width="30" alt="1"/></button>  
                    
                  )}
                ></GoogleLogin> */}

















         
              

                    </div>  
                    </div>
                   
                   
                       
                   
                    </form>
                    </div>
                    </div>
 


        
        <div className="col-md-6"  >
       
          <div className="" > 
         <img src={authSvg2}  className="img-fluid" alt="3" />
          </div>

        </div>
<div  className="p-5 " >
  <p className="text-center" style={{color:'black'}} >* By logging in, you agree to our   <a href="#"><span  style={{color:"blue"}} >Terms of Use</span></a>   and to receive Realback emails & updates and acknowledge that you read our  <a href="#"> <span style={{color:"blue"}}  >Privacy Policy</span></a>.</p>
</div>

      </div>


    
     </div>
    </>
  );
};

export default Login;
