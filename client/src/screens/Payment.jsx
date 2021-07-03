import React, {useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import logo from '../images/real.jpg'

const Payment = ({props ,match}) =>{
    // const params = useParams()
// const {params} = props;
// const {payds} = params
console.log('====================================',props);

    console.log('====================================>>>>>>', JSON.parse( match.params));
  
    const {totalPrice, name, email, number , _id } = match.params;
  const [payments , setPayments] = useState(false)
  const [orderId , setOrderId] = useState("")
  const [signature, setSignature] = useState('')
  const [paymentID, setPaymentID] = useState('')
// var car = {
//     type:"Fiat",
//      model:"500"
//      , color:"white"
//     };

// const totalPrice = "500"
useEffect(() => {


 
    // let { name } = jwt.decode(token);

   

     console.log(totalPrice, name , email, number, _id );





  payment()
}, [])

  const payment = async() =>{
 console.log(">>>>>>> id for payment update");
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
        toast.dark("payment Successfull")
    },
    "prefill": {
        "name":name,
        "email": email,
        "contact": number
    },
    "notes":{
        "address":''
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






return(

<>

<h1>{name}</h1>

  <h1>{totalPrice}</h1>
  <h1>{email}</h1>
   <h1>{number}</h1> 
</>


);


}

export default Payment;