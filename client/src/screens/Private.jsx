
import React, { useState, useEffect } from 'react';
import authSvg from '../assests/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { NavLink, Redirect } from 'react-router-dom';

const Admin = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    textChange: 'Update',
    role: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const token = getCookie('jwt');

const myid = isAuth()._id;
console.log(myid);

// "http://localhost:5000/api/user/601c364318540a209c9a9a08"

    axios
      .get(`/api/user/${isAuth()._id}` , {
        headers: {
          Authorization: `Bearer ${token}`
           
        }
        
      })
  
      .then(res => {
        const { role, name, email } = res.data;
        setFormData({ ...formData, role, name, email });
         toast.success("success To Your Information" );
         console.log(res.data);
      })
      .catch(err => {
        toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            history.push('/login');
          });
        }
      });
  };
  const { name, email, password1, textChange, role } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  
  const handleSubmit = e => {
    const token = getCookie('jwt');
    console.log(token);
    e.preventDefault();
    setFormData({ ...formData, textChange: 'Submitting' });
    axios
      .put(
       "http://localhost:5000/api/user/update",
        {
          role,
          name,
          email,
          password: password1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        updateUser(res, () => {
          toast.success('Profile Updated Successfully');
          setFormData({ ...formData, textChange: 'Update' }); 
        });
      })
      .catch(err => {
        console.log(err.response);
          toast.error(err.response.data.errors);
      });
  };

   if( isAuth() && isAuth().role === 'user'){
console.log("User");
    }else{
        console.log("User");
    }
       

  return (
   
    <>
      <div className='container  login'>
         { isAuth() && isAuth().role === 'user' ? null   :  <Redirect to='/' />}  
          <ToastContainer /> 
          <h1 className='text-center mt-4'>
                Update My Profile
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
                 className="input-block"
                  type='text'
                  placeholder='Name'
           onChange={handleChange('name')}
                  value={name}
                />


                        <input
              disabled
                  className='input-block'
                  type='text'
                  placeholder='Role'
                  value={role}
                />

 
                        <input
                 className="input-block"
                  type='email'
                  placeholder='Email'
                  disabled
                  value={email}
                />
               

                <input
                 className="input-block"
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password1')}
                  value={password1}
                />

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

export default Admin;












//  <form
//               className='w-full flex-1 mt-8 text-indigo-500'
//               onSubmit={handleSubmit}
//             >
//               <div className='mx-auto max-w-xs relative '>
//                 <input
//                   disabled
//                   className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
//                   type='text'
//                   placeholder='Role'
//                   value={role}
//                 />
//                 <input
//                   className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
//                   type='email'
//                   placeholder='Email'
//                   disabled
//                   value={email}
//                 />
//                 <input
//                   className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
//                   type='text'
//                   placeholder='Name'
//                   onChange={handleChange('name')}
//                   value={name}
//                 />

//                 <input
//                   className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
//                   type='password'
//                   placeholder='Password'
//                   onChange={handleChange('password1')}
//                   value={password1}
//                 />
//                 <button
//                   type='submit'
//                   className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
//                 >
//                   <i className='fas fa-user-plus fa 1x w-6  -ml-2' />
//                   <span className='ml-3'>{textChange}</span>
//                 </button>
//               </div>
//               <div className='my-12 border-b text-center'>
//                 <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
//                   Go To Home
//                 </div>
//               </div>
//               <div className='flex flex-col items-center'>
//                 <a
//                   className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
//            bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
//                   href='/'
//                   target='_self'
//                 >
//                   <i className='fas fa-sign-in-alt fa 1x w-6  -ml-2 text-indigo-500' />
//                   <span className='ml-4'>Home</span>
//                 </a>
//               </div>
//             </form>






