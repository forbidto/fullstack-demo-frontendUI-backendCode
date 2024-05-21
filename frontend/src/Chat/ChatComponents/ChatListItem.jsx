import { Button, Image, Text, Flex } from "@aws-amplify/ui-react";
import React from "react";
import contactImage from "../../Img/test2.png";
import {FaCheck} from 'react-icons/fa';


const ChatListItem = () =>{

return (

<Flex className="chat-list-item-gp">
<Image src={contactImage}
        alt="Icon"
        className="chat-list-item-image"
        />
        <Flex className="chat-list-item-info-gp">
        <Flex className="chat-list-item-content-gp">
            <Text>文小姐</Text>
            <Text>12:20</Text>
        </Flex>
        <Text>太和中心 A座 3樓 C室</Text>
        <Flex className="chat-list-item-content-gp">
            <Text>無問題...</Text>
            <div>
            <FaCheck size="12px"/>
            <FaCheck size="12px"/>
            </div>
        </Flex>

        </Flex>
</Flex>


)

}

export default ChatListItem;