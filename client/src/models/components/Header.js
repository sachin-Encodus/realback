import React from 'react';
import '../../cart.css'
import {Link} from 'react-router-dom';
 import { IoBagCheck } from "react-icons/io5";
export default function Header(props) {
 
const { device} = props

  return (

    <>
    <br/><br/><br/><br/>
    <div className="container-fluid">
      <div className="row">
      <div className="col-md-6 text-center">
      
          <h1>Select your {device} problem</h1>
        
  
      </div>
      <div className="col-md-6 text-center  ">
        <Link to="/cart">
         <IoBagCheck size='40'/>
          {props.countCartItems ? (
            <button style={{width:'30px', height:'40px' ,fontSize:"20px", borderRadius:'10px' , padding: '0 0.4rem'}}  className="btn">{props.countCartItems}</button>
          ) : (
            ''
          )}
        </Link>
        
        {/* <a href="/basket">go to cart</a> */}
      </div>
      </div>
    </div>
    </>
  );
}
