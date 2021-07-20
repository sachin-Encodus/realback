import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import io from "socket.io-client";

import { ToastContainer, toast } from "react-toastify";
export default function UserList() {
  const [data, setData] = useState(userRows);
  const [userdata, setUserdata] = useState([]);
  console.log("========xxxxxxxxx", userdata);

  const socket = io("/api/socket");
  socket.on("Orderd", (deviceData) => {
    // toast.dark(deviceData.status);
    // console.log("========>>>>>xxxxxxx", deviceData);
    // console.log("--------uerdata", userdata);

    if (userdata.length !== 0) {
      updateItem(deviceData);
      // const objIndex = userdata.findIndex((x) => x.id === data._id);

      // // console.log("Before update: ", data[objIndex]);
      // userdata[objIndex].status = data.status;

      // console.log("After update: ", userdata[objIndex]);
      // setUserdata(userdata);
    }
  });

  const updateItem = (deviceData) => {
    let newUserdata = userdata.concat(deviceData);
    setUserdata(newUserdata);
    console.log("====>>>>>yyyyyyy", newUserdata);
  };

  useEffect(() => {
    console.log("calling.....");
    axios
      .get("/api/order")
      .then(({ data }) => setUserdata(data.user))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleDelete = (_id) => {
    setUserdata(userdata.filter((item) => item._id !== _id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        // console.log("================>>>>>>>", params);

        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "mode",
      headerName: "Status",
      width: 120,
    },
    {
      field: "totalPrice",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "orderOtp",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <ToastContainer />
      <DataGrid
        rows={userdata}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        id={Math.random()}
      />
    </div>
  );
}
