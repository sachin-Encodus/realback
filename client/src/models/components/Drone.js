import React from 'react';
import Product from './Product';



 function Main (props) {

  const { drone, onAdd} = props;
  return (
    <>
    
   
    <main className="container ">
       <br/><br/>
     
      <div className="row">

        {drone.map((product) => (
          <Product key={product.id} product={product} onAdd={onAdd}></Product>
        ))}
       
    
      </div>

    </main>
    </>
  );
}


export default Main;