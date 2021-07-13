import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import dp from "../images/realback.png";
import Menu from "./Menu";
const Feedback = () => {
  const [message, setMessage] = useState("");
  const Url = ` https://api.whatsapp.com/send?phone=919522540020&text=${message}`;
  return (
    <div>
      <Menu />
      <section style={{ backgroundColor: "#000", height: "100vh" }}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div className="text-canter">
                <img
                  src="https://image.flaticon.com/icons/png/512/2111/2111728.png"
                  alt="2"
                  className="img-fluid"
                  style={{ width: 60, height: 60, marginBottom: 20 }}
                />
                <h1 className="gradtext">
                  Simple. Secure. Reliable. Messaging.
                </h1>
                <h3 className="gradtext">Feedback + contact Us + Help</h3>
                <p className="gradtext">
                  you can send us your Feedback and Message , Contact us and for
                  help feel free to chat with us. With your regional language
                  Team Realback.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <h1 className="gradtext"> Free feel to chat with us</h1>
              <div style={{ padding: 10, marginTop: 40 }}>
                <div
                  style={{
                    padding: 10,
                    backgroundColor: "rgb(0, 112, 243)",
                    boxShadow: "rgb(0 118 255 / 39%) 0px 4px 14px 0px",
                    borderRadius: 30,
                    width: 250,
                    color: "white",
                  }}
                >
                  hii there!! how can we help you
                </div>
                <div
                  style={{
                    marginTop: 10,
                    marginLeft: "auto",
                    padding: 10,
                    backgroundColor: "rgb(0, 112, 243)",
                    boxShadow: "rgb(0 118 255 / 39%) 0px 4px 14px 0px",
                    borderRadius: 30,
                    width: 250,
                    color: "white",
                  }}
                >
                  i need service for my Mac os
                </div>
              </div>

              <div
                style={{
                  marginTop: 30,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <input
                  onChange={(e) => setMessage(e.target.value)}
                  class="input-text js-input"
                  placeholder="Type a message"
                  value={message}
                  type="text"
                  style={{
                    width: "100%",
                    height: 60,
                    padding: 20,
                    backgroundColor: "#151515ed",
                    borderRadius: 50,
                    outline: "none",
                    borderStyle: "none",
                    color: "white",
                  }}
                />
                <a href={Url} target="blank">
                  <div
                    style={{
                      borderRadius: 50,
                      padding: 15,
                      backgroundColor: "rgb(0, 112, 243)",
                      marginLeft: 20,
                    }}
                  >
                    <FiSend color="lightgrey" size="30" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <img
        src="https://image.flaticon.com/icons/png/512/2111/2111728.png"
        alt="2"
        className="img-fluid"
      /> */}
    </div>
  );
};

export default Feedback;
// https://cdn.dribbble.com/users/2886970/screenshots/15425733/media/20cd3b31e77a3047c28e19f7f9d9195e.png
