import React, { useEffect, useState } from "react";
import Menu from "../../screens/Menu";
import useQuery from "../../screens/Query";
import { Link } from "react-router-dom";
import axios from "axios";
const Problem = () => {
  const [selected, setSelected] = React.useState(new Map());
  const [model, setModel] = useState("");
  const [image, setImage] = useState("");
  const [devicedata, setDevicedata] = useState([]);

  const query = useQuery();
  const deviceId = query.get("deviceId");
  const probId = query.get("probId");
  const device = query.get("devicename");
  // console.log(device);
  // const dogObject = JSON.parse(dogString);
  // console.log("============>>>>>>>>>>", dogObject);

  React.useEffect(() => {
    getmodedata(deviceId);
  }, []);

  const getmodedata = async (deviceId) => {
    try {
      const res = await axios.get(`/api/getmodedata/${deviceId}`);

      console.log("====>>>>>>>>>>>xxxxxxxxxxxxxxxx", res.data.device.model);

      // setDogObject(res.data.device.model);
      getservice(res.data.device.model);
    } catch (error) {
      console.log(error);
    }
  };

  const getservice = async (probdata) => {
    try {
      const filteredData = probdata.filter((item) => item._id === probId);
      setDevicedata(filteredData[0].modedata);
      setModel(filteredData[0].modelno);
      setImage(filteredData[0].image);
      console.log("============>>>>>>>>>>", filteredData[0].modedata);
      //   console.log("============>>>>>>>>>>xxxxxxxxxxx", filteredData[0].modelno);
    } catch (error) {
      console.log("====================================", error);
    }
  };
  const onSelect = React.useCallback(
    (_id) => {
      const newSelected = new Map(selected);
      newSelected.set(_id, !selected.get(_id));

      setSelected(newSelected);
    },
    [selected]
  );

  const [cartItems, setCartItems] = useState([]);
  const scrollToTop = () => {
    window.scroll({
      bottom: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

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
  const [isVisible, setIsVisible] = useState(true);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth

  useEffect(() => {
    if (cartItems.length === 1) {
      window.scroll({
        top: document.body.offsetHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [cartItems]);
  const sdata = [];
  return (
    <div>
      <Menu />
      <section>
        <div style={{ marginTop: 100 }} className="container">
          <h1 style={{ marginBottom: 20, marginRight: 20, marginLeft: 20 }}>
            Select your {model} problem{" "}
            {/* <div className="scroll-to-top">
            {isVisible && (
              <div onClick={scrollToTop}>
                <img
                  src="https://i.postimg.cc/44Ytsk8Z/top-arrow-emoj.png"
                  alt="Go to top"
                />
              </div>
            )}
          </div> */}
          </h1>
          <div className="row" style={{ padding: 20 }}>
            {devicedata && devicedata !== undefined ? (
              devicedata.map((item) => (
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
                      // marginLeft: 20,
                      // marginRight: 20,
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
          <div className="  row " style={{ padding: 30 }}>
            {cartItems.length !== 0 && (
              <>
                <div className="col-md-12 glass">
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
                    style={{ padding: 18 }}
                    to={{
                      pathname: "/order",
                      search: `routeName=${JSON.stringify(
                        cartItems
                      )}&price=${totalPrice}&device=${device} ${model}&image=${image}`, //dog is the object to pass along
                    }}
                    class="app-btn blu flex vert  "
                  >
                    <span class="big-txt">Next</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Problem;
