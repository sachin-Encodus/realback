import React, { useState } from "react";
import Update from "../images/update.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const OrderUpdate = () => {
  const [orderOtp, setOrderOtp] = useState("");
  const [order, setOrder] = useState("");
  const [fetch, setFetch] = useState(false);
  const { email, _id, name, status } = order;
  const userId = _id;
  const id = orderOtp.toString();
  console.log(order);
  const onSubmits = async () => {
    try {
      const res = await axios.get(`/api/cartOtp/${id}`);
      setOrder(res.data.user);
      if (res !== "undifined") {
        setFetch(true);
      }
      console.log("plese valid");
    } catch (error) {
      toast.dark(error.response.data.err);
    }
  };
  const handleChange = (e) => {
    // alert(e.target.value);

    const value = e.target.value;
    update(value);
  };

  const update = async (value) => {
    try {
      const res = await axios.post("/api/status", {
        userId,
        value,
        email,
      });
      setOrder(res.data.result);
    } catch (error) {
      toast.dark(error.response.data.error);
    }

    // console.log("oppp==========", res.data.result);
  };

  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div>
                {/* <img src={Update} alt="up" className="img-fluid" /> */}
              </div>
            </div>
            <div className="col-md-8">
              <h1>Update the Order Now</h1>
              {order !== null ? (
                <div className="text-canter">
                  <h3>{email}</h3>
                  <h3>{name}</h3>
                  <h3>{status}</h3>
                </div>
              ) : null}
              {fetch ? (
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,

                    margin: "auto",
                    backgroundColor: "rgb(245, 245, 247)",
                    borderRadius: "15px",
                    marginBottom: 10,
                  }}
                >
                  <select
                    className=""
                    placeholder="Select Brand"
                    style={{
                      paddingLeft: 20,
                      fontSize: 20,
                    }}
                    // value={data.find((obj) => obj.value === selectedValue)} // set selected value
                    // set list of the data
                    onChange={handleChange} // assign onChange function
                  >
                    <option value="orderd"> orderd</option>
                    <option value="picked"> picked</option>
                    <option value="patner store"> patner store</option>
                    <option value="repaired">repaired</option>
                    <option value="deliverd"> deliverd</option>
                  </select>
                </div>
              ) : null}
              <div className="contact-form ">
                <div className="form-field col-md-6 ">
                  <input
                    className="input-text js-input"
                    type="number"
                    placeholder="Enter otp"
                    onChange={(e) => setOrderOtp(e.target.value)}
                    value={orderOtp}
                  />
                </div>
              </div>
              <div>
                <Link
                  style={{ padding: 20 }}
                  onClick={() => onSubmits()}
                  class="app-btn blu flex vert  "
                >
                  <span class="big-txt">Service</span>
                </Link>
              </div>
            </div>
            <div class="container px-1 px-md-4 py-5 mx-auto">
              <div class="card">
                <div class="row d-flex justify-content-between px-3 top">
                  <div class="d-flex">
                    <h5>
                      ORDER{" "}
                      <span class="text-primary font-weight-bold">
                        #Y34XDHR
                      </span>
                    </h5>
                  </div>
                  <div class="d-flex flex-column text-sm-right">
                    <p class="mb-0">
                      Expected Arrival <span>01/12/19</span>
                    </p>
                    <p>
                      USPS{" "}
                      <span class="font-weight-bold">
                        234094567242423422898
                      </span>
                    </p>
                  </div>
                </div>
                <div class="row d-flex justify-content-center">
                  <div class="col-12">
                    <ul id="progressbar" class="text-center">
                      <li class="active step0"></li>
                      <li class="active step0"></li>
                      <li class="active step0"></li>
                      <li class="step0"></li>
                    </ul>
                  </div>
                </div>
                <div class="row justify-content-between top">
                  <div class="row d-flex icon-content">
                    {" "}
                    <img class="icon" src="https://i.imgur.com/9nnc9Et.png" />
                    <div class="d-flex flex-column">
                      <p class="font-weight-bold">
                        Order
                        <br />
                        Processed
                      </p>
                    </div>
                  </div>
                  <div class="row d-flex icon-content">
                    {" "}
                    <img class="icon" src="https://i.imgur.com/u1AzR7w.png" />
                    <div class="d-flex flex-column">
                      <p class="font-weight-bold">
                        Order
                        <br />
                        Shipped
                      </p>
                    </div>
                  </div>
                  <div class="row d-flex icon-content">
                    {" "}
                    <img class="icon" src="https://i.imgur.com/TkPm63y.png" />
                    <div class="d-flex flex-column">
                      <p class="font-weight-bold">
                        Order
                        <br />
                        En Route
                      </p>
                    </div>
                  </div>
                  <div class="row d-flex icon-content">
                    {" "}
                    <img class="icon" src="https://i.imgur.com/HdsziHP.png" />
                    <div class="d-flex flex-column">
                      <p class="font-weight-bold">
                        Order
                        <br />
                        Arrived
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderUpdate;
