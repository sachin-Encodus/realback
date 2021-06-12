import React from 'react';
import Product from './Product';



 function Main (props) {

  const { mobile, showdata, onAdd} = props;
  return (
    <>
    
   
    <div className="container ">
     
     
      <div className="row">

        {mobile.map((product) => (
          <Product key={product.id} product={product} showdata={showdata} onAdd={onAdd}></Product>
        ))}
       
    
      </div>

    </div>
    </>
  );
}


export default Main;