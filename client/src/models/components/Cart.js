import React,{useState, useEffect} from 'react';
import {  isAuth } from "../../helpers/auth"
import Menu from '../../screens/Menu';
import axios from 'axios';
import {  Redirect } from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";
 import { IoBagCheck } from "react-icons/io5";
 import logo from '../../images/real.jpg'
export default function Cart(props) {


const [userdata, setUserdata] = useState([])
const [email, setEmail] = useState('noreply@gmai.com')
 const [payments , setPayments] = useState(false)
  const [orderId , setOrderId] = useState("")
  const [signature, setSignature] = useState('')
  const [paymentID, setPaymentID] = useState('')
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

var val = Math.floor(1000 + Math.random() * 9000);
console.log(val);

var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
console.log(seq);



const payment = async(_id) =>{

 console.log("=====>>>>>", _id);

var Data =  userdata.filter(hero =>{
	return hero._id === _id;
});

  const payData =  Data[0]
  const {totalPrice , email, name ,number } = payData
  console.log(totalPrice ,email, name ,_id, number);
// const Mydata = Data.map(item => {
//   return console.log(item.totalPrice);
// })

// const myJSON = JSON.stringify(Data);

  const  res = await axios
        .get(`/api/payment/${totalPrice}/`)
       
console.log("========>>>>>>>>>", res.data.amount);

if(res.status !== 200){
  return;
}


   const options = {
    "key": "rzp_live_yim6z2vfc3HOs6", // Enter the Key ID generated from the Dashboard
    "amount":  res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": res.data.currency,
    "name": "Realback",
    "description": "paying to realback",
    "image": logo,
    "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)
        setPaymentID(response.razorpay_payment_id)
        setOrderId(response.razorpay_order_id)
        setSignature(response.razorpay_signature)
        setPayments(true)
        // toast.dark("payment Successfull")
    },
    "prefill": {
        "name":name ,
        "email": email,
        "contact": number
    },
    "notes": {
        "address": _id
    },
    // "theme": {
    //     "color": "#3399cc"
    // }
};
 
      var rzp1 = new   window.Razorpay(options);

      rzp1.open()
      rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});



  
  
  
}





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

 <h6 style={{fontFamily:'sans-serif'}}>{item.mode}</h6>
 
</div>


<div style={{justifyContent:'space-between' , display:'flex'}} >
<h5 style={{fontFamily:'sans-serif' ,}}  > Total</h5>

 <h5 style={{fontFamily:'sans-serif' ,}}  > ₹ {item.totalPrice}</h5>

</div>
{

item.mode === "online" ?  <button className="btn"   onClick={() => payment(item._id)}>
              
              Payment Now
              </button> : null 

}

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
     {
       userdata.length === 0 ? <h1  style={{textAlign:'center' , marginTop: 20}}   >Sorry You don't have any order</h1> : list
     }
  
     
    
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













