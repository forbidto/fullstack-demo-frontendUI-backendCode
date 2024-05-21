const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const generateAccessToken = async (userId) => {

    console.log('access token userId', userId);

    const token = jwt.sign({ userId }, process.env.AUTH_SECRET_KEY, { expiresIn: '3h' });
    const expiryDate = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours

    console.log("accesstoken", token)
    return { acToken: token, acExpiryDate: expiryDate };
};

const generateRefreshToken = async () => {
    const token = uuidv4();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7); // Refresh token valid for 7 days
    console.log("refreshtoken", token)
    return { rfToken: token, rfExpiryDate: expiryDate };
};


module.exports = { generateAccessToken, generateRefreshToken };