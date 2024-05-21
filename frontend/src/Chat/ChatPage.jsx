import { Card, Input, Flex, Image, Button, Text } from "@aws-amplify/ui-react";
import React, { useEffect, useState } from "react";
import ChatListItem from "./ChatComponents/ChatListItem";
import RecieverInfo from "./ChatComponents/ReceiverInfo";
import ChatPropertyInfo from "./ChatComponents/ChatPropertyInfo";
import userImge from "../Img/user.png"
import { FaFolderPlus, FaRegPaperPlane } from 'react-icons/fa';
import ChatListItemMobile from "./ChatComponents/ChatListItemMobile";
import ChatAOButtonMobile from "./ChatComponents/ChatAOButtonMobile";
import { callSendMessage } from "../store/actions/chatAction";


const ChatPage = () => {

    const receiverId = "a";
    const myId = "b";

   
    const [activeChat, setActiveChat] = useState(null);
    const handleChatSelect = (chatId) => {
        setActiveChat(chatId);
    }



    const [inputValue, setInputValue] = useState('');

    const handleMessageSend = async (inputText) => {

        console.log(inputText)

        const chatId = "chatId_test";
        const messageType = "TEXT";
        const listingId = "listingId_test";
        const senderId = "sender_test";
        const text = inputText;

        await callSendMessage(chatId, messageType, listingId, senderId, text)

    }

    useEffect(() => {
        console.log(inputValue)
    }, [inputValue])



    return (
        <div>
            <Flex className="messenger-gp">
                <Card className="chat-list-card" variation="elevated">
                    <Input className="chat-search" placeholder="Search" />
                    <ChatListItem />
                </Card>
                <Card className="chat-message-board-card" variation="elevated">
                    <RecieverInfo
                        onQuestionSelect={(question) => setInputValue(question)}
                    />
                    <div className="chat-message-board">
                        <div className="chat-message-notice">
                        端對端加密技術確保只有您與收件人可以讀取或聽取訊息內容，其他中間人（包括WhatsApp）都無法讀取或聽取。
                        </div>
                        <Flex className="chat-message-text-gp">

                            {/* RECEIVER MESSAGE BOX  */}
                            <Flex className="chat-message-receiver-text-box">
                                <Image
                                    src={userImge}
                                    className="chat-message-board-receiver-icon"
                                    alt="icon"
                                />
                                <Flex className="chat-message-board-receiver-text">
                                    你好, 我想約睇樓, 幾時得閒</Flex>
                            </Flex>

                            {/* MY MESSAGE BOX  */}

                            <Flex className="chat-message-my-text-div">
                                <Flex className="chat-message-my-text-box">
                                    <Flex className="chat-message-board-receiver-my-text">
                                        無問題, 幾時都得</Flex>
                                </Flex>

                            </Flex>

                            <Flex className="chat-message-receiver-text-box">
                                <Image
                                    src={userImge}
                                    className="chat-message-board-receiver-icon"
                                    alt="icon"
                                />
                                <Flex className="chat-message-board-receiver-text">
                                    你好, 我想約睇樓, 幾時得閒</Flex>
                            </Flex>

                            <Flex className="chat-message-my-text-div">
                                <Flex className="chat-message-my-text-box">
                                    <Flex className="chat-message-board-receiver-my-text">
                                        無問題, 幾時都得</Flex>
                                </Flex>

                            </Flex>

                            <Flex className="chat-message-receiver-text-box">
                                <Image
                                    src={userImge}
                                    className="chat-message-board-receiver-icon"
                                    alt="icon"
                                />
                                <Flex className="chat-message-board-receiver-text">
                                    你好, 我想約睇樓, 幾時得閒</Flex>
                            </Flex>

                        </Flex>
                    </div>


                    <Flex className="chat-message-send-section">
                        <Button className="message-send-add-file-button">
                            <FaFolderPlus size="20px" />
                        </Button>
                        <Input
                            placeholder="Type Here"
                            borderRadius="15px"
                            value={inputValue}
                            onChange={(e) => { setInputValue(e.target.value) }}
                        />
                        <Button 
                        className="message-send-add-file-button"
                        onClick={() => handleMessageSend(inputValue)}
                        >
                            <FaRegPaperPlane size="20px" />
                        </Button>
                    </Flex>

                </Card>
                <Card className="chat-property-info-card" variation="elevated">
                    <ChatPropertyInfo />
                </Card>
            </Flex>

            <Flex className="messenger-gp-mobile">
                {activeChat === null ? (
                    <Card className="chat-list-card-mobile" variation="elevated">
                        <ChatListItemMobile onSelect={handleChatSelect} />
                    </Card>
                ) : (
                    <Card className="chat-message-board-card-mobile" variation="elevated">
                        <RecieverInfo
                            onQuestionSelect={(question) => setInputValue(question)}
                        />
                        <ChatAOButtonMobile />
                        <div className="chat-message-board">
                            <div className="chat-message-notice">
                             端對端加密技術確保只有您與收件人可以讀取或聽取訊息內容，其他中間人（包括WhatsApp）都無法讀取或聽取。
                            </div>
                            <Flex className="chat-message-text-gp">

                                {/* RECEIVER MESSAGE BOX  */}
                                <Flex className="chat-message-receiver-text-box">
                                    <Image
                                        src={userImge}
                                        className="chat-message-board-receiver-icon"
                                        alt="icon"
                                    />
                                    <Flex className="chat-message-board-receiver-text">
                                        你好, 我想約睇樓, 幾時得閒</Flex>
                                </Flex>

                                {/* MY MESSAGE BOX  */}

                                <Flex className="chat-message-my-text-div">
                                    <Flex className="chat-message-my-text-box">
                                        <Flex className="chat-message-board-receiver-my-text">
                                            無問題, 幾時都得</Flex>
                                    </Flex>

                                </Flex>

                                <Flex className="chat-message-receiver-text-box">
                                    <Image
                                        src={userImge}
                                        className="chat-message-board-receiver-icon"
                                        alt="icon"
                                    />
                                    <Flex className="chat-message-board-receiver-text">
                                        你好, 我想約睇樓, 幾時得閒</Flex>
                                </Flex>

                                <Flex className="chat-message-my-text-div">
                                    <Flex className="chat-message-my-text-box">
                                        <Flex className="chat-message-board-receiver-my-text">
                                            無問題, 幾時都得</Flex>
                                    </Flex>

                                </Flex>

                                <Flex className="chat-message-receiver-text-box">
                                    <Image
                                        src={userImge}
                                        className="chat-message-board-receiver-icon"
                                        alt="icon"
                                    />
                                    <Flex className="chat-message-board-receiver-text">
                                        你好, 我想約睇樓, 幾時得閒</Flex>
                                </Flex>

                                <Flex className="chat-message-my-text-div">
                                    <Flex className="chat-message-my-text-box">
                                        <Flex className="chat-message-board-receiver-my-text">
                                            無問題, 幾時都得</Flex>
                                    </Flex>

                                </Flex>


                            </Flex>
                        </div>

                        <Flex className="chat-message-send-section">
                            <Button className="message-send-add-file-button">
                                <FaFolderPlus size="20px" />
                            </Button>
                            <Input
                                placeholder="Type Here"
                                borderRadius="15px"
                                value={inputValue}
                                onChange={(e) => { setInputValue(e.target.value) }}
                            />
                            <Button
                                className="message-send-add-file-button"
                                onClick={() => handleMessageSend(inputValue)}
                            >
                                <FaRegPaperPlane size="20px" />
                            </Button>
                        </Flex>
                    </Card>
                )}






            </Flex>





        </div>


    )

}

export default ChatPage;