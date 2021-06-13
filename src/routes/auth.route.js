const express = require('express');
const router = express.Router();

// Load Controllers
const { register, activate,signin, device,
      cart, personal  , payment,
       forgotPasswordController,
        resetPasswordController,
        googleController,
        paymentCallback,
        getPayment,
        getLogo,
        orderData,
        userData,
        otp,
        Verifyotp

} = require('../../controllers/auth.controller')


router.post('/register', register);
router.post('/signin', signin);
router.post('/device', device);
router.get('/cart/:id', cart);
router.get('/order', orderData);
router.get('/user', userData);
router.post('/otp', otp);
router.post('/Verifyotp', Verifyotp);

router.get('/payment/:price' , payment)
router.post("/payment/callback", paymentCallback);
router.get("/payments/:paymentId", getPayment);
router.get("/logo", getLogo);
// router.get('/logoutall', logoutall);
router.post('/activate-email', activate);
router.post('/personal', personal);
// router.post('/googlelogin', googleController)
// forgot reset password
router.put('/forgotpassword',  forgotPasswordController);
router.put('/resetpassword',  resetPasswordController);

module.exports = router;
