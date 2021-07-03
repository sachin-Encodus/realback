const User = require("../src/models/user");
const Device = require("../src/models/orders");
const Product = require("../src/models/devicedata");
const jwt = require("jsonwebtoken");
const path = require("path");
const orderSchema = require("../src/models/orderSchema");
const _ = require("lodash");
const Personal = require("../src/models/personals");
const Razorpay = require("razorpay");
const uniquId = require("uniqid");
const Formidable = require("formidable");
const request = require("request");
let orderId;
// const cookieParser = require('cookie-parser');
const bcrypt = require("bcryptjs");
const express = require("express");
// const auth = require("../src/middleware/auth");
// const app  = express();

const { OAuth2Client } = require("google-auth-library");
const {
  EMAIL,
  Account_Sid,
  Auth_Token,
  Service_id,
  KEY_ID,
  KEY_SECRET,
  CLIENT_URL,
  PASS,
  JWT_ACCOUNT_ACTIVATION,
  JWT_RESET_PASSWORD,
  SECRET_KEY,
} = require("../config/keys");

var instance = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});
// app.use(cookieParser());
// xmgrxqydtnrsfdet
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
  auth: {
    user: `${EMAIL}`,
    pass: `${PASS}`,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("=========>>>>>>>", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

exports.register = (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    User.findOne({ email }).exec((err, user) => {
      if (user) {
        return res.status(400).json({ errors: "Email already is taken" });
      }

      const token = jwt.sign(
        {
          name,
          email,
          mobile,
          password,
        },
        JWT_ACCOUNT_ACTIVATION,
        {
          expiresIn: "60m",
        }
      );

      const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Welcome to Realback",
        html: `<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body {
      margin: 0;
      background: #FEFEFE;
      color: #585858;
    }

    table {
      font-size: 15px;
      line-height: 23px;
      max-width: 500px;
      min-width: 460px;
      text-align: center;
    }
    .table_inner { min-width: 100% !important; }
    td {
      font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      vertical-align: top;
    }
    
    .carpool_logo { margin: 30px auto; }

    .dummy_row { padding-top: 20px !important; }
    .section,
    .sectionlike { background: #C9F9E9; }
    .section { padding: 0 20px;  }
    .sectionlike { padding-bottom: 10px; }
    .section_content {
      width: 100%;
      background: #fff;
    }
    .section_content_padded { padding: 0 35px 40px; }
    .section_zag { background: #F4FBF9; }
    .imageless_section { padding-bottom: 20px; }

    img {
      display: block;
      margin: 0 auto;
    }
    .img_section {
      width: 100%;
      max-width: 500px;
    }
    .img_section_side_table { width: 100% !important; }

    h1 {
      font-size: 20px;
      font-weight: 500;
      margin-top: 40px;
      margin-bottom: 0;
    }
    .near_title { margin-top: 10px; }
    .last { margin-bottom: 0; }

    a {
      color: #63D3CD;
      font-weight: 500;
      word-break: break-word; /* Footer has long unsubscribe link */
    }

    .button {
      display: block;
      width: 100%;
      max-width: 300px;
      background: #04f5a5;
      border-radius: 8px;
      color: #fff;
      font-size: 18px;
      font-weight: normal; /* Resetting from a */
      padding: 12px 0;
      margin: 30px auto 0;
      text-decoration: none;
    }

    small {
      display: block;
      width: 100%;
      max-width: 330px;
      margin: 14px auto 0;
      font-size: 14px;
    }
    .signature { padding: 20px; }

    .footer,
    .footer_like { background: #1FD99A; }
    .footer { padding: 0 20px 30px; }
    .footer_content {
      width: 100%;
      text-align: center;
      font-size: 12px;
      line-height: initial;
      color: #005750;
    }
    .footer_content a {
      color: #005750;
    }
    .footer_item_image { margin: 0 auto 10px; }
    .footer_item_caption { margin: 0 auto; }

    .footer_legal {
      padding: 20px 0 40px;
      margin: 0;
      font-size: 12px;
      color: #A5A5A5;
      line-height: 1.5;
    }

    .text_left { text-align: left; }
    .text_right { text-align: right; }
    .va { vertical-align: middle;  }
    
    .stats {
      min-width: auto !important;
      max-width: 370px;
      margin: 30px auto 0;
    }
    .counter { font-size: 22px; }
    .stats_counter { width: 23%; }
    .stats_image {
      width: 18%;
      padding: 0 10px;
    }
    .stats_meta { width: 59%; }
    .stats_spaced { padding-top: 16px; }
    .walkthrough_spaced { padding-top: 24px; }

    .walkthrough { max-width: none;  }
    .walkthrough_meta { padding-left: 20px; }

    .table_checkmark { padding-top: 30px;  }
    .table_checkmark_item { font-size: 15px; }
    .td_checkmark {
      width: 24px;
      padding: 7px 12px 0 0;
    }

    .padded_bottom { padding-bottom: 40px; }
    .marginless { margin: 0; }

    /* Restricting responsive for iOS Mail app only as Inbox/Gmail have render bugs */
    @media only screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
      table { min-width: auto !important; }

      .section_content_padded {
        padding-right: 25px !important;
        padding-left: 25px !important;
      }

      .counter { font-size: 18px !important; }
    }
  </style>
</head>
<body style=" margin: 0;
  background: #eef7fa;
  color: #383838;
">
  <!-- Preivew text -->
  <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;border-collapse: collapse;border: 0px;"></span> 
  <!-- Carpool logo -->
  <table align="center" border="0" cellspacing="0" cellpadding="0" style="  font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
">
    <tbody>
        <br><br>
    <!-- Header -->
    <tr>
      <td class="sectionlike imageless_section" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
  background: #ffffff;
  padding-bottom: 10px;
padding-bottom: 20px;"></td>
    </tr>
    <!-- Content -->
    <tr>
      <td class="section" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
  background: #ffffff;
  padding: 0 20px;
">
        <table border="0" cellspacing="0" cellpadding="0" class="section_content" style=" font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
  width: 100%;
  background: #fff;
">
          <tbody><tr>
            <td class="section_content_padded" style="  font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
padding: 0 35px 40px;">
              <h1 style=" font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 0;
">Welcome To Realback Services</h1>
<br>
<h2>Hii ${name}</h2><br>
              <p class="near_title last" style="margin-top: 10px;margin-bottom: 0;">Please verify that your email address is ${email}   and that you entered it when signing up for Realback.</p>
              <a href="${CLIENT_URL}/activate/${token}" style=" display: block;
  width: 100%;
  max-width: 300px;
  background: #ffc107;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  padding: 12px 0;
  margin: 30px auto 0;
  text-decoration: none;
" target="_blank">Verify email</a>
              
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
    <!-- Signature -->
 
    <!-- Footer -->
   
    <tr>
      <td style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
        <table border="0" cellspacing="0" cellpadding="0" class="section_content" style=" font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
  width: 100%;
  background: #fff;
">
          <tbody><tr>
            <td class="footer_like" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
background: #ffffff; "><img src="https://i.pinimg.com/originals/a3/84/3e/a3843e404a271edb47b1908dd2a6230b.gif" alt="" width="500" class="img_section" style=" display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
"></td>
          </tr>
          <tr>
            <td class="footer" style="  font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
  padding: 0 20px 30px;
  background: #ffffff;
">
              <table border="0" cellspacing="0" cellpadding="0" class="footer_content" style="  font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  line-height: initial;
  color: #005750;
">
                <tbody><tr>
                  <td width="33%" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
                    <img src="https://carpool-email-assets.s3.amazonaws.com/shared/footer-learn@2x.png" width="24" class="footer_item_image" style="  display: block;
  margin: 0 auto;
margin: 0 auto 10px;">
                    <p class="footer_item_caption" style="margin: 0 auto;">More about <br><a href="http://waze.com/carpool/index.html" style="  color: #0786fd;
" target="_blank">Realback</a></p>
                  </td>
                  <td width="33%" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
                    <img src="https://carpool-email-assets.s3.amazonaws.com/shared/footer-support@2x.png" width="24" class="footer_item_image" style="  display: block;
  margin: 0 auto;
margin: 0 auto 10px;">
                    <p class="footer_item_caption" style="margin: 0 auto;">Questions? <br><a href="https://support.google.com/waze/carpool" style=" color: #0786fd;
" target="_blank">We're here</a>
                  </p></td>
                  <td width="33%" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
                    <img src="https://carpool-email-assets.s3.amazonaws.com/shared/footer-fb@2x.png" width="24" class="footer_item_image" style=" display: block;
  margin: 0 auto;
margin: 0 auto 10px;">
                    <p class="footer_item_caption" style="margin: 0 auto;">Join the community <br><a href="https://www.facebook.com/groups/wazecarpoolers" style="  color: #0786fd;
" target="_blank">on Facebook</a></p>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
    <!-- Legal footer -->
    <tr>
      <td style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
        <p class="footer_legal" style=" padding: 20px 0 40px;
  margin: 0;
  font-size: 12px;
  color: #424242;
  line-height: 1.5;
">
        If you did not enter this email address when signing up for Realback service, disregard this message.<br><br>
        © 2021 Google Inc. 1600 Amphitheatre Parkway, Mountain View, CA 94043
<br><br>

This is a mandatory service email from Realback.
</p>
      </td>
    </tr>
  </tbody></table>

</body>




<!-- 
https://i.pinimg.com/originals/a4/51/39/a451393c169a91586312551109361064.gif


https://i.pinimg.com/originals/a3/84/3e/a3843e404a271edb47b1908dd2a6230b.gif -->
            `,
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return res.status(400).json({ errors: err });
        }
        return res.json({ mesaage: `email has been sent to ${email} ✔` });
      });
    });
  } catch (error) {
    return res.status(400).json({ errors: "something went wrong " });
  }
};

// exports.activate =  function(req, res) {

//    try {
//    const { token } = req.body;
//   // console.log(token);
//   if (token) {
//     jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION,function(err, decodedToken)  {
//       if (err) {
//         console.log('Activation error');
//         return res.status(401).json({
//           errors: 'Expired link. Signup again'
//         });
//       } else {
//         const { name, email, password } = decodedToken;

//    User.findOne({ email}).exec((err, user) => {
//       if ( user) {
//         return res.status(400).json({ errors: 'Email is taken' });
//   }
//     });
//         console.log(email);
//         console.log(name);
//         console.log(password);

//         let user =  new User({
//           name,
//            email,
//             password
//          });
// console.log(user)

//     user.save((err, user) => {
//           if (err) { console.log('Save error account activation');
//             return res.status(401).json({
//               errors: `error activating account`
//             });
//           } else {

//             return res.status(201).json( {

//               message : "success"});
//           }
//         });

//       }
//     } );

//   }
//   else{
//     return res.json({ errors: 'error happening please try again'});
//   }

// // const tokeni = await user.generateAuthToken();
// //      console.log(tokeni);
//    } catch (err) {
//       return res.status(401).json({ errors: `failed activating account` });
//    }

// };

exports.activate = async function (req, res) {
  try {
    const { token } = req.body;
    // console.log(token);
    if (token) {
      jwt.verify(
        token,
        JWT_ACCOUNT_ACTIVATION,
        async function (err, decodedToken) {
          if (err) {
            console.log("Activation error");
            return res.status(401).json({
              errors: "Expired link. Signup again",
            });
          }

          const { name, email, mobile, password } = decodedToken;
          User.findOne({ email }).exec((err, user) => {
            if (user) {
              return res.status(400).json({ errors: "Email is taken" });
            }

            console.log(email);
            console.log(name);
            console.log(mobile);
            const newUser = new User({
              name,
              email,
              mobile,
              password,
            });
            console.log(newUser);
            // const tokeni = await user.generateAuthToken();
            //  console.log(tokeni);
            newUser.save((err, user) => {
              if (err) {
                console.log("Save error account activation");
                return res.status(401).json({
                  errors: err,
                });
              }
              return res.status(201).json({
                message: "success",
              });

            });
            
          });
        }
      );
    } else {
      return res.json({ errors: "error happening please try again" });
    }
  } catch (err) {
    return res.status(401).json({ errors: `failed activating account` });
  }
};

exports.googlelogin = async function (req, res) {
  try {
    const { email } = req.body;
    User.findOne({ email }).exec(async (err, user) => {
      if (user) {
        console.log("=======", user);
        const token = await user.generateAuthToken();
        console.log("======>>>>ffff", token);
        return res.status(200).json({ user });
      } else {
        return res.status(401).json({ errors: err });
      }
    });
  } catch (err) {
    return res.status(401).json({ errors: `failed activating account` });
  }
};

exports.googlesignUp = async function (req, res) {
  try {
    const { name, email, mobile, password } = req.body;
    User.findOne({ email }).exec((err, user) => {
      if (user) {
        return res.status(200).json({ message: "login success" });
      }

      console.log(email);
      console.log(name);
      console.log(mobile);
      const newUser = new User({
        name,
        email,
        mobile,
        password,
      });
      console.log(newUser);
      // const tokeni = await user.generateAuthToken();
      //  console.log(tokeni);
      newUser.save((err, user) => {
        if (err) {
          console.log("Save error account activation");
          return res.status(401).json({
            errors: err,
          });
        }
        //
        return res.status(201).json({
          user,
        });
      });
    });
  } catch (err) {
    return res.status(401).json({ errors: `failed activating account` });
  }
};

// login api
exports.signin = async function (req, res) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const useremail = await User.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, useremail.password);

    // login auth
    if (isMatch) {
      const token = await useremail.generateAuthToken();
      console.log(token);
      //    login jwt cookie
      // res.cookie("jwts", token, {
      //      expires:new Date(Date.now() + 600000),
      //      httpOnly:true,

      //   });
      const myname = useremail.name;

      return res.status(201).json({ token, useremail, myname });
    } else {
      return res.status(400).json({
        errors: " password do not match",
      });
    }
  } catch (err) {
    console.log("call");
    return res.status(400).json({
      errors: err,
    });
  }
};

exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   const firstError = errors.array().map(error => error.msg)[0];
  //   return res.status(422).json({
  //     errors: firstError
  //   });
  // } else {
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist",
      });
    }

    const token = jwt.sign({ _id: user._id }, JWT_RESET_PASSWORD, {
      expiresIn: "20m",
    });

    const mailOptions = {
      from: `${EMAIL}`,
      to: email,
      subject: "Welcome to Realback",
      html: `<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body {
      margin: 0;
      background: #FEFEFE;
      color: #585858;
    }

    table {
      font-size: 15px;
      line-height: 23px;
      max-width: 500px;
      min-width: 460px;
      text-align: center;
    }
    .table_inner { min-width: 100% !important; }
    td {
      font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      vertical-align: top;
    }
    
    .carpool_logo { margin: 30px auto; }

    .dummy_row { padding-top: 20px !important; }
    .section,
    .sectionlike { background: #C9F9E9; }
    .section { padding: 0 20px;  }
    .sectionlike { padding-bottom: 10px; }
    .section_content {
      width: 100%;
      background: #fff;
    }
    .section_content_padded { padding: 0 35px 40px; }
    .section_zag { background: #F4FBF9; }
    .imageless_section { padding-bottom: 20px; }

    img {
      display: block;
      margin: 0 auto;
    }
    .img_section {
      width: 100%;
      max-width: 500px;
    }
    .img_section_side_table { width: 100% !important; }

    h1 {
      font-size: 20px;
      font-weight: 500;
      margin-top: 40px;
      margin-bottom: 0;
    }
    .near_title { margin-top: 10px; }
    .last { margin-bottom: 0; }

    a {
      color: #63D3CD;
      font-weight: 500;
      word-break: break-word; /* Footer has long unsubscribe link */
    }

    .button {
      display: block;
      width: 100%;
      max-width: 300px;
      background: #04f5a5;
      border-radius: 8px;
      color: #fff;
      font-size: 18px;
      font-weight: normal; /* Resetting from a */
      padding: 12px 0;
      margin: 30px auto 0;
      text-decoration: none;
    }

    small {
      display: block;
      width: 100%;
      max-width: 330px;
      margin: 14px auto 0;
      font-size: 14px;
    }
    .signature { padding: 20px; }

    .footer,
    .footer_like { background: #1FD99A; }
    .footer { padding: 0 20px 30px; }
    .footer_content {
      width: 100%;
      text-align: center;
      font-size: 12px;
      line-height: initial;
      color: #005750;
    }
    .footer_content a {
      color: #005750;
    }
    .footer_item_image { margin: 0 auto 10px; }
    .footer_item_caption { margin: 0 auto; }

    .footer_legal {
      padding: 20px 0 40px;
      margin: 0;
      font-size: 12px;
      color: #A5A5A5;
      line-height: 1.5;
    }

    .text_left { text-align: left; }
    .text_right { text-align: right; }
    .va { vertical-align: middle;  }
    
    .stats {
      min-width: auto !important;
      max-width: 370px;
      margin: 30px auto 0;
    }
    .counter { font-size: 22px; }
    .stats_counter { width: 23%; }
    .stats_image {
      width: 18%;
      padding: 0 10px;
    }
    .stats_meta { width: 59%; }
    .stats_spaced { padding-top: 16px; }
    .walkthrough_spaced { padding-top: 24px; }

    .walkthrough { max-width: none;  }
    .walkthrough_meta { padding-left: 20px; }

    .table_checkmark { padding-top: 30px;  }
    .table_checkmark_item { font-size: 15px; }
    .td_checkmark {
      width: 24px;
      padding: 7px 12px 0 0;
    }

    .padded_bottom { padding-bottom: 40px; }
    .marginless { margin: 0; }

    /* Restricting responsive for iOS Mail app only as Inbox/Gmail have render bugs */
    @media only screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
      table { min-width: auto !important; }

      .section_content_padded {
        padding-right: 25px !important;
        padding-left: 25px !important;
      }

      .counter { font-size: 18px !important; }
    }
  </style>
</head>
<body style=" margin: 0;
  background: #eef7fa;
  color: #383838;
">
  <!-- Preivew text -->
  <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;border-collapse: collapse;border: 0px;"></span> 
  <!-- Carpool logo -->
  <table align="center" border="0" cellspacing="0" cellpadding="0" style="  font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
">
    <tbody>
        <br><br>
    <!-- Header -->
    <tr>
      <td class="sectionlike imageless_section" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
  background: #ffffff;
  padding-bottom: 10px;
padding-bottom: 20px;"></td>
    </tr>
    <!-- Content -->
    <tr>
      <td class="section" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
  background: #ffffff;
  padding: 0 20px;
">
        <table border="0" cellspacing="0" cellpadding="0" class="section_content" style=" font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
  width: 100%;
  background: #fff;
">
          <tbody><tr>
            <td class="section_content_padded" style="  font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
padding: 0 35px 40px;">
              <h1 style=" font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 0;
">Welcome To Realback Services</h1>
<br>
<h2>click the button to reset password</h2><br>
              <p class="near_title last" style="margin-top: 10px;margin-bottom: 0;">Please verify that your email address is ${email}   and that you entered it when signing up for Realback.</p>
              <h3 href="${CLIENT_URL}/reset/${token}"" style=" display: block;
  width: 100%;
  max-width: 300px;
  background: #ffc107;
  border-radius: 8px;
  color: #fff;
  font-size: 18px;
  padding: 12px 0;
  margin: 30px auto 0;
  text-decoration: none;
" target="_blank">reset password</a>
              
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
    <!-- Signature -->
 
    <!-- Footer -->
   
    <tr>
      <td style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
        <table border="0" cellspacing="0" cellpadding="0" class="section_content" style=" font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
  width: 100%;
  background: #fff;
">
          <tbody><tr>
            <td class="footer_like" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
background: #ffffff; "><img src="https://i.pinimg.com/originals/a3/84/3e/a3843e404a271edb47b1908dd2a6230b.gif" alt="" width="500" class="img_section" style=" display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
"></td>
          </tr>
          <tr>
            <td class="footer" style="  font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
  padding: 0 20px 30px;
  background: #ffffff;
">
              <table border="0" cellspacing="0" cellpadding="0" class="footer_content" style="  font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  line-height: initial;
  color: #005750;
">
                <tbody><tr>
                  <td width="33%" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
                    <img src="https://carpool-email-assets.s3.amazonaws.com/shared/footer-learn@2x.png" width="24" class="footer_item_image" style="  display: block;
  margin: 0 auto;
margin: 0 auto 10px;">
                    <p class="footer_item_caption" style="margin: 0 auto;">More about <br><a href="http://waze.com/carpool/index.html" style="  color: #0786fd;
" target="_blank">Realback</a></p>
                  </td>
                  <td width="33%" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
                    <img src="https://carpool-email-assets.s3.amazonaws.com/shared/footer-support@2x.png" width="24" class="footer_item_image" style="  display: block;
  margin: 0 auto;
margin: 0 auto 10px;">
                    <p class="footer_item_caption" style="margin: 0 auto;">Questions? <br><a href="https://support.google.com/waze/carpool" style=" color: #0786fd;
" target="_blank">We're here</a>
                  </p></td>
                  <td width="33%" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
                    <img src="https://carpool-email-assets.s3.amazonaws.com/shared/footer-fb@2x.png" width="24" class="footer_item_image" style=" display: block;
  margin: 0 auto;
margin: 0 auto 10px;">
                    <p class="footer_item_caption" style="margin: 0 auto;">Join the community <br><a href="https://www.facebook.com/groups/wazecarpoolers" style="  color: #0786fd;
" target="_blank">on Facebook</a></p>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
    <!-- Legal footer -->
    <tr>
      <td style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
        <p class="footer_legal" style=" padding: 20px 0 40px;
  margin: 0;
  font-size: 12px;
  color: #424242;
  line-height: 1.5;
">
        If you did not enter this email address when signing up for Realback service, disregard this message.<br><br>
        © 2021 Google Inc. 1600 Amphitheatre Parkway, Mountain View, CA 94043
<br><br>

This is a mandatory service email from Realback.
</p>
      </td>
    </tr>
  </tbody></table>

</body>




<!-- 
https://i.pinimg.com/originals/a4/51/39/a451393c169a91586312551109361064.gif


https://i.pinimg.com/originals/a3/84/3e/a3843e404a271edb47b1908dd2a6230b.gif -->
            `,
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        console.log("RESET PASSWORD LINK ERROR", err);
        return res.status(400).json({
          error: "Database connection error on user password forgot request",
        });
      } else {
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            return res.status(400).json({ errors: err });
          }
          return res.json({ mesaage: `email has been sent to ${email}` });
        });
      }

      //           sgMail
      //             .send(emailData)
      //             .then(sent => {
      //               // console.log('SIGNUP EMAIL SENT', sent)
      //               return res.json({
      //                 message: `Email has been sent to ${email}. Follow the instruction to activate your account`
      //               });
      //             })
      //             .catch(err => {
      //               // console.log('SIGNUP EMAIL SENT ERROR', err)
      //               return res.json({
      //                 message: err.message
      //               });
      //             });
      //         }
      //       }
      //     );
      //   }
      // );
    });
  });
};

exports.resetPass = (req, res) => {
  const { email, newPassword } = req.body;

  console.log(email, newPassword);
  try {
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (user) {
        const updatedFields = {
          password: newPassword,
          // resetPasswordLink: ''
        };

        user = _.extend(user, updatedFields);

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: "Error resetting user password",
            });
          }
          return res.status(200).json({
            user,
          });
        });

        // return res.status(200).json({user});
      } else {
        return res.status(401).json({ errors: err });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ errors: error });
  }
};

exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   const firstError = errors.array().map(error => error.msg)[0];
  //   return res.status(422).json({
  //     errors: firstError
  //   });
  // } else {
  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, JWT_RESET_PASSWORD, function (err, decoded) {
      if (err) {
        return res.status(400).json({
          error: "Expired link. Try again",
        });
      }

      User.findOne(
        {
          resetPasswordLink,
        },
        (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: "Something went wrong. Try later",
            });
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };

          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: "Error resetting user password",
              });
            }
            res.json({
              message: `Great! Now you can login with your new password`,
            });
          });
        }
      );
    });
  }
};

exports.adminMiddleware = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        errors: "User not found",
      });
    }

    if (user.role == null) {
      return res.status(400).json({
        errors: "Admin resource. Access denied.",
      });
    }

    req.profile = user;
    next();
  });
};

// // Google login

// const client = new OAuth2Client("363253994087-8v0st55651s53q0ni7t18i1gke5qkqpf.apps.googleusercontent.com");
// // Google Login
// exports.googleController = (req, res) => {
//   const { idToken } = req.body;

//   client
//     .verifyIdToken({ idToken, audience: "363253994087-8v0st55651s53q0ni7t18i1gke5qkqpf.apps.googleusercontent.com" })
//     .then(response => {
//       // console.log('GOOGLE LOGIN RESPONSE',response)
//       const { email_verified, name, email } = response.payload;
//       if (email_verified) {
//         User.findOne({ email }).exec((err, user) => {
//           if (user) {
//             const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
//               expiresIn: '7d'
//             });
//             const { _id, email, name, role } = user;
//             return res.json({
//               token,
//               user: { _id, email, name, role }
//             });
//           } else {
//             let password = email + SECRET_KEY;
//             user = new User({ name, email, password });
//             user.save((err, data) => {
//               if (err) {
//                 console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
//                 return res.status(400).json({
//                   error: 'User signup failed with google'
//                 });
//               }
//                 console.log(user);
//               const token = jwt.sign(
//                 { _id: data._id },
//                 process.env.SECRET_KEY,
//                 { expiresIn: '7d' }
//               );
//               const { _id, email, name, role } = data;
//               return res.json({
//                 token,
//                 user: { _id, email, name, role }
//               });
//             });
//           }
//         });
//          console.log("success");
//       } else {
//         console.log("error");
//         return res.status(400).json({
//           error: 'Google login failed. Try again'
//         });
//       }
//     });
// };

// exports.resetPasswordController = (req, res) => {
//   const { resetPasswordLink, newPassword } = req.body;

//   // const errors = validationResult(req);

//     if (resetPasswordLink) {
//       jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(err,decoded ) {
//         if (err) {
//           return res.status(400).json({
//             error: 'Expired link. Try again'
//           });
//         }

//         User.findOne({  resetPasswordLink }, (err, user) => {
//             if (err || !user) {
//               return res.status(400).json({
//                 error: 'Something went wrong. Try later'
//               });
//             }

//             const updatedFields = {
//               password: newPassword,
//               resetPasswordLink: ''
//             };

//             user = _.extend(user, updatedFields);

//             user.save((err, result) => {
//               if (err) {
//                 return res.status(400).json({
//                   error: 'Error resetting user password'
//                 });
//               }
//               res.json({ message: `Great! Now you can login with your new password` });

//             });

//           });
//       });

//   }
// };

// exports.resetPasswordController = (req, res) => {
//   const { resetPasswordLink, newPassword } = req.body;

// if(resetPasswordLink){

// }else{
//   return res.status(401).json({error: "Authneticaton error"})
// }

// }

// // logout by clearCookie and jwt token
// exports.logout =   async function( req , res){
//        try {
//         //   console.log(req.user)
//          req.user.tokens  = req.user.tokens.filter((currElement) => {
//              return currElement.token !== req.token
//          })
//         // res.clearCookie("jwt");
// // console.log( req.user.tokens);
//          console.log("logout successfully");
//          await req.user.save();
//          res.send("you have  logged out sir !");
//        } catch (error) {
//           res.send("catch some error !")
//          res.status(500).send("you have already logged out sir !");
//        }

// };

exports.userData = async function (req, res) {
  try {
    await User.find({}, (err, user) => {
      if (user) {
        return res.status(201).send({
          user,
        });
      } else {
        console.log(err);
      }
      console.log(user);
    });
  } catch (error) {
    console.log("logout error");
    res.status(500).json({ message: "you have already logged out sir !" });
  }
};

exports.orderData = async function (req, res) {
  try {
    await Device.find({}, (err, user) => {
      if (user) {
        return res.status(201).send({
          user,
        });
      } else {
        console.log(err);
      }
      console.log(user);
    });
  } catch (error) {
    console.log("logout error");
    res.status(500).json({ message: "you have already logged out sir !" });
  }
};

// logout by clearCookie and jwt token
exports.cart = async function (req, res) {
  try {
    await Device.find({ email: req.params.id }, (err, user) => {
      if (user) {
        console.log(user);
        return res.status(201).send({
          user,
        });
      } else {
        console.log(err);
      }
      console.log(user);
    });
  } catch (error) {
    console.log("logout error");
    res.status(500).json({ message: "you have already logged out sir !" });
  }
};




// // logout by clearCookie and jwt token
// exports.address = async function (req, res) {
//   try {
//     await Device.find({ email: req.params.id }, (err, user) => {
//       if (user) {
//         return res.status(201).send({
//           user,
//         });
//       } else {
//         console.log(err);
//       }
//       console.log(user);
//     });
//   } catch (error) {
//     console.log("logout error");
//     res.status(500).json({ message: "you have already logged out sir !" });
//   }
// };



// devices
exports.device = async function (req, res) {
  //     try {

  // const email = req.body.email;

  //  const userId = await User.findOne({email:email});
  // const emails = userId.email;

  // console.log(email);
  //  console.log(emails);

  //  if(email === emails){

  //           const deviceData = new Device(req.body);
  //       await deviceData.save();
  //         return res.status(201).json({mesaage: "confirmed"});

  //     } else{

  //      res.send("email is incorrect");
  //     }

  //     } catch (error) {
  //         res.status(400).send("email id should be the  same when you registered");
  //     }

  // };
  try {
    const email = req.body.email;
    console.log("========>>>>>>", email);
    const userId = await User.findOne({ email: email });
    const emails = userId.email;
    console.log("=====>>>", userId);

    console.log(email);
    console.log(emails);

    if (email === emails) {
      console.log("call");
      const deviceData = new Device(req.body);
      await deviceData.save();

          const {orderOtp , email, name, _id } = deviceData
          if(deviceData){
       return res.status(201).json({ _id });
          }

      console.log("=======>>>>>>>>", deviceData, orderOtp, email, name);
      console.log("===>>..", email);

      const mailOptions = {
        from: EMAIL,
        to: email,
        subject: "Welcome to Realback",
        html: `<head>
  <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body {
      margin: 0;
      background: #FEFEFE;
      color: #585858;
    }

    table {
      font-size: 15px;
      line-height: 23px;
      max-width: 500px;
      min-width: 460px;
      text-align: center;
    }
    .table_inner { min-width: 100% !important; }
    td {
      font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      vertical-align: top;
    }
    
    .carpool_logo { margin: 30px auto; }

    .dummy_row { padding-top: 20px !important; }
    .section,
    .sectionlike { background: #C9F9E9; }
    .section { padding: 0 20px;  }
    .sectionlike { padding-bottom: 10px; }
    .section_content {
      width: 100%;
      background: #fff;
    }
    .section_content_padded { padding: 0 35px 40px; }
    .section_zag { background: #F4FBF9; }
    .imageless_section { padding-bottom: 20px; }

    img {
      display: block;
      margin: 0 auto;
    }
    .img_section {
      width: 100%;
      max-width: 500px;
    }
    .img_section_side_table { width: 100% !important; }

    h1 {
      font-size: 20px;
      font-weight: 500;
      margin-top: 40px;
      margin-bottom: 0;
    }
    .near_title { margin-top: 10px; }
    .last { margin-bottom: 0; }

    a {
      color: #63D3CD;
      font-weight: 500;
      word-break: break-word; /* Footer has long unsubscribe link */
    }

    .button {
      display: block;
      width: 100%;
      max-width: 300px;
      background: #04f5a5;
      border-radius: 8px;
      color: #fff;
      font-size: 18px;
      font-weight: normal; /* Resetting from a */
      padding: 12px 0;
      margin: 30px auto 0;
      text-decoration: none;
    }

    small {
      display: block;
      width: 100%;
      max-width: 330px;
      margin: 14px auto 0;
      font-size: 14px;
    }
    .signature { padding: 20px; }

    .footer,
    .footer_like { background: #1FD99A; }
    .footer { padding: 0 20px 30px; }
    .footer_content {
      width: 100%;
      text-align: center;
      font-size: 12px;
      line-height: initial;
      color: #005750;
    }
    .footer_content a {
      color: #005750;
    }
    .footer_item_image { margin: 0 auto 10px; }
    .footer_item_caption { margin: 0 auto; }

    .footer_legal {
      padding: 20px 0 40px;
      margin: 0;
      font-size: 12px;
      color: #A5A5A5;
      line-height: 1.5;
    }

    .text_left { text-align: left; }
    .text_right { text-align: right; }
    .va { vertical-align: middle;  }
    
    .stats {
      min-width: auto !important;
      max-width: 370px;
      margin: 30px auto 0;
    }
    .counter { font-size: 22px; }
    .stats_counter { width: 23%; }
    .stats_image {
      width: 18%;
      padding: 0 10px;
    }
    .stats_meta { width: 59%; }
    .stats_spaced { padding-top: 16px; }
    .walkthrough_spaced { padding-top: 24px; }

    .walkthrough { max-width: none;  }
    .walkthrough_meta { padding-left: 20px; }

    .table_checkmark { padding-top: 30px;  }
    .table_checkmark_item { font-size: 15px; }
    .td_checkmark {
      width: 24px;
      padding: 7px 12px 0 0;
    }

    .padded_bottom { padding-bottom: 40px; }
    .marginless { margin: 0; }

    /* Restricting responsive for iOS Mail app only as Inbox/Gmail have render bugs */
    @media only screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
      table { min-width: auto !important; }

      .section_content_padded {
        padding-right: 25px !important;
        padding-left: 25px !important;
      }

      .counter { font-size: 18px !important; }
    }
  </style>
</head>
<body style=" margin: 0;
  background: #eef7fa;
  color: #383838;
">
  <!-- Preivew text -->
  <span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;border-collapse: collapse;border: 0px;"></span> 
  <!-- Carpool logo -->
  <table align="center" border="0" cellspacing="0" cellpadding="0" style="  font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
">
    <tbody>
        <br><br>
    <!-- Header -->
    <tr>
      <td class="sectionlike imageless_section" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
  background: #ffffff;
  padding-bottom: 10px;
padding-bottom: 20px;"></td>
    </tr>
    <!-- Content -->
    <tr>
      <td class="section" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
  background: #ffffff;
  padding: 0 20px;
">
        <table border="0" cellspacing="0" cellpadding="0" class="section_content" style=" font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
  width: 100%;
  background: #fff;
">
          <tbody><tr>
            <td class="section_content_padded" style="  font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
padding: 0 35px 40px;">
              <h1 style=" font-size: 25px;
  font-weight: 500;
  color: #171717;
  margin-top: 20px;
  margin-bottom: 0;
">Welcome To Realback Services</h1>
<br>
<h1   style="color: #171717;  font-size: 30px;" >Hii ${name}</h1><br>
              <p class=" margin-top: 10px; font-size: 20px;  color: #171717; " style="margin-top: 10px;margin-bottom: 0;"> ${email} your order is successfully submitted  and your order otp is given below please don't share it with anyone share this only realback agent Thank you from Realback</p>
              <h1  style="color: #171717;  font-size: 30px;">${orderOtp}</h1>
              
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
    <!-- Signature -->
 
    <!-- Footer -->
   
    <tr>
      <td style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
        <table border="0" cellspacing="0" cellpadding="0" class="section_content" style=" font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
  width: 100%;
  background: #fff;
">
          <tbody><tr>
            <td class="footer_like" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
background: #ffffff; "><img src="https://cdn.dribbble.com/users/1247188/screenshots/8699871/media/4676a06d00a58fe9678d80fe1f8bd776.jpg" alt="" width="500" class="img_section" style=" display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
"></td>
          </tr>
          <tr>
            <td class="footer" style="  font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
  padding: 0 20px 30px;
  background: #ffffff;
">
              <table border="0" cellspacing="0" cellpadding="0" class="footer_content" style="  font-size: 15px;
  line-height: 23px;
  max-width: 500px;
  min-width: 460px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  line-height: initial;
  color: #005750;
">
                <tbody><tr>
                  <td width="33%" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
                    <img src="https://carpool-email-assets.s3.amazonaws.com/shared/footer-learn@2x.png" width="24" class="footer_item_image" style="  display: block;
  margin: 0 auto;
margin: 0 auto 10px;">
                    <p class="footer_item_caption" style="margin: 0 auto;">More about <br><a href="https://www.instagram.com/realbackindia?r=nametag" style="  color: #0786fd;
" target="_blank">Realback</a></p>
                  </td>
                  <td width="33%" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
                    <img src="https://carpool-email-assets.s3.amazonaws.com/shared/footer-support@2x.png" width="24" class="footer_item_image" style="  display: block;
  margin: 0 auto;
margin: 0 auto 10px;">
                    <p class="footer_item_caption" style="margin: 0 auto;">Questions? <br><a href="https://support.google.com/waze/carpool" style=" color: #0786fd;
" target="_blank">We're here</a>
                  </p></td>
                  <td width="33%" style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
                    <img src="https://carpool-email-assets.s3.amazonaws.com/shared/footer-fb@2x.png" width="24" class="footer_item_image" style=" display: block;
  margin: 0 auto;
margin: 0 auto 10px;">
                    <p class="footer_item_caption" style="margin: 0 auto;">Join the community <br><a href="https://www.facebook.com/groups/wazecarpoolers" style="  color: #0786fd;
" target="_blank">on Facebook</a></p>
                  </td>
                </tr>
              </tbody></table>
            </td>
          </tr>
        </tbody></table>
      </td>
    </tr>
    <!-- Legal footer -->
    <tr>
      <td style=" font-family: -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
  vertical-align: top;
    border: none !important;
">
        <p class="footer_legal" style=" padding: 20px 0 40px;
  margin: 0;
  font-size: 15px;
  color: #171717;
  line-height: 1.5;
">
        If you did not enter this email address when signing up for Realback service, disregard this message.<br>
        © 2021 Google Inc. 1600 Amphitheatre Parkway, Mountain View, CA 94043
<br><br>

This is a mandatory service email from Realback.
</p>
      </td>
    </tr>
  </tbody></table>

</body>




<!-- 
https://i.pinimg.com/originals/a4/51/39/a451393c169a91586312551109361064.gif


https://i.pinimg.com/originals/a3/84/3e/a3843e404a271edb47b1908dd2a6230b.gif -->
            `,
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log("not sent ", err);
          return res.status(400).json({ errors: err });
        }
        //  return res.json({mesaage: `email has been sent to ${email} ✔`})
      });

      console.log("email sent");
      return res.status(201).json({ _id });
    } else {
      console.log("!email ");
      return res.status(400).json({ errors: "email is not match" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ errors: err });
  }
};

exports.personal = async function (req, res) {
  try {
    const email = req.body.email;
    const userId = await User.findOne({ email: email });
    const emails = userId.email;

    console.log(email);
    console.log(emails);

    if (email === emails) {
      const personalData = new Personal(req.body);
      await personalData.save();
      console.log("success");
      return res.status(201).json({ message: "success" });
    } else {
      console.log("!email ");
      return res.status(400).json({ errors: "email is not match" });
    }
  } catch (err) {
    console.log("error");
    return res
      .status(400)
      .json({ errors: "email id should be the same when you loggedin" });
  }
};

//     const {  name, email, number, countary,  state,  city,  pincode,   Address, } = req.body;

// //  const userId = await User.findOne({email:email});
// // const emails = userId.email;

// // console.log(email);
// //  console.log(emails);

// //  if(email === emails){

//    const personalData = new Personal( name, email, number, countary,  state,  city,  pincode,   Address,);
//       await personalData.save();

//            await personalData.save(); ((err, personalData) => {
//           if (err) { console.log('Save error account activation');
//             return res.status(401).json({
//               errors: `error activating account`
//             });
//           } else {

//             return res.status(201).json( {message : "success"});
//           }
//         });
// //     } else{
// // console.log("incorrect email")
// //     return res.status(400).json({error: "email is not match"});
// //     }
//     } catch (err) {
//       console.log("incorrect ")
//          return res.status(400).json({error: "not submit"});
//     }

// const accountSid =   Account_Sid;
// const authToken =   Auth_Token;
// const client = require('twilio')(accountSid, authToken);

const accountSid = "AC9627beb94cd72e5dea9f3f626e09db90";
const authToken = "f4dbd2ff58c356d09332af72a519e863";
const client = require("twilio")(accountSid, authToken);

exports.otp = (req, res) => {
  const { number } = req.body;
  client.verify
    .services(Service_id)
    .verifications.create({ to: "+91" + number, channel: "sms" })
    .then((verification) => {
      res.status(200).json({ verification });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.Verifyotp = (req, res) => {
  const { number, otp } = req.body;
  console.log(number, otp);
  client.verify
    .services(Service_id)
    .verificationChecks.create({ to: "+91" + number, code: otp })
    .then((verification_check) => {
      res.status(200).json({ verification_check });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//!Email otp

exports.emailOtp = (req, res) => {
  const { number } = req.body;
  client.verify
    .services(Service_id)
    .verifications.create({ to: "+91" + number, channel: "sms" })
    .then((verification) => {
      res.status(200).json({ verification });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.whatsapp = (req, res) => {
  try {
    client.messages
      .create({
        body: "Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/",
        from: "whatsapp:+14155238886",
        to: "whatsapp:+919522540020",
      })
      .then((message) => console.log(message.sid))
      .done();
    return res.status(200).json("success");
  } catch (error) {
    return res.status(400).json({ error });
  }
};




exports.upi =(req, res) =>{
  const options = req.body
  instance.invoices.create(options , function (err, order){
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
   
    return res.status(200).json(order);
  });
}

exports.payment = (req, res) => {
  const { price } = req.params;

  console.log(price);

  const amount = price;
  const currency = "INR";
  const receipt = uniquId();

  instance.orders.create({ amount, currency, receipt }, function (err, order) {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    orderId = order.id;
    return res.status(200).json(order);
  });
};

exports.paymentCallback = (req, res) => {
  // const {_id} = req.params
  console.log("webhook triggerd");
  // const form = Formidable();
  // form.parse(req, (err, fields, files) => {
  console.log("=====>>>>>>>>>>", JSON.stringify(req.body));
  //  const ID = JSON.stringify(req.body)
  //    console.log("=========>>>>",req.body.payload);
  //  console.log("=========>>>>",req.body.payload.payment.entity.notes.address);
  const { email, contact, notes, id, order_id } =
    req.body.payload.payment.entity;

  const _id = notes.address;
  console.log("....>>>>>", _id);
  //  const {notes} = req.body
  //  console.log(">>>>>>>>>>",notes);
  // console.log("FIELDS", fields);
  const crypto = require("crypto");
  const hash = crypto
    .createHmac("SHA256", "sachin4c")
    .update(JSON.stringify(req.body))
    .digest("hex");
  console.log(hash);
  console.log(req.headers["x-razorpay-signature"]);

  if (hash === req.headers["x-razorpay-signature"]) {
    // const info = {
    //   _id: fields.razorpay_payment_id,
    //   razorpay_order_id: fields.razorpay_order_id,
    // };
    // const order = new orderSchema({
    //   _id: info._id,
    //   orders: fields.razorpay_order_id,
    // });

    // order.save((err, data) => {
    //   if (err) {
    //     res.status(400).json({
    //       error: "Not able to save in Db",
    //     });
    //   } else {
    //     console.log("=========>>>>>>>>>success",order);
    //     // res.redirect(
    //     //   `${CLIENT_URL}/payment/status/${fields.razorpay_payment_id}`
    //     // );
    //   }
    // });
    // const _id = "60c71706ecc5e725b0e2c5a1"
    console.log("going");
    Device.findOne(
      {
        _id,
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "Something went wrong. Try later",
          });
        }

        const updatedFields = {
          mode: "success",
          paymentid: id,
          orderid: order_id,
        };

        user = _.extend(user, updatedFields);

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: "Error resetting user password",
            });
          }

          res.json({
            message: `payment accept`,
          });
        });
      }
    );
    console.log("success");
  } else {
    console.log("error");
  }

  // });
};
exports.getLogo = (req, res) => {
  res.sendFile(path.join(__dirname, "m18.png"));
};

exports.getPayment = (req, res) => {
  orderSchema.findById(req.params.paymentId).exec((err, data) => {
    if (err || data == null) {
      return res.json({
        error: "No order Found",
      });
    }
    request(
      `https://${KEY_ID}:${KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}`,
      function (error, response, body) {
        if (body) {
          const result = JSON.parse(body);
          res.status(200).json(result);
        }
      }
    );
  });
};





exports.product = async function (req, res) {
  try {
    const { model, Dtype, deviceName } = req.body;
   

      console.log(
        "====>>>>>>>>>>>>>>",
        JSON.stringify(model),
        Dtype,
        deviceName
      );
        const personalData = new Product(req.body);
        await personalData.save();
    return res.status(201).json("pass data");
    
  } catch (err) {
    return res.status(401).json(err);
  }
};




exports.getCompany = async function (req, res) {
  try {
    const { Dtype } = req.params;
    console.log(Dtype);
    await Product.find({ Dtype }, (err, device) => {
      if (device) {
        console.log(device);
        return res.status(201).send({
          device,
        });
      } else {
        console.log(err);
      }
      console.log(device);
    });
  } catch (error) {
    console.log("logout error");
    res.status(500).json(error);
  }
};


exports.getmodel = async function (req, res) {
  try {
    const { itemValue } = req.params;
    console.log(itemValue);
    await Product.findOne({ _id: itemValue }, (err, device) => {
      if (device) {
        console.log(device);
        return res.status(201).send({
          device,
        });
      } else {
        console.log(err);
      }
      console.log(device);
    });
  } catch (error) {
    console.log("logout error");
    res.status(500).json(error);
  }
};


exports.getmodedata = async function (req, res) {
  try {
    const { itemValue } = req.params;
    console.log(itemValue);
    await Product.findOne({ 'model._id' : itemValue }, (err, device) => {
      if (device) {
        console.log(device);
        return res.status(201).send({
          device,
        });
      } else {
        console.log(err);
      }
      console.log(device);
    });
  } catch (error) {
    console.log("logout error");
    res.status(500).json(error);
  }
};