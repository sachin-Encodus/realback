import React from 'react';
import '../../index.css'
export default function Product(props) {
  const { product, onAdd } = props;
  return (
    <>
    
    <div className="col-md-3  align-items-center justify-contect-center align-content-center">
      <br/> <br/>
      <div className="card">
        <div  style={{display:'flex', justifyContent:'center', alignItems:'center'}}  >
  <img className="image " src={product.image} alt={product.name} />
        </div>
    
      <h3>{product.name}</h3>
      <div>{product.price}</div>
      <div>
      <button className="btn" onClick={() => onAdd(product)}>Add </button>
    </div>
    </div>
    </div>
    </>
  );
}
