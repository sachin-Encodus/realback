import React from 'react';
import Product from './Product';



 function Main (props) {

  const { mobile, onAdd} = props;
  return (
    <>
    
   
    <div className="container ">
       <br/><br/>
     
      <div className="row">

        {mobile.map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd}></Product>
        ))}
       
    
      </div>

    </div>
    </>
  );
}


export default Main;