import React,{useState, useEffect} from 'react';
import {  isAuth } from "../../helpers/auth"
import Menu from '../../screens/Menu';
import axios from 'axios';
import {  Redirect } from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";
 import { IoBagCheck } from "react-icons/io5";
export default function Cart(props) {


const [userdata, setUserdata] = useState([])
const [email, setEmail] = useState('noreply@gmai.com')

console.log("mmmmmmmmmmm========>>>>>>>>>>",email);


useEffect(() => {




   let loggedIn =  JSON.parse(localStorage.getItem('user'));
       if(loggedIn !== null){
       console.log("my email",loggedIn.email);
       setEmail(loggedIn.email) 
     
       }else{
       setEmail({email:"noreply@gmai.com"}) 
       console.log("=====", email);
       }

 cartdata()

}, [email])










console.log(email);
console.log("====>>>>>>>>>>yyyyy",userdata);
// const products = data.map( (order) => {
//           return(`${order.productName}: ${order.name}.${order.price}.${order.qty} `
//             ) ;
     
//  });

const cartdata = () =>{
  
  axios.get(`/api/cart/${email}`,)
  .then(({data})=> setUserdata(data.user))
  .catch(err =>{

console.log(err);

  })

}

const list   =  userdata.map(item => {
  return(

  
        
           <>
         
          <hr/>
        
               <div  style={{ fontFamily:'sans-serif', marginTop:20, padding:20, borderRadius:10}}  >
            <div    key={item.id} className="row   ">
            
    
            <div className="col-md-2 mb-5  "   >
                <>
        
              <img   src={process.env.PUBLIC_URL+ `images/${item.screen}`} alt="" className="img-fluid"/>
            
                
             
                </>
              
           
           
            </div>
      <div className="col-md-6  "   >
        <div >

 <h3 style={{fontFamily:'sans-serif'}}   >{item.company}  {item.model}</h3>
        
        <p style={{fontFamily:'sans-serif'}}  >  {item.message}</p>
          <p style={{fontFamily:'sans-serif' , display:'inline-flex' , marginRight:10}}  >  {item.Address}</p>
          <MdLocationOn  size='25' />
           <p style={{fontFamily:'sans-serif'}}  > Order code : {item.orderOtp}</p>
  <p style={{fontFamily:'sans-serif'}}  >  {item.date}</p>

        </div>
       
      </div>
           
 {/* <div className="col-2 text-right-1">
              <hr/>
     
            </div> */}
           
            <div className="col-md-4 ">
            
     {/* <p>payment {item.mode}</p> */}
     
<hr/>
<div style={{justifyContent:'space-between' , display:'flex'}}   >
  <p style={{fontSize:17 , color:"#171717", fontFamily:'sans-serif' ,} }  >Service type : </p>
<div>
{item.products.map(prod => {
              return(
                <>
        
             
                <p style={{fontSize:17 , color:"#171717", fontFamily:'sans-serif' ,  } }  >{prod.name}</p>
                
             
                </>
              )
            })}
  </div>
</div>


<hr/>
<div style={{justifyContent:'space-between' , display:'flex'}} >
<h5 style={{fontFamily:'sans-serif' ,}}  > payment </h5>

 <h6 style={{fontFamily:'sans-serif' ,}}  >{item.mode}</h6>

</div>


<div style={{justifyContent:'space-between' , display:'flex'}} >
<h5 style={{fontFamily:'sans-serif' ,}}  > Total</h5>

 <h5 style={{fontFamily:'sans-serif' ,}}  > ₹ {item.totalPrice}</h5>

</div>


            </div>
            </div>
            </div>
              <br/>
          <br/>
          <br/>
            </>
        
)})



  return (
<>


         

{/* https://codepen.io/Timeto/pen/RwoMwMj?editors=1000 */}
{/* https://signal-clone-f1ebb.web.app/ */}


   <Menu/>
   <br/>
    <div className="container mt-5">
      {!isAuth() ? <Redirect to='/login' /> : null}
     
      <h1 style={{fontFamily:'sans-serif'}}  >Review your orders</h1>
      <h5 style={{fontFamily:'sans-serif'}}  >Free delivery and free returns</h5>
    <br/>
       <h2 style={{fontFamily:'sans-serif'}}  >{email}</h2>
   <br/>
     <div  style={{backgroundColor:'#f5f5f7' ,fontFamily:'sans-serif',  padding:20, textAlign:'center', borderRadius:10}}  >  <IoBagCheck size='25'/>  Pay $13.90/mo.per month¹ at 0% APR for eligible items in your order with Apple Card Monthly Installments.</div>
     <br/>
     
  {list}
     
    
     <hr/>

      
     
    </div>
 
    </>
  );
}










// CLIENT_URL
// https://realback4c.herokuapp.com

// EMAIL
// realback4c@gmail.com

// JWT_ACC_ACTIVATE
// accountactivateusingtoverifyemail

// JWT_ACCOUNT_ACTIVATION
// accountactivateusingtoverifygemail

// JWT_RESET_PASSWORD
// accountactivateusingtoverifygemailsachin

// MONGO_URI
// mongodb+srv://realback4c:02may2018@cluster0.fce46.mongodb.net/realback?retryWrites=true&w=majority

// PASS
// bmqkbsakoddlgxgy

// SECRET_KEY
// mynameisrealbackcompanyhellowelcome













