import React from 'react';
import Product from './Product';



 function Main (props) {

  const { airpod, showdata, onAdd} = props;
  return (
    <>
    
   
    <div className="container">
       <br/><br/>
      <div className="row">
        {airpod.map((product) => (
          <Product key={product.id} product={product} showdata={showdata} onAdd={onAdd}></Product>
        ))}
      </div>
    </div>
    </>
  );
}


export default Main;