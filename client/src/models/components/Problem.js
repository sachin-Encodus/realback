import React, { useEffect, useState } from "react";
import Menu from "../../screens/Menu";
import useQuery from "../../screens/Query";
import { Link } from "react-router-dom";
const Problem = () => {
  const [selected, setSelected] = React.useState(new Map());

  const query = useQuery();
  const dogString = query.get("routeName");
  const dogObject = JSON.parse(dogString);
  console.log("============>>>>>>>>>>", dogObject);

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

  const [userdata, setUserdata] = useState([]);
  // const [email, setEmail] = useState("noreply@gmail.com");
  const [loading, setLoading] = useState(false);
  const sdata = [];
  return (
    <div>
      <Menu />
      <div style={{ marginTop: 100 }} className="container">
        <h1 style={{ marginBottom: 20 }}>Select your device problem</h1>
        <div className="row">
          {dogObject && dogObject !== undefined ? (
            dogObject.map((item) => (
              <div className="col-md-4">
                <div
                  key={item._id}
                  style={{
                    backgroundColor: !!selected.get(item._id)
                      ? "#000"
                      : "rgb(245, 245, 247)",

                    padding: 18,
                    marginTop: 10,
                    marginVertical: 8,
                    marginHorizontal: 30,
                    borderRadius: 15,
                  }}
                >
                  <div
                    onClick={() => {
                      onSelect(item._id);
                      !!selected.get(item._id) ? onRemove(item) : onAdd(item);
                    }}
                  >
                    <div
                      key={item._id}
                      style={{
                        justifyContent: "space-between",
                        display: "flex",
                      }}
                    >
                      <h3
                        style={{
                          color: !!selected.get(item._id) ? "white" : "black",
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                      >
                        {item.name}
                      </h3>

                      <h3
                        style={{
                          color: !!selected.get(item._id) ? "white" : "black",
                          fontSize: 17,
                          fontWeight: "bold",
                        }}
                      >
                        Rs. {item.price}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>no data to show</h1>
          )}
        </div>
        <div className="  row ">
          {cartItems.length !== 0 && (
            <>
              <div className="col-md-12 p-3 glass">
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    marginBottom: 5,
                  }}
                >
                  <div className="">Items Price</div>
                  <div className="">{itemsPrice.toFixed(2)}</div>
                </div>

                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    marginBottom: 5,
                  }}
                >
                  <div>Tax Price</div>
                  <div>{taxPrice.toFixed(2)}</div>
                </div>

                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    marginBottom: 5,
                  }}
                >
                  <div>Shipping Price</div>
                  <div>{shippingPrice.toFixed(2)}</div>
                </div>

                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    marginBottom: 5,
                  }}
                >
                  <div>discount</div>
                  <div>{discount.toFixed(2)}</div>
                </div>

                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    marginBottom: 5,
                  }}
                >
                  <div>Total Price</div>
                  <div>{totalPrice.toFixed(2)}</div>
                </div>

                <Link
                  to={{
                    pathname: "/order",
                    search: `routeName=${JSON.stringify(cartItems)}`, //dog is the object to pass along
                  }}
                >
                  <button className="btn" style={{ display: "block" }}>
                    Next
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Problem;
