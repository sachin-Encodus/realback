import React, { useState } from 'react';
// import authSvg from '../assests/forget.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import authSvg2 from '../images/forget.png'
import { useEffect } from 'react';
const ForgetPassword = ({history}) => {










  const [formData, setFormData] = useState({
    email: '',
    textChange: 'Submit'
  });
  const { email, textChange } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put("/api/forgotpassword", {
          email
        })
        .then(res => {
          
            setFormData({
              ...formData,
              email: '',
            });
            toast.success(`Please check your email`);
          
        })
        .catch(err => {
        console.log(err.response)
          toast.error(err.response.data.error);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
       <>
<div className="forgot"  >
    <div className='container  login '>
     
               
          <ToastContainer />
      <div className="row  ">
        <div className="col-md-6  mb-3 ml-auto ">
<div   className="  ">
                <form className='form-me '   onSubmit={handleSubmit}>
                    <h1 className='mb-5'>Forget Password </h1>
                    <div className=''>

        <input
            className='input-block  '
            type='email' placeholder='Email'  onChange={handleChange('email')} value={email} />
                    <button  type='submit' className='btn  justify-contect-center align-items-center'>
                       
                     <span >{textChange}</span>
                     </button> 
          
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
        </div>
     </>
  );
};

export default ForgetPassword;
