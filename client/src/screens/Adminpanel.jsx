import React, { useState, useEffect } from 'react';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
const Adminpanel = () => {
    return (
        <div>
                { isAuth() && isAuth().role === 'admin' ? null   :  <Redirect to='/' />}  
        </div>
    )
}

export default Adminpanel;
