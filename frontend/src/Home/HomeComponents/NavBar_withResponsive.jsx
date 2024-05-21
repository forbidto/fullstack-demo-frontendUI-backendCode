import React, { useEffect, useState } from "react";
import { Flex, Button, Menu, MenuItem, Card, Text } from '@aws-amplify/ui-react';
import { FaArrowAltCircleRight, FaBars } from 'react-icons/fa';
import { Link } from "react-router-dom";

const NavBarWithResponsive = () => {

  const [isNavBarMenuOpen, setIsNavBarMenuOpen] = useState(false);
useEffect(()=>{
  console.log(isNavBarMenuOpen)
}, [isNavBarMenuOpen])

  return (

    <Flex className="nav-bar">
      <Button className="nav-bar-switch-button">租盤廣告<FaArrowAltCircleRight className="nav-bar-arrow" /></Button>
      <Flex className="nav-bar-button-row">
        <Link to="/" className="link"><Button className="nav-bar-button">搜尋</Button></Link>
        <Link to="/" className="link"><Button className="nav-bar-button">我的收藏</Button></Link>
        <Link to="/presellhouse"><Button className="nav-bar-button">我想賣樓</Button></Link>
        <Link to="/mylisting" className="link"> <Button className="nav-bar-button">我的放盤</Button></Link>
      </Flex>

      <Flex className="nav-bar-menu">
        <Button className="nav-bar-menu-button" onClick={() => {setIsNavBarMenuOpen(!isNavBarMenuOpen) }}><FaBars /></Button>
        {
          isNavBarMenuOpen && <Card className="nav-bar-menu-gp">
            <Link to="/" className="link"><Text className="nav-bar-menu-item">搜尋</Text></Link>
            <Link to="/" className="link"><Text className="nav-bar-menu-item">我的收藏</Text></Link>
            <Link to="/presellhouse" className="link"> <Text className="nav-bar-menu-item">我想賣樓</Text></Link>
            <Link to="/mylisting" className="link"> <Text className="nav-bar-menu-item">我的放盤</Text></Link>
          </Card>
        }

      </Flex>


    </Flex>





  )

};

export default NavBarWithResponsive;