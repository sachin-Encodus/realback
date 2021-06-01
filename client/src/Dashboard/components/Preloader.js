
import React from 'react';
import { Image } from '@themesberg/react-bootstrap';



export default (props) => {

  const { show } = props;

  return (
    <div  style={{backgroundColor:'#000' , display: show ? "flex" : 'none'}}  className={`preloader  flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
      <Image className=" animate__animated animate__jackInTheBox"  src={process.env.PUBLIC_URL+"m18.png"} height={80} />
      <h1>Realback</h1>
    </div>
  );
};
