import React from 'react';
import Product from './Product';



 function Main (props) {

  const { drone, showdata, onAdd} = props;
  return (
    <>
    
   
    <main className="container ">
       <br/><br/>
     
      <div className="row">

        {drone.map((product) => (
          <Product key={product.id} product={product}  showdata={showdata} onAdd={onAdd}></Product>
        ))}
       
    
      </div>

    </main>
    </>
  );
}


export default Main;