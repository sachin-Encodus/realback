import Header from './components/Header';
import Led from './components/Led';
import Basket from './components/Basket';
import data from './components/data';

import { useState } from 'react';
function App() {
  const { led } = data;
  const screen = "Led"
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
      <Header  screen={screen} countCartItems={cartItems.length}></Header>
        <Basket
         screen={screen}
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
        ></Basket>
      <div className="row">
        <Led led={led} onAdd={onAdd}></Led>
      
        
      </div>
      
    </div>
  );
}

export default App;
