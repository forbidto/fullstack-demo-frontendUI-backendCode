import { parseOTP, validateEmail, validateHKPhoneNumber, validateOtp } from '../utils/authUtils';
import { loginRegisterFail, loginRegisterSuccess, logout, authLoading, authComplete, verifyAuthFail } from '../reducers/authReducer';
import { generateClient } from 'aws-amplify/api';
import { sendOTP, validatePhoneOtpForRegistration } from '../../graphql/mutations';



const client = generateClient();

const REG_LOGIN_API_ENDPOINT = 'http://localhost:5000/register-login';//process.env.API_GATEWAY_ENDPOINT;
const AUTH_API_ENDPOINT = 'http://localhost:5000/authentication';//process.env.API_GATEWAY_ENDPOINT;

//REST API GATEWAY
const SEND_PHONE_OTP_ENDPOINT = 'http://localhost:3001/api/auth/send-phone-otp' //send first phone otp step
const VERIFY_PHONE_OTP_ENDPOINT = 'http://localhost:3001/api/auth/verify-phone-otp' //verify otp for phone registration step 
const VERIFY_OTP_REGISTRATION_ENDPOINT = 'http://localhost:3001/api/auth/verify-otp-registration'; //verify otp for email registration final step

//SEND OTP GRAPHQL API
const sendOtp = async (operation, type, phoneNumber, email) => {
    return await client.graphql({
        query: sendOTP,
        variables: {
            operation,
            type,
            phoneNumber,
            email,
        },
    });
}


// SEND Reg First OTP REST API

export const sendPhoneOtpApi = async (phone, email) => {

    if (!validateHKPhoneNumber(phone)) {
        return { success: false, message: "請輸入正確電話" };
    }

    if (!validateEmail(email)) {

        return { success: false, message: "請輸入正確電郵" };
    };

    const fullPhoneNumber = `+852${phone}`

    const payload = { phone: fullPhoneNumber, email };

    try {
        const response = await fetch(SEND_PHONE_OTP_ENDPOINT, {
            method: 'POST', // or 'POST', 'PUT', etc.
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        },
        );

        const sendOtpRes = await response.json();

        console.log("sendOtpRes:", sendOtpRes);

        if (sendOtpRes.success) {
            return sendOtpRes
        } else {
            return { success: false, message: sendOtpRes.message }
        }

    } catch (error) {
        console.error('There was an error!', error);
        return { success: false, message: "無法連線" };
    }

}


export const validatePhoneOtpApi = async (signUpFormData) => {


    const { username, email, phone, phoneOtp, termsAccepted } = signUpFormData;

    console.log(signUpFormData);

    const otpAsInt = parseOTP(phoneOtp);
    console.log(otpAsInt)

    if (username === "") {
        return { success: false, message: "請輸入名稱" };
    }

    // Validate HK phone number
    if (!validateHKPhoneNumber(phone)) {

        return { success: false, message: "請輸入正確電話" };
    };

    // Validate Email
    if (!validateEmail(email)) {

        return { success: false, message: "請輸入正確電郵" };
    };

    // Ensure terms are accepted
    if (!termsAccepted) {

        return { success: false, message: "請確認條款及細則" };
    };

    // Validate OTP as 4 digits INT
    if (!validateOtp(otpAsInt)) {
        return { success: false, message: "請輸入4位數驗證碼" };
    };

        //Convert phone number to +852 
    const fullPhoneNumber = `+852${phone}`;

    const payload = { phone: fullPhoneNumber, email, identifier: fullPhoneNumber, otp:phoneOtp };

    try {
        const response = await fetch(VERIFY_PHONE_OTP_ENDPOINT, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });


        const validateOtpRes = await response.json();

        console.log("sendOtpRes:", validateOtpRes);

        if (validateOtpRes.success) {
            return validateOtpRes
        } else {
            return { success: false, message: validateOtpRes.message }
        }

    } catch (error) {
        console.error('Error verify phone otp:', error);
        return { success: false, message: "系統錯誤,請稍後再嘗試" };
    }

}


//VERIFY REG/LOGIN OTP TO GRANT AUTH ACCESS. RESTFUL API. INPUT:{USERNAME, USERPHONE, USEREMAIL}
const loginAndRegister = async (input, otp, operation) => {

    const payload = { input, otp, operation };

    try {
        const response = await fetch(REG_LOGIN_API_ENDPOINT, {
            method: 'POST', // or 'POST', 'PUT', etc.
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        },
        );

        const proxyResponse = await response.json();

        console.log("proxyResponse:", proxyResponse);

        if (proxyResponse.success) {
            return proxyResponse
        } else {
            return { success: false, message: proxyResponse.message }
        }

    } catch (error) {
        console.error('There was an error!', error);
        return { success: false, message: "無法連線" };
    }
};


//REST API FOR VERIFY AUTHENTICATION
export const verifyAuthentication = async () => {

    try {
        const response = await fetch(AUTH_API_ENDPOINT, {
            method: 'POST', // or 'POST', 'PUT', etc.
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        },
        );

        const proxyResponse = await response.json();

        console.log("proxyResponse:", proxyResponse);

        return { proxyResponse }

    } catch (error) {
        console.error('There was an error!', error);
        return { success: false, message: "Request failed" };
    }
};


//REQUEST SEND OTP ACTION WITH INPUT VALIDATION FOR REGISTRATION
export const sendOtpReg = async (phone, email) => {

    if (!validateHKPhoneNumber(phone)) {
        return { success: false, message: "請輸入正確電話" };
    }
    if (!validateEmail(email)) {
        return { success: false, message: "請輸入正確電郵" };
    }

    try {
        const fullPhoneNumber = `+852${phone}`;

        const callMutationRes = await sendOtp("registration", "phone", fullPhoneNumber, email)

        console.log('OTP Response:', callMutationRes);
        if (callMutationRes.success) {
            return { success: true, message: "已發出短訊", callMutationRes };
        } else if (!callMutationRes.success) {
            return { success: false, message: "伺服器錯誤,請稍後再嘗試", callMutationRes }; //need server feedback message
        }
    } catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false, message: "系統錯誤,請稍後再嘗試" };
    }

}


//REQUEST SEND OTP ACTION WITH INPUT VALIDATION FOR LOGIN
export const sendOtpLogin = async (identifier) => {

    const isPhoneNumber = validateHKPhoneNumber(identifier)

    try {
        if (isPhoneNumber) {
            const fullPhoneNumber = `+852${identifier}`;

            const sendOtpLoginResponse = await sendOtp("login", "phone", fullPhoneNumber, null);

            if (sendOtpLoginResponse.success) {
                return { success: true, message: "已發出短訊", sendOtpLoginResponse };
            } else if (!sendOtpLoginResponse.success) {
                return { success: false, message: "伺服器錯誤,請稍後再嘗試", sendOtpLoginResponse };  //need server feedback message 
            }

        } else if (validateEmail(identifier)) {

            const sendOtpLoginResponse = await sendOtp("login", "email", null, identifier)

            if (sendOtpLoginResponse.success) {
                return { success: true, message: "已發出電郵", sendOtpLoginResponse };
            } else if (!sendOtpLoginResponse.success) {
                return { success: false, message: "伺服器錯誤,請稍後再嘗試", sendOtpLoginResponse }; //need server feedback message 
            }

        } else {

            return { success: false, message: "請輸入正確電話/電郵" };
        }
    } catch (error) {

        console.error('Error sending OTP:', error);
        return { success: false, message: "系統錯誤,請稍後再嘗試" };
    }
}


//REQUEST VERIFY PHONE OTP ACTION FOR REGISTRATION
export const validatePhoneOtpReg = async (signUpFormData, dispatch) => {
    const { userName, userEmail, userPhone, phoneOtp, termsAccepted } = signUpFormData;
    console.log(signUpFormData);
    const otpAsInt = parseOTP(phoneOtp);
    console.log(otpAsInt)
    if (userName === "") {
        return { success: false, message: "請輸入名稱" };
    }

    // Validate HK phone number
    if (!validateHKPhoneNumber(userPhone)) {

        return { success: false, message: "請輸入正確電話" };
    };

    // Validate Email
    if (!validateEmail(userEmail)) {

        return { success: false, message: "請輸入正確電郵" };
    };

    // Ensure terms are accepted
    if (!termsAccepted) {

        return { success: false, message: "請確認條款及細則" };
    };

    // Validate OTP as 4 digits INT
    if (!validateOtp(otpAsInt)) {
        return { success: false, message: "請輸入4位數驗證碼" };
    };

    try {

        //Convert phone number to +852 
        const fullPhoneNumber = `+852${userPhone}`;

        //Standarize Input to backend for registration
        const variables = {
            userEmail: userEmail,
            userPhone: fullPhoneNumber,
            otp: otpAsInt
        }

        //Dispatch to Redux to change UI state in loading
        /* dispatch(authLoading()) */;

        const callMutationRes = await client.graphql({
            query: validatePhoneOtpForRegistration,
            variables
        })


        return callMutationRes.data.validatePhoneOtpForRegistration;
        //registration input format {userName, userEmail,userPhone }

    } catch (error) {
        console.error('Error verify phone otp:', error);
        return { success: false, message: "系統錯誤,請稍後再嘗試" };
    } //Register system connection fail response

}








//REQUEST VALIDATE EMAIL OTP FOR USER REGITRATION
export const userRegistration = async (signUpFormData, dispatch) => {

    const { userName, userEmail, userPhone, emailOtp } = signUpFormData;  // sign form data collection

    console.log(signUpFormData);

    const otpAsInt = parseOTP(emailOtp);  // parse OTP to INT
    const operation = "registration";  // define operation type passing to backend

    console.log(otpAsInt)


    // Validate OTP as 4 digits INT
    if (!validateOtp(otpAsInt)) {
        console.log("please enter 4 digits")
        return { success: false, message: "請輸入4位數驗證碼" };
    };


    try {

        //Convert phone number to +852 
        const fullPhoneNumber = `+852${userPhone}`;

        //Standarize Input to backend for registration
        const input = {
            userName: userName,
            userEmail: userEmail,
            userPhone: fullPhoneNumber
        };

        //Dispatch to Redux to change UI state in loading
        dispatch(authLoading());

        //Passing data to api gateway \ Result format {success: true, localToken, message: "registration successful", user:{id, userName, role, exp}}
        const callRegisterApiRes = await loginAndRegister(input, otpAsInt, operation) //registration input format {userName, userEmail,userPhone }

        console.log('User created data:', callRegisterApiRes)
        /* createUserRes
        {success: true, 
            localToken, 
            message: "registration successful", 
            user:{id, userName, role, exp}} */

        //Success response from api gateway. Dispatch authComplete and return success data with local Token
        if (callRegisterApiRes.success) {
            sessionStorage.setItem("localToken", callRegisterApiRes.localToken);
            dispatch(loginRegisterSuccess(callRegisterApiRes.user));
            return { success: true, message: callRegisterApiRes.message };

        } else {
            sessionStorage.clear();
            dispatch(loginRegisterFail());
            return { success: false, message: callRegisterApiRes.message }
        } //Register fail response

    } catch (error) {
        console.error('Error creating user:', error);
        sessionStorage.clear();
        dispatch(loginRegisterFail());
        return { success: false, message: "系統錯誤,請稍後再嘗試" };
    } //Register system connection fail response
}



//REQUEST VALIDATE OTP FOR USER LOGIN
export const userLogin = async (loginData, dispatch) => {

    const { identifier, otp, type } = loginData;  //Login user data input format
    const operation = "login";
    const otpAsInt = parseOTP(otp);


    if (type === "phone") {
        //Validate phone and otp format
        if (!validateHKPhoneNumber(identifier)) {
            return { success: false, message: "請輸入正確電話" }
        }
        if (!validateOtp(otpAsInt)) {
            return { success: false, message: "請輸入4位數驗證碼" };
        };

        try {
            //Convert phone with +852
            const fullPhoneNumber = `+852${identifier}`;
            const input = { identifier: fullPhoneNumber, type };

            dispatch(authLoading());

            const callLoginApiRes = await loginAndRegister(input, otpAsInt, operation);  // login input format {identifier, type}

            console.log(callLoginApiRes);

            if (callLoginApiRes.success) {
                sessionStorage.setItem("localToken", callLoginApiRes.localToken);
                dispatch(loginRegisterSuccess(callLoginApiRes.user));
                return { success: true, message: callLoginApiRes.message };

            } else {
                return { success: false, message: callLoginApiRes.message }
            }



        } catch (error) {
            console.log(error);
            return { success: false, message: "系統錯誤,請稍後再嘗試" }

        }

    } else if (type === "email") {
        if (!validateEmail(identifier)) {
            return { success: false, message: "請輸入正確電郵" }
        }
        if (!validateOtp(otpAsInt)) {
            return { success: false, message: "請輸入4位數驗證碼" };
        };

        try {
            const input = { identifier, type };

            const loginResult = await loginAndRegister(input, otpAsInt, operation);  // login input format {identifier, type}
            console.log(loginResult);
            console.log(loginResult.response);

            if (loginResult.success) {
                sessionStorage.setItem("localToken", loginResult.localToken);
                dispatch(loginRegisterSuccess(loginResult.user));
                return { success: true, message: loginResult.message };
            } else {
                return { success: false, message: loginResult.message }
            }


        } catch (error) {
            console.log(error);
            return { success: false, message: "系統錯誤,請稍後再嘗試" }

        }
    }

}


// USER LOGOUT ACTION
export const userLogout = () => async (dispatch) => {
    localStorage.removeItem("userToken");
    dispatch(logout());
}


// VERIFY AUTH BY REST API
export const verifyAuth = async (dispatch) => {

    const callVerifyAuthApiRes = await verifyAuthentication();

    const verifiedProxyResult = callVerifyAuthApiRes.proxyResponse

    console.log("verifiedProxyResult:", verifiedProxyResult);


    if (verifiedProxyResult.success) {

        console.log("verifyResult:", callVerifyAuthApiRes)

        if (verifiedProxyResult.localToken && !verifiedProxyResult.localToken === "") {
            sessionStorage.setItem("localToken", verifiedProxyResult.localToken);
        }

        return { success: true, message: verifiedProxyResult.message }



    } else if (!verifiedProxyResult.success) {
        console.log("verifyResult:", verifiedProxyResult)
        dispatch(verifyAuthFail());
        return { success: false, message: verifiedProxyResult.message }
    }


}




