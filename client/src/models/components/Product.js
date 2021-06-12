import React from 'react';
import { Link } from 'react-router-dom';
import '../../index.css'
export default function Product(props) {
  const { product, onAdd , showdata} = props;
  return (
    <>
    
    <div className="col-md-3 align-items-center justify-contect-center ">
      <br/> <br/>
      {

showdata  === true ?     <Link  onClick={() => onAdd(product)}   >
      <div className="card">
        {/* <div  style={{display:'flex', justifyContent:'center', alignItems:'center'}}  > */}
  {/* <img className="image " src={product.image} alt={product.name} /> */}
        {/* </div> */}
    
      <h3>{product.name}</h3>
      <div>{product.price}</div>
      {/* <div>
      <button className="btn" onClick={() => onAdd(product)}>Add </button>
    </div> */}
    </div>
    </Link> :null

      }
  
    </div>
    </>
  );
}
