const express = require('express');
const {sendPhoneOtpControl, sendEmailOtpRegistrationControl, registerControl, sendEmailOtpLoginControl, loginControl} = require('../controllers/authController');
const { verifyOtpMiddleware } = require('../middlewares/verifyOtpMiddleware')

const router = express.Router();

router.post('/send-phone-otp', sendPhoneOtpControl);
router.post('/verify-phone-otp', verifyOtpMiddleware, sendEmailOtpRegistrationControl);
router.post('/verify-otp-registration', verifyOtpMiddleware, registerControl);
router.post('/send-otp-login', sendEmailOtpLoginControl);
router.post('/login', verifyOtpMiddleware, loginControl);

module.exports = router;