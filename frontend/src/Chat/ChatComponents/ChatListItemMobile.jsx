import { Button, Image, Text, Flex } from "@aws-amplify/ui-react";
import React from "react";
import contactImage from "../../Img/test2.png";
import {FaCheck} from 'react-icons/fa';


const ChatListItemMobile = ({onSelect}) =>{

    const handleClick = (chatId) => {
        console.log(chatId)
        onSelect(chatId); // chatId should be the identifier for the selected chat
    };

return (

<Flex 
className="chat-list-item-gp-mobile"
onClick={() =>handleClick("test")}
>
<Image src={contactImage}
        alt="Icon"
        className="chat-list-item-image-mobile"
        />
        <Flex className="chat-list-item-info-gp-mobile">
        <Flex className="chat-list-item-content-gp">
            <Text>文小姐</Text>
            <Text>12:20</Text>
        </Flex>
        <Text>太和中心 A座 3樓 C室</Text>
        <Flex className="chat-list-item-content-gp-mobile">
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

export default ChatListItemMobile;