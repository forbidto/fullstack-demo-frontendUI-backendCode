import React from "react";
import {Image, Flex, Text, Button} from '@aws-amplify/ui-react';
import {FaBell, FaUserAlt} from 'react-icons/fa';

const Footer = () => {
    return(
    <Flex className="footer-gp">
    <Flex className="footer-info">
    <Button className="footer-info-button">常見問題</Button>
    <Button className="footer-info-button">聯絡我們</Button>
    <Button className="footer-info-button">相關連結</Button>
    <Button className="footer-info-button">關於我們</Button>
    </Flex>
    <Flex className="footer-end">
    <div className="footer-end-text">
        <Text>本網頁所提供資料僅作參考用途。若因錯漏而引致任何不便或損失</Text>
        <Text></Text>
    </div>
    <Flex className="footer-end-button-gp">
        <Button className="footer-end-button">使用條款</Button>
        <Button className="footer-end-button">免責聲明</Button>
        <Button className="footer-end-button">私隱條款</Button>
    </Flex>
    

    </Flex>
    </Flex>
    )
    
  };

  export default Footer