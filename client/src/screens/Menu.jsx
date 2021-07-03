import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import { FaServer } from "react-icons/fa";
import ReactTooltip from 'react-tooltip';

import {  signout }  from '../helpers/auth';
import '../order.css';



       const Menu = () => {  
          
       const [login, setLogin] = useState('');
       const [logout, setLogout] = useState("logout");

       useEffect(() =>{
       let loggedIn =  JSON.parse(localStorage.getItem('user'));
       if(loggedIn !== null){
       console.log(loggedIn.name);
       setLogin(loggedIn.name) 
       }else{
       setLogin('') 
       }
       },[logout])


    //    https://codepen.io/GA-MO/pen/yJzERy?editors=0110
      
    //   function mylogin(){
    //    let loggedIn =  JSON.parse(localStorage.getItem('user'));
    //    if(loggedIn !== null){
    //    console.log(loggedIn.name);
    //    setLogin(loggedIn.name) 
    //    }else{
    //    setLogin("login") 
    //    }
     
    //    }
    
       const Hello = () =>{
       setLogout("logged out")
       }  
      
//   const navBar = document.getElementById("navBars");
//       window.onscroll = function() {
//         if (window.scrollY > 22) {
//           navBar.classList.add("scrolled");
//         } else {
//           navBar.classList.remove("scrolled");
//         }
//       };

   
    


  

// function loginame (){

// let login = "realback";
// console.log(login)


// }
//  }
 
//   }


// const loggedIn = () =>{
// // let loggedIn =  JSON.parse(localStorage.getItem('user'));

//  setLogin("Rohit")
// console.log(loggedIn);

// }


// let loggedIn =  JSON.parse(localStorage.getItem('user'));

// console.log(loggedIn);

// setLogin("Rohit");
// if(isAuth){
//     let loggedIn =  JSON.parse(localStorage.getItem('user'));
//    setLogin(loggedIn.name)
// }else{
// console.log(login)
// }
     


// (function(){
//     const burger = document.querySelector('.burger-container'),
//         header = document.querySelector('.header');
    
//     burger.onclick = function() {
//         header.classList.toggle('menu-opened');
//     }
// }());

 const mymenu =() => {
         const burger = document.querySelector('.burger-container'),
        header = document.querySelector('.header');


        header.classList.toggle('menu-opened');
      
    }


 return (
<>

    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
    <div className="container-fluid">
        <NavLink className="navbar-brand js-scroll-trigger" to="#page-top">Realback</NavLink>
        <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav  ml-auto">

  <input type="submit" value="" className="search-submit"/>
  <input type="search" name="" className="search-text" placeholder="Search..." autocomplete="on"/>
    <li className="nav-item "><NavLink className="nav-link js-scroll-trigger  "  to="/">Home</NavLink></li>
     <li className="nav-item "><NavLink className="nav-link js-scroll-trigger  "  to="/service">Services</NavLink></li>
     <li className="nav-item"><NavLink className="nav-link js-scroll-trigger" to="/about">About</NavLink></li>
      <li className="nav-item"><NavLink className="nav-link js-scroll-trigger" to="/cart">Orders</NavLink></li>
       {/* <li className="nav-item"><NavLink className="nav-link js-scroll-trigger" to="/payment">dashboard</NavLink></li> */}
     {

login ===  '' ?  <li className="nav-item"><NavLink onClick={Hello} className="nav-link js-scroll-trigger" to="/login">Login</NavLink></li>  :[ <li className="nav-item"><NavLink 
       onClick={() => {signout(() => {Hello() });
    
    }}


    
     className="nav-link js-scroll-trigger"   to="/logout"><p data-tip="Tap to Logout"
    data-type="warning"   >{login}</p></NavLink></li> ,
    <ReactTooltip />
]


     }
    
    
      {/* <li className="nav-item"><NavLink onClick={mylogin} className="nav-link js-scroll-trigger" to="/">check</NavLink></li> */}
    
{/* <button style={{ }} onClick={mylogin}>check</button> */}
    </ul> 
    </div>
    </div>
    </nav>

{/* mobile menu */}
{/* 

<div className="mobile">
    <div className="window">
        <div className="header">
            <div className="burger-container">
                <div id="burger">
                    <div className="bar topBar"></div>
                    <div className="bar btmBar"></div>
                </div>
            </div>

            <div className="icon icon-apple">
                <NavLink className="js-scroll-trigger" to="#page-top">
                </NavLink>
            </div>




            <form className="form-search" method="get" action="#">
                <input type="search" name="search" placeholder="search your book here for.." />
                <button type="submit">Search</button>

            </form>
            <ul className="menu">



                <li className="menu-item">
                    <NavLink to="realbackroderform.html">order</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="aboutus11.html">about</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="#">contact</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="index4.html">Services</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="#">TV</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="#">Music</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="signinupform.html">signIn</NavLink>
                </li>

            </ul>

            <div className="shop icon icon-bag">
                <NavLink to="signinupform.html"><i className="fas fa-user "></i></NavLink>
            </div>
        </div>
        <div className="content">
        </div>
    </div>
</div> */}


{/* 
mobile menu */}
<div className="mobile">
    <div className="window">
        <div className="header">
            <div className="burger-container">
                <div id="burger" onClick={mymenu}   >
                    <div className="bar topBar"></div>
                    <div className="bar btmBar"></div>
                </div>
            </div>

            <div className="icon icon-apple">
                <NavLink className="js-scroll-trigger" to="#page-top"><img src={process.env.PUBLIC_URL+"images/m18.png"} className="logos" />
                </NavLink>
            </div>




            {/* <form className="form-search" method="get" action="#">
                <input type="search" name="search" placeholder="search your book here for.." />
                <button type="submit">Search</button>

            </form> */}
            <ul className="menu">
 
             <li className="menu-item">
                    <NavLink to="/">Home</NavLink>
                </li>
 <li className="menu-item">
                    <NavLink to="/cart">Orders</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/service">Service</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="/about">about</NavLink>
                </li>
                <li className="menu-item">
                    <NavLink to="#">contact</NavLink>
                </li>
  <li className="menu-item">
                    <NavLink to="#">Donate to realback</NavLink>
                </li>

                {
login === '' ? <li className="menu-item">
                    <NavLink to="/login">Login</NavLink>
                </li> :  <li className="menu-item">
                    <NavLink 
                    
                          onClick={() => {signout(() => {Hello() }); }}
                    
                    
                    to="/logout">{login}</NavLink>
                </li>

                }
               
                
               
               
            </ul>

            <div className="shop icon icon-bag">
                {

login === '' ?   <NavLink to="/login"><i className="fas fa-user " style={{color: "white"}}></i></NavLink> : 
                        <NavLink to="/service"><FaServer color='white'  /></NavLink>

                }
              
            </div>
        </div>
        <div className="content">
        </div>
    </div>
</div>
</>

 );

}


export default Menu;

