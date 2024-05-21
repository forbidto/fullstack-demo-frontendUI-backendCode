const { sendPhoneOtp, sendEmailOtpForRegistration, register, sendEmailOtpLogin, login } = require('../services/authService')


// Send OTP for registration controller
const sendPhoneOtpControl = async (req, res) => {
  const { phone, email } = req.body
  try {
    const sendPhoneOtpRes = await sendPhoneOtp(phone, email);
    res.status(201).json(sendPhoneOtpRes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Send OTP for registration controller
const sendEmailOtpRegistrationControl = async (req, res) => {
  const { email } = req.body
  try {
    const sendEmailOtpForRegistrationRes = await sendEmailOtpForRegistration(email);
    res.status(201).json(sendEmailOtpForRegistrationRes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Register a new user
const registerControl = async (req, res) => {
  const { username, email, phone } = req.body;
  console.log("req", req.body)
  try {

    const registerRes = await register(username, email, phone);

    console.log('registerRes', registerRes)

    if (registerRes.success) {
      res.cookie('token', registerRes.acToken, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 }); // Set JWT token cookie (3 hours)
      res.cookie('refreshToken', registerRes.rfToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // Set refresh token cookie (7 days)
      res.status(201).json({ success: true, message: registerRes.message });
    } else {
      res.status(400).json({ success: false, message: registerRes.message });
    }

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Send OTP for login
const sendEmailOtpLoginControl = async (req, res) => {
  const { email } = req.body;
  try {
    const sendEmailOtpLoginRes = await sendEmailOtpLogin(email);
    res.status(201).json(sendEmailOtpLoginRes);
  }
  catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Login a user
const loginControl = async (req, res) => {
  const { email } = req.body;
  try {
    const loginRes = await login(email);

    if (loginRes.success) {
      res.cookie('token', result.acToken, { httpOnly: true, maxAge: 3 * 60 * 60 * 1000 }); // Set JWT token cookie (3 hours)
      res.cookie('refreshToken', result.rfToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // Set refresh token cookie (7 days)
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { sendPhoneOtpControl, sendEmailOtpRegistrationControl, registerControl, sendEmailOtpLoginControl, loginControl };