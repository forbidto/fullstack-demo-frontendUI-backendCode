const AWS = require('aws-sdk');

// Set the region for SNS and SES
AWS.config.update({ region: 'us-east-1' });

const sns = new AWS.SNS();
const ses = new AWS.SES();

module.exports = { sns, ses };