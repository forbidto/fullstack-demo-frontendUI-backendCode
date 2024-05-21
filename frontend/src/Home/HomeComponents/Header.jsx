import React, { useEffect, useState } from "react";
import { Image, Flex, Text, Button, Card } from '@aws-amplify/ui-react';
import { FaBell, FaUserAlt } from 'react-icons/fa';
import logoImage from "../../Img/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../store/actions/authAction";

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, userName } = useSelector((state) => state.userAuth);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleUserInfoClick = () => {
    setIsUserInfoOpen(!isUserInfoOpen);
  }

  const handleUserLogout = () => {
    dispatch(userLogout());
    navigate("/");
  }

  return (
    <Flex className="home-header">
      <Link className="link" to="/"><Image className="logo" alt="Logo" src={logoImage} width="100px" height="40px" /></Link>
      <Text className="home-top-text">買樓</Text>
      {isAuthenticated ? (<Flex className="home-user-info" >
        <Button className="home-user-icon" onClick={() => { setIsNotificationOpen(!isNotificationOpen) }}><FaBell /></Button>
        <Button className="home-user-icon" onClick={handleUserInfoClick} ><FaUserAlt /></Button>
        {isNotificationOpen && (
          <Card variation='elevated' className="home-user-notification-menu">
            <Text>暫無新訊息</Text>

            {/* Add more menu items here */}
          </Card>)}
        {isUserInfoOpen && (
          <Card variation='elevated' className="home-user-menu">
            <Link to="/settings" className="link"><Text>個人資料</Text></Link>
            <Link to="/settings"><Text>設定</Text></Link>
            <Link to="/settings" onClick={() => handleUserLogout()}><Text>登出</Text></Link>
            {/* Add more menu items here */}
          </Card>)}

        <Text className="home-user-text">{userName}</Text>

      </Flex>) : (<Flex className="home-user-info">
        {/* You can put alternative content here for non-authenticated users */}
        <Link to="/login">
          <Button className="nav-bar-button">登入</Button>
        </Link>
        <Link to="/signup">
          <Button className="nav-bar-button">註冊</Button>
        </Link>
      </Flex>)}

    </Flex>
  )

};

export default Header