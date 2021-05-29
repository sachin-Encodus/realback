import Header from './components/Header';
import Laptop from './components/Laptop';
import Basket from './components/Basket';
import data from './components/data';

import { useState } from 'react';
function App() {
  const { laptop } = data;
  const screen = "33420-2-asus-laptop-transparent-picture.png"
    const device = "laptop"
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
      <Header  screen={screen}   device={device} countCartItems={cartItems.length}></Header>
        <Basket
          device={device}
         screen={screen}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      <div className="row">
        <Laptop laptop={laptop} onAdd={onAdd}></Laptop>
      
        
      </div>
      
    </div>
  );
}

export default App;
