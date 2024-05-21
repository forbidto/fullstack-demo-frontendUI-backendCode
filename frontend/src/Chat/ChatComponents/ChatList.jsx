import { Button, Image, Text, Flex } from "@aws-amplify/ui-react";
import React from "react";
import contactImage from "../../Img/test2.png";
import {FaCheck} from 'react-icons/fa';


const ChatListItem = () =>{

return (
<div>
<Button className="chat-list-contact">
    <Flex className="chat-list-contact-item-gp">
        <Image src={contactImage}
        width="60px"
        height="60px"
        borderRadius="5px"
        alt="Icon"/>
        <Flex className="chat-list-contact-detail-gp">
        <Flex className="chat-list-contact-name-time-gp">
            <div>文小姐</div>
            <div>12:11</div>
        </Flex> 
        <Text className="chat-list-contact-property">太和中心 A座 3樓 C室</Text>
        <Flex className="chat-list-contact-name-time-gp">
        <Text className="chat-list-contact-message">Hello</Text>
        <div>
        <FaCheck size="12px"/>
        <FaCheck size="12px"/>
        </div>
        </Flex> 
        </Flex>
    </Flex>
</Button>
</div>

)

}

export default ChatListItem;