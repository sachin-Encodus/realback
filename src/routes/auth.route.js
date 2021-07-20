const express = require("express");
const router = express.Router();

// Load Controllers
const {
  register,
  activate,
  signin,
  device,
  cart,
  personal,
  payment,
  forgotPasswordController,
  resetPasswordController,
  googleController,
  paymentCallback,
  getPayment,
  getLogo,
  orderData,
  userData,
  otp,
  Verifyotp,
  googlesignUp,
  googlelogin,
  resetPass,
  whatsapp,
  upi,
  product,
  getCompany,
  getmodel,
  getmodedata,
  cartid,
  updatestatus,
  cartotp,
} = require("../../controllers/auth.controller");

router.post("/register", register);
router.post("/signin", signin);
router.post("/device", device);
router.get("/cart/:id", cart);
router.get("/cartid/:id", cartid);
router.get("/cartotp/:id", cartotp);

router.post("/status", updatestatus);
router.get("/order", orderData);
router.get("/user", userData);
router.post("/otp", otp);
router.post("/Verifyotp", Verifyotp);

router.get("/payment/:price", payment);
router.post("/payment/callback", paymentCallback);
router.get("/payments/:paymentId", getPayment);
router.get("/logo", getLogo);
// router.get('/logoutall', logoutall);
router.post("/activate-email", activate);
router.get("/whatsapp", whatsapp);
router.post("/activate-email", activate);
router.post("/personal", personal);
router.post("/googlesignUp", googlesignUp);
router.post("/upi", upi);
router.post("/googlelogin", googlelogin);
router.post("/product" , product)

router.get("/getCompany/:Dtype", getCompany);
router.get("/getmodel/:itemValue", getmodel);
router.get("/getmodedata/:itemValue", getmodedata);
// forgot reset password
router.put("/forgotpassword", forgotPasswordController);
router.put("/resetpassword", resetPasswordController);
router.put("/resetPass", resetPass);
module.exports = router;