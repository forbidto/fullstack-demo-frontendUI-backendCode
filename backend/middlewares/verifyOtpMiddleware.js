const {verifyOtp } = require('../services/authService');

const verifyOtpMiddleware = async (req, res, next) => {
  const { identifier, otp } = req.body;

  try {

    const verifyRes = await verifyOtp(identifier, otp);
    if (verifyRes.success) {
        console.log("verify success")
        //res.status(200).json({ success: true, message: 'OTP verified successfully.' });
      next(); // OTP verified, proceed to the next middleware/controller
    } else {
      res.status(400).json({ success: false, message: verifyRes.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = {verifyOtpMiddleware};