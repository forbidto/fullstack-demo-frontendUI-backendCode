

//validate bussiness id

export const validateBussinessRegistrationId = (bussinessId) => {

  const bussinessIdRegEx = /^\d{8}$/;
  return bussinessIdRegEx.test(bussinessId);

};


export const validateHKPhoneNumber = (phone) => {
  // Regular expression for a HK phone number
  const phoneRegEx = /^(4|5|6|7|8|9)\d{7}$/;
  return phoneRegEx.test(phone);
};

export const validateEmail = (email) => {
  // Regular expression for Email
  const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegEx.test(email);

}

// validate Floor

export const validateFloor = (floor) => {
  const floorRegEx = /^G$|^[0-9]{1,3}$/;
  return floorRegEx.test(floor);
}

// Parse OTP to INT

export const parseOTP = (otp) => {
  const otpAsInt = parseInt(otp, 10);
  return otpAsInt;
}

export const validateOtp = (otp) => {
  const otpRegEx = /^\d{4}$/;
  return otpRegEx.test(otp);
}


//Validate Owner Name English Input

export const validateOwnerNameInput = (name) => {
  const nameRegEx = /^[A-Za-z\s]*$/;

  const trimmedName = name.trim();
  const nameFormatCheck = nameRegEx.test(trimmedName)

  if (nameFormatCheck) {
    // Split the input into words using space as a delimiter
    const nameStrings = trimmedName.split(' ');
    // Filter out empty strings (resulting from multiple consecutive spaces)
    const validStrings = nameStrings.filter((string) => string !== '');

    // Check if the number of valid words is less than or equal to 5
    if (validStrings.length >= 2 && validStrings.length <= 5) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }

}

//Validate Company Name English Input

export const validateCompanyNameInput = (name) => {
  const nameRegEx = /^[A-Za-z\s]*$/;

  const trimmedName = name.trim();
  const nameFormatCheck = nameRegEx.test(trimmedName)

  if (nameFormatCheck) {
    // Split the input into words using space as a delimiter
    const nameStrings = trimmedName.split(' ');
    // Filter out empty strings (resulting from multiple consecutive spaces)
    const validStrings = nameStrings.filter((string) => string !== '');

    // Check if the number of valid words is less than or equal to 5
    if (validStrings.length >= 2 && validStrings.length <= 10) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }

}



// EXTRACT USER INFO FROM ACCESS TOKEN


export function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// Validate HKID
export function isValidHKID(hkid) {

  hkid = hkid.toUpperCase();

  const charValues = {
    A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16,
    H: 17, I: 18, J: 19, K: 20, L: 21, M: 22, N: 23,
    O: 24, P: 25, Q: 26, R: 27, S: 28, T: 29, U: 30,
    V: 31, W: 32, X: 33, Y: 34, Z: 35
  };

  let paddedHkid = hkid.length === 8 ? "3" + hkid : hkid;
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    let char = paddedHkid[i];
    let value = isNaN(char) ? charValues[char] % 11 : parseInt(char, 10);
    let phasedValue = value * (9 - i)
    let remainder = phasedValue % 11
    sum += remainder
  }

  return sum % 11 === 0;
}

export const currentDate = new Date();
export const currentYear = currentDate.getFullYear();
export const currentMonth = currentDate.getMonth() + 1;
export const currentDay = currentDate.getDate();

export const expirationDate = new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate() - 1);
export const expirationYear = expirationDate.getFullYear();
export const expirationMonth = expirationDate.getMonth() + 1;
export const expirationDay = expirationDate.getDate();



function getCurrentDateTimeInAWSFormat() {
  // Get the current date and time in UTC
  const now = new Date();

  // Adjust to Hong Kong timezone (UTC+8)
  now.setHours(now.getHours() + 8);

  // Format the date and time in AWS DateTime format (ISO 8601)
  const awsDateTime = now.toISOString();

  // Replace the "Z" (indicating UTC) with the timezone offset format "+08:00" for Hong Kong
  const awsDateTimeWithTimeZone = awsDateTime.replace("Z", "+08:00");

  return awsDateTimeWithTimeZone;
}

const currentAWSDateTime = getCurrentDateTimeInAWSFormat();

export const formatToHKCurrency = (value) => {
  return new Intl.NumberFormat('en-HK', {
    style: 'currency',
    currency: 'HKD',
  }).format(value);
};


export const formatWithCommas = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

