const User = require('../models/userModel');
const Token = require('../models/userTokenModel')
const { generateOtp, sendOtpByEmail, storeOtp, getStoredOtp, sendOtpByPhone } = require('../utils/otpUtils');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const { sequelize } = require('../config/postgreConfig');

const getUser = async (phone, email) => {

  const userByPhone = await User.findOne({ where: { phone } });
  const userByEmail = await User.findOne({ where: { email } });
  return { userByPhone, userByEmail };

}

const getUserByEmail = async (email) => {
  const userByEmail = await User.findOne({ where: { email } });
  return userByEmail;
};

//Verify Otp

const verifyOtp = async (identifier, otp) => {

  try {
    const getStoredOtpRes = await getStoredOtp(identifier);


    console.log('getStoredOtpRes', getStoredOtpRes)

    if (!getStoredOtpRes.success) {
      return getStoredOtpRes;
    }

    if (getStoredOtpRes.otp !== otp) {
      return { success: false, message: 'Invalid OTP.' };
    }

    return { success: true, message: 'OTP verified successfully.' };


  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, message: 'Failed to verify OTP' };
  }

}

//Send phone otp for registration first step
const sendPhoneOtp = async (phone, email) => {
  try {
    let errorMessage = '';

    const getUserRes = await getUser(phone, email);
    const { userByPhone, userByEmail } = getUserRes;

    if (userByPhone) {
      errorMessage = 'Phone number already registered.';
      throw new Error(errorMessage);
    }

    if (userByEmail) {
      errorMessage = 'Email already registered.';
      throw new Error(errorMessage);
    }

    const otp = generateOtp();

    const storeOtpRes = await storeOtp(phone, otp);

    if (!storeOtpRes.success) {
      throw new Error(storeOtpRes.message);
    }
    const sendOtpByPhoneRes = await sendOtpByPhone(phone, otp);

    if (!sendOtpByPhoneRes.success) {
      throw new Error(sendOtpByPhoneRes.message);
    }

    return { success: true, message: 'OTP sent successfully.' };


  } catch (error) {
    throw new Error(error.message);
  }

}

//Send email otp for registration second step
const sendEmailOtpForRegistration = async (email) => {

  try {

    const otp = generateOtp();
    const storeOtpRes = await storeOtp(email, otp);

    if (!storeOtpRes.success) {
      throw new Error(storeOtpRes.message);
    }

    const sendEmailOtpRes = await sendOtpByEmail(email, otp);

    if (!sendEmailOtpRes.success) {
      throw new Error(sendEmailOtpRes.message);
    }

    return { success: true, message: 'OTP sent successfully.' };

  } catch (error) {
    throw new Error(error.message);
  }
};

// Register a new user
const register = async (username, email, phone) => {

  let transaction;

  try {

    transaction = await sequelize.transaction();

    console.log('Transaction started', transaction);

    // Check for existing user with same phone or email
    const { userByPhone, userByEmail } = await getUser(phone, email);

    if (userByPhone) {
      throw new Error('Phone number already registered');
    }

    if (userByEmail) {
      throw new Error('Email already registered');
    }

    console.log("existing", userByPhone, userByEmail);

    const user = await User.create({ username, email, phone }, { transaction });

    console.log('User created', user);
    console.log("userData", user.dataValues)
    console.log("userId", user.dataValues.id)

    const { acToken, acExpiryDate } = await generateAccessToken(user.dataValues.id);
    const { rfToken, rfExpiryDate } = await generateRefreshToken();

    console.log('Generated tokens', acToken, rfToken);

    // Batch write tokens within the transaction
    await Token.bulkCreate([
      {
        userId: user.dataValues.id,
        token: acToken,
        type: 'access',
        expiryDate: acExpiryDate, // 3 hours
      },
      {
        userId: user.dataValues.id,
        token: rfToken,
        type: 'refresh',
        expiryDate: rfExpiryDate,
      }
    ], { transaction });

    console.log('Before transaction commit');

    await transaction.commit();

    console.log('Transaction committed');

    return { success: true, message: 'User registered', acToken, rfToken };


  } catch (error) {
    await transaction.rollback();
    console.error('Error registering user:', error);
    console.error('Error registering user:', error.message);
    return { success: false, message: error.message };
  }
};


// Send OTP for login
const sendEmailOtpLogin = async (email) => {

  try {

    const getUserRes = await getUserByEmail(email)

    console.log("getuserRes", getUserRes)

    if (getUserRes) {

      const otp = generateOtp();

      console.log("otp", otp);

      const storeOtpRes = await storeOtp(email, otp);

      console.log("storeOtp", storeOtpRes)

      if (!storeOtpRes.success) {
        return { success: false, message: storeOtpRes.message };
      }

      const sendOtpRes = await sendOtpByEmail(email, otp)

      if (sendOtpRes.success) {
        return { success: true, message: "OTP sent successfully by email" }
      }

    } else {
      return { success: false, message: "The email is not registered" }
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Login a user
const login = async (email) => {

  let transaction;

  try {


    transaction = await sequelize.transaction();

    console.log('Transaction started', transaction);

    const getUserRes = await getUserByEmail(email)

    if (!getUserRes) {
      throw new Error('Email not registered');
    }

    const { acToken, acExpiryDate } = await generateAccessToken(getUserRes.dataValues.id);
    const { rfToken, rfExpiryDate } = await generateRefreshToken();

    console.log('Generated tokens', acToken, rfToken);

    // Batch write tokens within the transaction
    await Token.bulkCreate([
      {
        userId: getUserRes.dataValues.id,
        token: acToken,
        type: 'access',
        expiryDate: acExpiryDate, // 3 hours
      },
      {
        userId: getUserRes.dataValues.id,
        token: rfToken,
        type: 'refresh',
        expiryDate: rfExpiryDate,
      }
    ], { transaction });

    console.log('Before transaction commit');

    await transaction.commit();

    console.log('Transaction committed');

    return { success: true, message: 'User logged in', acToken, rfToken };


  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Error registering user:', error);
    console.error('Error registering user:', error.message);
    return { success: false, message: error.message };
  }
};



module.exports = { sendPhoneOtp, sendEmailOtpForRegistration, register, sendEmailOtpLogin, login, verifyOtp };