import React, { useState, useEffect } from "react";
import axios from "axios";
import useQuery from "../../screens/Query";
import Menu from "../../screens/Menu";
import { Link } from "react-router-dom";

function Device() {
  const query = useQuery();
  const dogString = query.get("routeName");
  const dogObject = JSON.parse(dogString);
  console.log("====>>>>>>>>>>ffffff", dogObject.name);

  const [loading, setLoading] = useState(false);
  const [devicename, setDevicename] = useState("");

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
      const res = await axios.get(`/api/getCompany/${Dtype}`);

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

  const getservice = async (itemValue) => {
    try {
      const filteredData = modelno.filter((item) => item._id === itemValue);
      setDevicedata(filteredData[0].modedata);
      console.log("============>>>>>>>>>>", filteredData[0].modedata);
      //   console.log("============>>>>>>>>>>xxxxxxxxxxx", filteredData[0].modelno);
    } catch (error) {}
  };

  return (
    <div>
      <Menu />
      <div className="container   mt-5">
        <div className="row">
          <div className="col-md-6  d-flex">
            <div
              style={{
                padding: 20,
                width: 350,
                height: 350,
                justifyContent: "center",
                alignItems: "center",

                margin: "auto",
              }}
            >
              <img src={dogObject.image} className="img-fluid" alt="3" />
            </div>
          </div>
          <div className="col-md-6">
            <div style={{ padding: 20, marginTop: 20 }}>
              <h1>Get your </h1> <h1>{dogObject.name} service</h1>
            </div>

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
            <Link
              style={{ padding: 15, width: "500px" }}
              to={{
                pathname: "/problem",
                search: `routeName=${JSON.stringify(devicedata)}`, //dog is the object to pass along
              }}
              class="app-btn blu flex vert  "
            >
              <span class="big-txt">Service</span>
            </Link>
          </div>
        </div>
      </div>

      <br />

      <br />
      {/* <div className="container">
        <div className="row">
          <div className="col-md-6">
            {devicedata && devicedata !== undefined ? (
              devicedata.map((item) => (
                <div
                  key={item._id}
                  style={{
                    backgroundColor: !!selected.get(item._id)
                      ? "#000"
                      : "rgb(245, 245, 247)",

                    padding: 20,
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
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        {item.name}
                      </h3>

                      <h3
                        style={{
                          color: !!selected.get(item._id) ? "white" : "black",
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Rs. {item.price}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1>no data to show</h1>
            )}
          </div>
          <div className="col-md-6"></div>
        </div>
      </div> */}
    </div>
  );
}

export default Device;