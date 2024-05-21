import { Heading, Input, Label, Button, Flex, CheckboxField, Text } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOtpReg, sendPhoneOtpApi, userRegistration, validatePhoneOtpReg } from "../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from 'react-modal';
import { grantAccessSuccess, verifyAuthFail } from "../store/reducers/authReducer";

// Define the SignUp component
const SignUp = () => {
    // Initialize dispatch and navigation hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get authentication states from the Redux store
    const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated);
    const isAuthLoading = useSelector((state) => state.userAuth.isLoading);
    const authState = useSelector((state) => state.userAuth);

    // State to manage visibility of email OTP input
    const [isEmailOtpVisible, setIsEmailOtpVisible] = useState(false);

    // State to manage form data
    const [signUpFormData, setSignUpFormData] = useState({
        username: '',
        email: '',
        phone: '',
        phoneOtp: '',
        termsAccepted: false,
        emailOtp: ''
    });

    // Reset form and navigate to home if authenticated
    useEffect(() => {
        if (isAuthenticated) {
            setSignUpFormData({
                username: '',
                email: '',
                phone: '',
                phoneOtp: '',
                termsAccepted: false,
                emailOtp: ''
            });
            navigate('/');
        }
    }, [isAuthenticated]);

    // Log authentication loading state and details
    useEffect(() => {
        console.log(isAuthLoading);
        console.log(authState);
    }, [isAuthLoading]);

    // State to manage input validation and messages
    const [inputInvalid, setInputInvalid] = useState(false);
    const [message, setMessage] = useState();

    // Handle input changes and update form state
    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setSignUpFormData(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
        setMessage();
        setInputInvalid(false);
        dispatch(verifyAuthFail());
        console.log(signUpFormData);
    }

    // Handle sending OTP
    const handleSendOtp = async () => {
        setInputInvalid(false);
        setMessage();

        const phone = signUpFormData.phone;
        const email = signUpFormData.email;

        const sendPhoneOtpApiRes = await sendPhoneOtpApi(phone, email);
        console.log('sendPhoneOtpApiRes', sendPhoneOtpApiRes);

        if (!sendPhoneOtpApiRes.success) {
            setInputInvalid(true);
            setMessage(sendPhoneOtpApiRes.message);
        } else if (sendPhoneOtpApiRes.success) {
            alert(sendPhoneOtpApiRes.message);
        }
    }

    // Close email OTP modal
    const handleCloseModal = () => {
        setIsEmailOtpVisible(false);
    };

    // Handle validating phone OTP
    const handleValidatePhoneOtp = async (e) => {
        e.preventDefault();

        const validateRes = await validatePhoneOtpReg(signUpFormData);
        console.log('validatePhoneOtpRes:', validateRes);

        if (validateRes.success) {
            setIsEmailOtpVisible(true);
        } else {
            setInputInvalid(true);
            setMessage(validateRes.message);
        }
    };

    // Show email OTP input
    const handleSetEmailVisible = () => {
        setIsEmailOtpVisible(true);
    }

    // Handle user registration
    const handleRegistration = async (e) => {
        e.preventDefault();
        const callRegisterRes = await userRegistration(signUpFormData, dispatch);
        if (!callRegisterRes.success) {
            console.log("not true");
            setInputInvalid(true);
            setMessage(callRegisterRes.message);
        } else if (callRegisterRes.success) {
            navigate('/');
        }
    }

    // Return the JSX for the SignUp component
    return (
        <div className="sign-up-div">
            <Flex as="form" className="sign-up-gp" direction="column">
                <Heading className="sign-up-title">註冊</Heading>
                <Label htmlFor="username" className="sign-up-item">名稱</Label>
                <Input id="username" isRequired width="278px" onChange={handleInputChange}></Input>
                <Label htmlFor="email">電郵</Label>
                <Input type="email" width="278px" isRequired id="email" onChange={handleInputChange}></Input>
                <Label htmlFor="phone">電話號碼</Label>
                <Flex direction="row" alignItems="center">
                    <span>+852</span>
                    <Input id="phone" width="230px" isRequired onChange={handleInputChange}></Input>
                </Flex>

                <div>
                    <Label htmlFor="phoneOtp">驗證碼</Label>
                    <Flex className="sign-up-opt-gp">
                        <Input id="phoneOtp" width="180px" onChange={handleInputChange}></Input>
                        <Button className="sign-up-otp-send" onClick={() => handleSendOtp()}>發送驗證碼</Button>
                    </Flex>
                </div>

                <Flex direction="row">
                    <CheckboxField id="termsAccepted" value="yes" onChange={handleInputChange} />
                    <p>本人已閱讀及同意遵守<Link to="/term">條款及細則</Link>和<Link to="/privacy">私隱政策</Link>。</p>
                </Flex>

                {isEmailOtpVisible === false && inputInvalid === true && (<div className="form3-error-message">{message}</div>)}

                <ReactModal
                    isOpen={isEmailOtpVisible}
                    //onRequestClose={handleCloseModal}
                    contentLabel="Modal"
                    className="email_otp_modal"
                    overlayClassName="modal-overlay"
                >
                    <Flex direction="column" padding="3vh">
                        <Text>4位數電郵驗證碼已發送至{signUpFormData.email}</Text>
                        <Label htmlFor="emailOtp">電郵驗證碼</Label>
                        <Input id="emailOtp" onChange={handleInputChange}></Input>

                        {inputInvalid === true ? (<Text>{message}</Text>) : ''}

                        {isAuthLoading === true ? (
                            <Button disabled={isAuthLoading}>
                                註冊中
                            </Button>
                        ) : (
                            <Flex className="signup-email-otp-button-gp">
                                <Button size="small" onClick={handleRegistration}>確定</Button>
                                <Button size="small" onClick={handleCloseModal}>取消</Button>
                            </Flex>
                        )}
                    </Flex>
                </ReactModal>

                <Button type="submit" size="small" onClick={(e) => handleValidatePhoneOtp(e)} disabled={isAuthLoading}>
                    {isAuthLoading === true ? '註冊中' : '註冊'}
                </Button>
            </Flex>
        </div>
    )
}

export default SignUp;