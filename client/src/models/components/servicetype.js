import React, { useEffect, useState } from "react";

const servicetype = () => {
  const [selected, setSelected] = React.useState(new Map());
  const onSelect = React.useCallback(
    (_id) => {
      const newSelected = new Map(selected);
      newSelected.set(_id, !selected.get(_id));

      setSelected(newSelected);
    },
    [selected]
  );

  const [cartItems, setCartItems] = useState([]);

  console.log("====================================", cartItems);

  const onAdd = (item) => {
    const exist = cartItems.find((x) => x._id === item._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === item._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }
  };
  const onRemove = (item) => {
    const exist = cartItems.find((x) => x._id === item._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== item._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === item._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = 0.0;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const discount = itemsPrice > 2000 ? 200 : 20;
  const totalPrice = itemsPrice - discount + shippingPrice;

  return <div></div>;
};

export default servicetype;
