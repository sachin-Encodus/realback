import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { saveCartData } from '../../helpers/auth';

export default function Basket(props) {










  const { cartItems, onAdd,hidedata, countCartItems, showdata, onRemove , screen} = props;
 const currentdate = new Date();

const datetime = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

 const date = datetime;
  
// Function to generate OTP
function generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const orderOtp = generateOTP()
  console.log("=============>>>>>>bbbbbb",orderOtp);
 

console.log("date time",date);
  
  console.log("xxxxxxxxxxx", cartItems);
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const discount = 5000;
  const totalPrice = itemsPrice + taxPrice + shippingPrice - discount;
 const [next , setNext] = useState(false)
 const [formData, setFormData] =  useState({
    email: '',
    name:'',
    company: '',
     model: '',
      message: '',
      products:'',
      mode:'',
       number: '',
      country: '',
       state: '',
        city: '',
         pincode: '',
          Address: '',
    textChange: 'COD Payment'
  });



const decrease = () =>{
  toast.dark("item removed")
}


// if(cartItems.length !== 0){
//   const i = cartItems.length

// if(i+1 > cartItems.length - 1){
//   toast.dark("item added")
// }else{
//    console.log("decreasing");
// }
// }else{
//   console.log("k");
// }

       useEffect(() =>{

  
   
 
   


       let loggedIn =  JSON.parse(localStorage.getItem('user'));
       if(loggedIn !== null){
       console.log("my email",loggedIn.email);
       setFormData({
         ...formData,
         email:loggedIn.email,
         name:loggedIn.name,
     
          
       }) 


  //  fetch('https://jsonplaceholder.typicode.com/posts')
  // .then(response => response.json())
  // .then(json => 
  //   setFormData({...formData, products:json})
  //  )


  // fetch('https://jsonplaceholder.typicode.com/posts')
  // .then(response => response.json())
  // .then(json => 
  //  console.log("===,,,,,,", json)
  //  )










       }else{
       setFormData({email:"noreply@gmai.com"}) 
       }
       },[])






// const products = cartItems.map( (order) => {
//           return(`${order.productName}: ${order.name}.${order.price}.${order.qty}.${order.image} `
//             ) ;
     
//  });
// console.log(products);
  
  const { email,name, company, model, message, mode,  number, country, products,  state,  city,  pincode,   Address,  textChange } = formData;


  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value , products:cartItems});
    
  };


const getData = () => {
  if(company && model) {
showdata()
  }else{
    toast.dark('please fill')
  }
  
}


// sachin1245e@gmail.com


  const onSubmits = e => {
    e.preventDefault();

    if (email && company  && model && message && mode && number && country &&  state &&  city &&  pincode &&   Address &&  textChange ) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .post(`/api/device`, {
          email,
          name,
          company,
          model,
          message,
         products,
         mode,
         orderOtp,
         date,
         number,
         totalPrice,
         screen,
          country,
            state, 
             city,
               pincode, 
                 Address,
        })
        .then(res => {
          saveCartData(res , () => {
           setFormData({
                 ...formData,
                //  email: '',
                name:'',
                 company: '',
                 model: '',
                 message: '',
               products:'',
               mode:'',
               otp:'',
                number: '',
      country: '',
       state: '',
        city: '',
         pincode: '',
          Address: '',
              textChange: 'Submitted'
            });
         
         })
        
       toast.dark(`Order OTP has been sent to ${res.data.email}` );
        })
        .catch(err => {
          setFormData({
             ...formData,
            //  email: '',
             name:'',
             company: '',
             model: '',
             message: '',
             products:'',
             mode:'',
              number: '',
      country: '',
       state: '',
        city: '',
         pincode: '',
          Address: '',
             textChange: 'submit error'
          });
        
          toast.error(err.response.data.errors);
        });
    } else {
     
      toast.error('Please fill all fields');
    }
  };




//  const setLocalStorage = (key, value) => {
//     if (window !== 'undefined') {
//         localStorage.setItem(key, JSON.stringify(value));
//     }
// };




//  const saveCartData = (response, next) => {
//     // console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
  
//     setLocalStorage('cart',"sachin");
//     next();
// };
  






  return (
<>

 <div className="container justify-contect-center">
  
      <ToastContainer/>
      <div className="row  justify-content-center align-item-center  ">
        <div className="contact-form   justify-content-center align-item-center" >
          <div style={{display: next === true ? 'none' : 'block'}}  >
            <h1>{countCartItems}</h1>
   <div   className="form-field  serachbar  col-xl-3">
   
              <input id="city" className="input-text  js-input" type='company' placeholder='company'
                 onChange={handleChange('company')} value={company}        />        
            </div>
              <div className="form-field  serachbar col-xl-3">
              <input id="pincode" className="input-text js-input" type='model' placeholder='model'
                   onChange={handleChange('model')} value={model}        />      
            </div>
             <button className="btn"   onClick={() => getData()} >
              
              Payment Now
              </button>
        </div>
         
          </div>

                      
         <div className=" justify-content-center align-item-center">






     <form  onSubmit={onSubmits}  className="contact-form   justify-content-center align-item-center">
     <h1>Give your details </h1>
<div style={{  display:  next === true ? 'block' : 'none' }}  >
            <div className="form-field serachbar justify-content-center align-item-center col-xl-3">
              <input id="city" className="input-text js-input" type='email' placeholder='email'
                   onChange={handleChange('email')} value={email}      disabled     />

            </div>
              <div class="form-field serachbar col-xl-3">

                            <input  onChange={handleChange('name')} class="input-text js-input" placeholder="Full Name" value={name} type="text" />

                        </div>
            
          
                   
             
             
             <div class="form-field col-xl-3">
                            <input onChange={handleChange('number')} class="input-text js-input"  value={number} placeholder="Mobile" type="num"
                                maxlength="10"  />

                        </div>
                             <div class="form-field col-xl-3">
                          
                             <input onChange={handleChange('country')}class="input-text js-input" placeholder="Country" type="string"
                                 value={country}  />
                                 

                        </div>
          
             <div className="form-field col-xl-9">
                <input id="Address" className="input-text js-input" name="message"  
                 onChange={handleChange('message')} value={message} 
                  placeholder="Please type here if your problem is not mentioned in the above section." type="text" />

              </div>

                      
                        <div class="form-field col-xl-3">
                            <input onChange={handleChange('state')} class="input-text js-input" placeholder="State"         value={state} type="text" />

                        </div>
                        <div class="form-field col-xl-3">
                            <input onChange={handleChange('city')}  class="input-text js-input" placeholder="City"     value={city}type="text" />

                        </div>
                        <div class="form-field col-xl-3">
                            <input onChange={handleChange('pincode')}  class="input-text js-input" placeholder="Pincode"  value={pincode} type="number"
                                />

                        </div>

                        <div class="form-field col-xl-6">
                            <input onChange={handleChange('Address')}   class="input-text js-input" placeholder="Address"    value={Address} type="text"
                                />

                        </div>
                        {/* <Link className="btn"  style={{padding:10}}  onClick={() => {showdata(); setNext(true);}} >Next</Link> */}
               <div >
              
             <Link to="/paymentme"><button className="btn"  style={{display:'block'}}  type="submit" onClick={() =>   setFormData({ 
                 ...formData,
                 mode:"COD"
       })} >

              {textChange}
              </button></Link> 
           
                <button className="btn"   onClick={() =>  setFormData({ 
                 ...formData,
                 mode:"online "
       })} >
              
              Payment Now
              </button>

            </div>
</div>

{/* https://signal-clone-f1ebb.web.app/ */}



    <aside className="container">
      <div style={{display: next === true ? 'none' : 'block'}}  >
      
        {cartItems.map((item) => (
          <div key={item.id} className="row">
             <div className="col-md-4"><img src={item.image} className="image-cart d-flex"   alt=""/><p style={{fontSize:17 , color:"#171717"} }  >{item.name}</p></div>
            {/* <div className="col-2">{item.name}</div> */}
      
            <div className=" col-md-4" >
              <a  onClick={() => { decrease(); onRemove(item);}} style={{width:'30px', height:'40px' ,fontSize:"25px", borderRadius:'10px' , marginLeft:30,  padding: '0 0.4rem'}} className="btn">x</a>

                
              {/* <a  onClick={() => onAdd(item)} style={{width:'30px', height:'40px' , fontSize:"25px", borderRadius:'10px' ,marginLeft:10,  padding:' 0 0.2rem'}} className="btn">+</a> */}
            </div>

            <div className="col-md-4 text-right-1">
               {item.price.toFixed(2)} 
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">{itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">{taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                {shippingPrice.toFixed(2)}
              </div>
            </div>

  <div className="row">
              <div className="col-2">discount</div>
              <div className="col-1 text-right">
                {discount.toFixed(2)}
              </div>
            </div>
            <div className="row">
              <div className="col-2  mt-2">
                Total Price
              </div>
              <div  className="col-1 text-right  mt-2">
                {totalPrice.toFixed(2)}
              </div>
            </div>
            <hr />
        <Link onClick={() => {hidedata();  setNext(true)} }  ><button className="btn"  style={{display:'block'}}   >

              Next
              </button></Link>
          </>
        )}
      </div>
    </aside>
    </form>
</div>
</div>
</div>
    </>
  );
}








  // products:[
  //       {
  //              productName:{
  //               type:String,
  //               required:true
  //            },
                
  //              name:{
  //               type:String,
  //            },
  //            price:{
  //               type:String, 
  //            },
          
  //            image:{
  //               type:String,
               
  //            },
  //             qty:{
  //               type:String,
               
  //            },
  //       }
  //     ],