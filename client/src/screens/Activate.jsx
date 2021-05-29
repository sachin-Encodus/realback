import React, { useState, useEffect } from 'react';
import authSvg from '../assests/welcome.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { NavLink } from 'react-router-dom';

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    name: '',
    token: '',
    show: true
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);

    if (token) {
      setFormData({ ...formData, name, token });
    }

    console.log(token, name);
  }, [match.params]);
  const { name, token, show } = formData;

  const handleSubmit = e => {
    e.preventDefault();

    axios.post("/api/activate-email", {token})
      .then(res => {
        setFormData({
          ...formData,
          show: false
        });

        toast.success(`hey ${res.data.message}`);
      })
      .catch(err => {
        
        toast.error(err.response.data.errors);
      });
  };

  return (
   <>
   <br/><br/><br/><br/>
   <div className='container mt-4'>
      {/* {isAuth() ? <Redirect to='/' /> : null} */}
          <ToastContainer />
      <div className="row">
        <div className="col-md-12">
 <h1 className='text-center'>
                    Welcome {name}
                </h1>


                <form  onSubmit={handleSubmit} className='form-me p-0 justify-content-center align-items-center d-flex ' >
                    <div className='mt-5 '>
                     
                        <button type='submit'
                            className=' btn  justify-contect-center align-items-center'>
                            <i className='fas fa-user-plus ' />
                            <span className='ml-3'>Activate Account</span>
                        </button>
                    
                  
                   
                       
                   </div>
                </form>
        </div>



        
      
       




      </div>
     </div>
   </>
  );
};

export default Activate;
