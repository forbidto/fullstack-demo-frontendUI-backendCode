import { Button, Image, Text, Flex, Input } from "@aws-amplify/ui-react";
import React from "react";
import userImage from "../../Img/user.png";
import {FaFolderPlus, FaRegPaperPlane} from 'react-icons/fa';


const MessageInput = () =>{

return (
<Flex className="message-send-section">
        <Button className="message-send-add-file">
        <FaFolderPlus size="20px"/>
        </Button>
    <Input placeholder="Type Here" borderRadius="15px"/>
    <Button className="message-send-add-file">
        <FaRegPaperPlane size="20px"/>
        </Button>
</Flex>

)

}

export default MessageInput;