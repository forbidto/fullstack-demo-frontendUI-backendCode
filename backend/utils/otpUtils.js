const { sns, ses } = require('../config/awsConfig');
const Otp = require('../models/mongoModels/otpSchema');
const User = require('../models/userModel');

// Generate a random OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

// Send OTP By SMS
const sendOtpByPhone = async (phone, otp) => {
  try {
    const params = {
      Message: `Your OTP is: ${otp}`,
      PhoneNumber: phone,
    };
    await sns.publish(params).promise();
    return { success: true, message: 'OTP sent via SMS' };
  } catch (error) {
    console.error('Error sending OTP via SMS:', error);
    return { success: false, message: 'Failed to send OTP via SMS' };
  }
};

// Send OTP By Email
const sendOtpByEmail = async (identifier, otp) => {
  try {
    const params = {
      Source: 'waiwyw211@gmail.com',  // Replace with your verified SES email
      Destination: { ToAddresses: [identifier] },
      Message: {
        Subject: { Data: 'Your OTP' },
        Body: { Text: { Data: `Your OTP is: ${otp}` } },
      },
    };
    await ses.sendEmail(params).promise();
    return { success: true, message: 'OTP sent via email' };
  } catch (error) {
    console.error('Error sending OTP via email:', error);
    return { success: false, message: 'Failed to send OTP via email' };
  }
};

// Store OTP in MongoDB
const storeOtp = async (identifier, otp) => {
  try {
    await Otp.findOneAndUpdate(
        { identifier }, // Find the document by identifier
        { otp, createdAt: Date.now() }, // Update OTP and reset createdAt to current time
        { upsert: true, new: true, setDefaultsOnInsert: true } // Create a new document if it doesn't exist
      );
      return {success: true, message: "otp storded successfully"}
  } catch (error) {
    console.error('Error storing OTP in MongoDB:', error);
    return { success: false, message: 'Failed to store OTP' };
  }
};


//Get OTP in MongoDB

const getStoredOtp = async (identifier) => {
    try {
        const otpDoc = await Otp.findOne({ identifier });
        console.log('otpDoc', otpDoc);
        if (!otpDoc) {
          throw new Error('OTP not found.');
        }
        return { success: true, otp: otpDoc.otp };
      } catch (error) {
        console.error('Error retrieving OTP from MongoDB:', error);
        return { success: false, message: error.message };
      }
  };



module.exports = { generateOtp, sendOtpByPhone, sendOtpByEmail, storeOtp, getStoredOtp };