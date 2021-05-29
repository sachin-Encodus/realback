import React from 'react';
import Product from './Product';



 function Main (props) {

  const { airpod, onAdd} = props;
  return (
    <>
    
   
    <div className="container">
       <br/><br/>
      <div className="row">
        {airpod.map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd}></Product>
        ))}
      </div>
    </div>
    </>
  );
}


export default Main;