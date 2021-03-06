import React, { useState, useEffect } from "react";
import axios from "axios";
import useQuery from "../../screens/Query";
import Menu from "../../screens/Menu";
import { Link, useParams } from "react-router-dom";
import Footer from "../../screens/Footer";
import Skeleton from "@material-ui/core/Skeleton";
import { BiArrowBack } from "react-icons/bi";

import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "100%",
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  overflow: "scroll",
  p: 4,
};

function Device() {
  const { id } = useParams();
  const query = useQuery();
  const dogString = query.get("routeName");
  const dogObject = JSON.parse(dogString);

  const [loading, setLoading] = useState(false);
  const [devicename, setDevicename] = useState("");
  const [model, setmodel] = useState("");
  const [company, setCompany] = useState([]);
  const [modelno, setModelno] = useState([]);
  const [devicedata, setDevicedata] = useState([]);
  const Dtype = "mobile";

  const [userdata, setUserdata] = useState([]);
  // const [email, setEmail] = useState("noreply@gmail.com");

  const sdata = [];

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState("");

  // handle onChange event of the dropdown
  const handleChange = (e) => {
    // alert(e.target.value);
    setSelectedValue(e.target.value);
    const itemValue = e.target.value;
    getmodel(itemValue);
  };

  const modelChange = (e) => {
    const itemValue = e.target.value;
    getservice(itemValue);
  };
  console.log(Dtype);

  useEffect(() => {
    getcompany();
  }, []);

  const getcompany = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/getCompany/${id}`);

      console.log(res.data.device);
      setCompany(res.data.device);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getmodel = async (itemValue) => {
    try {
      const res = await axios.get(`/api/getmodel/${itemValue}`);
      console.log(itemValue);
      // console.log("====>>>>>>>>>>>", res.data.device.model);
      console.log("====>>>>>>>>>>>devicename", res.data.device.deviceName);
      setModelno(res.data.device.model);

      setDevicename(res.data.device.deviceName);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(devicedata);
  const getservice = async (itemValue) => {
    try {
      const filteredData = modelno.filter((item) => item._id === itemValue);
      setDevicedata(filteredData[0].modedata);
      setmodel(filteredData[0].modelno);
      console.log("============>>>>>>>>>>", filteredData[0].modedata);
      //   console.log("============>>>>>>>>>>xxxxxxxxxxx", filteredData[0].modelno);
    } catch (error) {}
  };

  return (
    <div>
      <Menu />
      {/* <section>
        <div className="container   mt-5">
          <div className="row">
            <div className="col-md-6  d-flex">
              <div
                style={{
                  padding: 20,
                  width: 300,
                  height: 300,
                  justifyContent: "center",
                  alignItems: "center",

                  margin: "auto",
                }}
              >
                {loading ? (
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <img src={dogObject.image} className="img-fluid" alt="3" />
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ marginLeft: 20, marginRight: 20 }}>
                {loading ? (
                  <div style={{ padding: 10, marginTop: 20 }}>
                    <Skeleton
                      variant="h1"
                      hieght={40}
                      style={{
                        width: "70%",
                        marginBottom: 8,
                      }}
                      animation="wave"
                    />
                    <Skeleton
                      hieght={40}
                      variant="h1"
                      style={{
                        width: "60%",
                        marginBottom: 8,
                      }}
                      animation="wave"
                    />
                    <Skeleton
                      hieght={40}
                      variant="h1"
                      style={{
                        width: "40%",
                        marginBottom: 8,
                      }}
                      animation="wave"
                    />
                  </div>
                ) : (
                  <div style={{ padding: 10, marginTop: 20 }}>
                    <h1>{dogObject.name}</h1> <h1>Get your </h1>
                    <h1>device service</h1>
                  </div>
                )}
                {loading === true ? (
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 10,
                      margin: "auto",

                      borderRadius: "15px",
                      marginBottom: 10,
                    }}
                  >
                    <Skeleton
                      style={{ borderRadius: 10, height: 80 }}
                      animation="wave"
                    />
                    <Skeleton
                      style={{ borderRadius: 10, height: 80 }}
                      animation="wave"
                    />
                  </div>
                ) : (
                  <div>
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
                        <option value="0"> select Brand</option>
                        {company.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.deviceName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                        margin: "auto",
                        backgroundColor: "rgb(245, 245, 247)",
                        borderRadius: "15px",
                      }}
                    >
                      <select
                        placeholder="Select Model"
                        style={{
                          paddingLeft: 20,
                          fontSize: 20,
                        }}
                        // value={data.find((obj) => obj.value === selectedValue)} // set selected value
                        // set list of the data
                        onChange={modelChange} // assign onChange function
                      >
                        <option value="0"> select Model</option>
                        {modelno.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.modelno}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {devicedata.length !== 0 ? (
                  <Link
                    style={{ padding: 18 }}
                    to={{
                      pathname: "/problem",
                      search: `routeName=${JSON.stringify(
                        devicedata
                      )}&devicename=${devicename} ${model}`, //dog is the object to pass along
                    }}
                    class="app-btn blu flex vert  "
                  >
                    <span class="big-txt">Service</span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>

  
      </section> */}
      <section>
        <div class="container">
          <div
            style={{
              boxShadow: " 0px 15px 20px rgba(63, 63, 63, 0.4)",
              backgroundColor: "#fff",
              fontFamily: "sans-serif",
              padding: 20,
              textAlign: "center",
              borderRadius: 10,

              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 20,
            }}
          >
            Choose your device for which you are looking for services
          </div>
          <div class="row">
            {company &&
              company.map((product) => (
                <div
                  key={product._id}
                  class="col-6 col-sm-6  col-md-3 col-lg-3 "
                >
                  <Link to={"/devicename/" + product._id}>
                    <div
                      style={{
                        boxShadow: " 0px 15px 20px rgba(63, 63, 63, 0.4)",
                        backgroundColor: "#fff",
                        padding: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 5,
                        height: 140,
                        borderRadius: 10,
                        marginBottom: 20,
                      }}
                    >
                      {/* <Link
                    to={{
                      pathname: "/device",
                      search: `routeName=${JSON.stringify(product.data)}`, //dog is the object to pass along
                    }}
                  > */}

                      <img
                        src={product.Cimage}
                        alt="Product"
                        class="companyImage"
                      />

                      {/* </Link> */}
                    </div>
                    <div class="text-center">
                      <span>{product.deviceName}</span>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Device;
