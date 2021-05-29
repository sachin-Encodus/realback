import Header from './components/Header';
import Mobile from './components/Mobile';
import Basket from './components/Basket';
import data from './components/data';

import { useState } from 'react';
function App() {
  const { mobile } = data;
  const screen = "BP-may-home-page-banner-2.png"
  const device = "mobile"
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    
    <div className="App">
      <Header countCartItems={cartItems.length}   screen={screen}  device={device}  ></Header>
        <Basket
          screen={screen}
          device={device}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
        <div className="container">
      <div className="row">
        <Mobile mobile={mobile} onAdd={onAdd}></Mobile>
      
        
      </div>
      </div>
    </div>
  );
}

export default App;
