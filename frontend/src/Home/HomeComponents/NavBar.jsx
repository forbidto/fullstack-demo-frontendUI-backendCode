import React from "react";
import {Flex, Button} from '@aws-amplify/ui-react';
import {FaArrowAltCircleRight} from 'react-icons/fa';
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
    <Flex className="nav-bar">
    <Flex className="nav-bar-button-row">
    <Link to="/" className="link"><Button className="nav-bar-button">搜尋</Button></Link>
    <Button className="nav-bar-button">我的收藏</Button>
    <Link to="/presellhouse"><Button className="nav-bar-button">我想賣樓</Button></Link>
    <Button className="nav-bar-button">我的放盤</Button>
    </Flex>
    </Flex>)
  
  };

  export default NavBar;