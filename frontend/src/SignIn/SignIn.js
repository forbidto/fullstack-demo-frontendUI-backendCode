import { Heading, Input, Label, Button, Flex, ToggleButtonGroup, ToggleButton } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, sendOtpLogin, userLogin } from "../store/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

// Define the SignIn component
const SignIn = () => {
    // Initialize dispatch and navigation hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get authentication states from the Redux store
    const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated);
    const isAuthLoading = useSelector((state) => state.userAuth.isLoading);

    // State to manage login options (phone or email)
    const [loginOption, setLoginOption] = useState({
        phoneOpt: false,
        emailOpt: false
    });

    // State to manage login input data
    const [loginInput, setLoginInput] = useState({
        identifier: "",
        otp: "",
        type: ""
    });

    // State to manage input validation and messages
    const [inputInvalid, setInputInvalid] = useState(false);
    const [message, setMessage] = useState();

    // Handle input changes and update login input state
    const handleInputChange = (id, value) => {
        setLoginInput(prevState => (
            {
                ...prevState,
                [id]: value
            }
        ));
        console.log(loginInput);
        setInputInvalid(false);
    }

    // Handle changes in login options (phone or email)
    const handleLoginOptChange = (id) => {
        switch (id) {
            case "phoneOpt":
                setLoginOption({
                    phoneOpt: true,
                    emailOpt: false
                });
                setLoginInput(prevState => (
                    {
                        ...prevState,
                        type: "phone"
                    }
                ));
                setInputInvalid(false);
                break;
            case "emailOpt":
                setLoginOption({
                    phoneOpt: false,
                    emailOpt: true
                });
                setLoginInput(prevState => (
                    {
                        ...prevState,
                        type: "email"
                    }
                ));
                setInputInvalid(false);
                break;
            default:
                break;
        }
    }

    // Handle sending OTP
    const handleSendOtp = async () => {
        setInputInvalid(false);
        setMessage();
        const sendOtpResponse = await sendOtpLogin(loginInput.identifier);
        if (!sendOtpResponse.success) {
            setInputInvalid(true);
            setMessage(sendOtpResponse.message);
        } else if (sendOtpResponse.success) {
            alert(sendOtpResponse.message);
        }
    }

    // Handle user login
    const handleLogin = async () => {
        const loginResponse = await userLogin(loginInput, dispatch);
        console.log(loginResponse);
        if (!loginResponse.success) {
            setInputInvalid(true);
            setMessage(loginResponse.message);
        } else if (loginResponse.success) {
            console.log("login Response:", loginResponse);
            alert(loginResponse.message);
            navigate('/');
        }
    };

    // Return the JSX for the SignIn component
    return (
        <div className="login-div">
            <Flex as="form" className="login-gp" direction="column">
                <Heading className="sign-up-title">登入</Heading>

                <ToggleButtonGroup direction="row" className="login-option-gp">
                    <ToggleButton id="phoneOpt" size="small" className="login-option-button" isPressed={loginOption.phoneOpt} onClick={() => handleLoginOptChange("phoneOpt")}>電話登入</ToggleButton>
                    <ToggleButton id="emailOpt" size="small" className="login-option-button" isPressed={loginOption.emailOpt} onClick={() => handleLoginOptChange("emailOpt")}>電郵登入</ToggleButton>
                </ToggleButtonGroup>

                {loginOption.phoneOpt === true && (
                    <Flex direction="column">
                        <Label htmlFor="userInput">電話號碼</Label>
                        <Flex direction="row">
                            <div className="phone-prefix">+852</div>
                            <Input id="identifier"
                                isRequired
                                className="login-phone-input"
                                onChange={(e) => handleInputChange(e.target.id, e.target.value)} />
                        </Flex>
                    </Flex>
                )}

                {loginOption.emailOpt === true && (
                    <Flex direction="column">
                        <Label htmlFor="userInput">電郵</Label>
                        <Input id="identifier"
                            isRequired
                            className="login-email-input"
                            onChange={(e) => handleInputChange(e.target.id, e.target.value)} />
                    </Flex>
                )}

                <Flex direction="column" gap="0px">
                    <Label htmlFor="otpVerificationCode">驗證碼</Label>
                    <Flex className="log-in-otp-send-gp">
                        <Input className="login-otp-input" id="otp" onChange={(e) => handleInputChange(e.target.id, e.target.value)}></Input>
                        <Button className="login-otp-send-button" onClick={() => handleSendOtp()}>發送驗證碼</Button>
                    </Flex>
                </Flex>

                {inputInvalid === true && (<div className="form3-error-message">{message}</div>)}

                <Flex className="login-button-gp">
                    <Button onClick={() => handleLogin()} disabled={isAuthLoading} size="small" fontSize="12px">
                        {isAuthLoading === true ? "登入中" : "登入"}
                    </Button>
                    <Link to="/signup" className="link">
                        <Button fontSize="12px" size="small" disabled={isAuthLoading}>沒有帳戶, 前往註冊</Button>
                    </Link>
                </Flex>
            </Flex>
        </div>
    )
}

export default SignIn;