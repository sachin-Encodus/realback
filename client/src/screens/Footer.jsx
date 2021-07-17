import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div style={{ backgroundColor: "#000" }}>
        <br /> <br /> <br /> <br />
        {/* <div className="container">
          <div className="row">
            <div className="col-md-6   text-center ">
              <span>
                <strong>Services</strong>
                <p style={{ color: "#fff" }} class="text-justify  text-center">
                  Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative
                  to help the upcoming programmers with the code. Scanfcode
                  focuses on providing the most efficient code or snippets as
                  the code wants to be simple. We will help programmers build up
                  concepts in different programming languages that include C,
                  C++, Java, HTML, CSS, Bootstrap, JavaScript,
                </p>
              </span>
            </div>
            <div className="col-md-6 text-center ">
              <span>
                <strong>Realback Store</strong>
                <p style={{ color: "#fff" }} class="text-justify  text-center">
                  Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative
                  to help the upcoming programmers with the code. Scanfcode
                  focuses on providing the most efficient code or snippets as
                  the code wants to be simple. We will help programmers build up
                  concepts in different programming languages that include C,
                  C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL
                  and Algorithm.
                </p>
                <br />
              </span>
            </div>

            <br />

            <br />
            <br />
          </div>
        </div> */}
        <div className="container ">
          <hr className="hre" />
          <div className="row">
            <div className="col-md-4 text-center ">
              <p
                style={{
                  color: "#fff",
                  marginLeft: "10px",
                  marginTop: "-2px",
                  fonFfamily: '"Sulphur Point", sans-serif',
                  fontSize: "15px",
                  textAlign: "center",
                }}
              >
                © 2020-21 Realback Technologies India Pvt. Ltd.
              </p>
            </div>

            <div
              className="col-md-4    text-center   mb-3    "
              style={{ fontfamily: '"Sulphur Point", sans-serif' }}
            >
              <Link
                to="/terms"
                style={{
                  marginLeft: "10px",
                  color: "#fff",
                  fontSize: "13px",
                }}
              >
                Terms & Condition
              </Link>
              &nbsp;
              <a
                href="tel:9174203189"
                style={{
                  marginLeft: "10px",
                  color: "#fff",
                  fontSize: "13px",
                }}
              >
                Call us
              </a>
              &nbsp;
              <Link
                to="/feedback"
                style={{
                  marginLeft: "10px",
                  color: "#fff",
                  fontSize: "13px",
                }}
              >
                Feedback
              </Link>
              &nbsp;
              {/* <a
                href="/"
                style={{
                  marginLeft: "10px",
                  color: "#808080",
                  fontSize: "13px",
                }}
              >
                Blog
              </a> */}
            </div>

            <div
              className="col-md-4   text-center           "
              style={{ fontFamily: '"Sulphur Point", sans-serif' }}
            >
              <a href="#">
                {" "}
                <i
                  className="fab fa-linkedin  fa-2x  "
                  style={{ color: "#fff", marginLeft: "10px" }}
                ></i>
              </a>
              <i
                className="fab fa-facebook-square fa-2x "
                style={{ color: "#fff", marginLeft: "10px" }}
              ></i>
              <i
                className="fab fa-twitterfa-2x "
                style={{ color: "#fff", marginLeft: "10px" }}
              >
                {" "}
              </i>
              <a href="https://www.instagram.com/realbackindia?r=nametag">
                <i
                  className="fab fa-instagram fa-2x"
                  style={{ color: "#fff", marginLeft: "10px" }}
                ></i>
              </a>
              <i
                className="fab fa-youtube fa-2x "
                style={{ color: "#fff", marginLeft: "10px" }}
              ></i>
              <i
                className="fab fa-github fa-2x "
                style={{ color: "#fff", marginLeft: "10px" }}
              ></i>
            </div>
          </div>
          <br /> <br />
        </div>
      </div>
    </>
  );
};

export default Footer;
