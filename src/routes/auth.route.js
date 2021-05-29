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
        getLogo

} = require('../../controllers/auth.controller')


router.post('/register', register);
router.post('/signin', signin);
router.post('/device', device);
router.get('/cart/:id', cart);
router.get('/payment' , payment)
router.post("/payment/callback", paymentCallback);
router.get("/payments/:paymentId", getPayment);
router.get("/logo", getLogo);
// router.get('/logoutall', logoutall);
router.post('/activate-email', activate);
router.post('/personal', personal);
router.post('/googlelogin', googleController)
// forgot reset password
router.put('/forgotpassword',  forgotPasswordController);
router.put('/resetpassword',  resetPasswordController);

module.exports = router;
