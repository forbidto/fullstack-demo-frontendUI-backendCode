import { Button, Image, Text, Flex, Heading } from "@aws-amplify/ui-react";
import React, { useState } from "react";
import userImage from "../../Img/user.png";
import { FaClipboardQuestion } from 'react-icons/fa6';
import ReactModal from 'react-modal';

const RecieverInfo = ({onQuestionSelect}) => {

    const questionsList = [
        '請問已做大維修？',
        '請問單位有無漏水/滲水問題未解決？',
        '請恕我直言，請問單位內曾有凶案/自殺/有人死亡嗎？',
        '請問間隔有無改動？想了解一下有無結構性改動？',
        '請問同層/樓上樓下有凶宅嗎？',
        '請問管理費幾錢？知唔知停車場幾錢？',
        '請問屋苑有否穿梭巴士？',
        '請問單位裝修左幾耐，有無換水喉/電線/電箱？',
        '請問樓契是否完整齊全？'
    ]


    const [isAssistQuestionVisible, setisAssistQuestionVisible] = useState(false)

    const handleAssistQuestionClick = () => {
        setisAssistQuestionVisible(true);
    }

    const handleCloseModal = () => {
        setisAssistQuestionVisible(false)
    }

    const handleQuestionSelect =(question)=>{
        onQuestionSelect(question);
        handleCloseModal();
    }


    return (
        <div>
            <Flex className="chat-receiver-info">
                <Flex className="chat-receiver-info-name-gp">
                    <Image src={userImage}
                        width="30px"
                        height="30px"
                        borderRadius="15px"
                        alt="icon"
                    />
                    <Text>文小姐</Text>
                </Flex>
                <Button
                    className="chat-assist-question-button"
                    onClick={handleAssistQuestionClick}>
                    <FaClipboardQuestion color="black" size="20px" /></Button>
            </Flex>

            <ReactModal
                isOpen={isAssistQuestionVisible}
                onRequestClose={handleCloseModal}
                contentLabel="Modal"
                className="chat-assistance-modal"
                overlayClassName="modal-overlay"
            >
                <Flex className="chat-assist-question-gp">
                    <Heading className="chat-assist-question-head">重要問題題示</Heading>
                    {
                        questionsList.map((question, index) => (
                            <Button className="chat-assist-question-item-button"
                            onClick={()=>{handleQuestionSelect(question)}}
                            key={index}>
                                {question}</Button>
                        ))
                    }
                </Flex>
            </ReactModal>


        </div>

    )

}

export default RecieverInfo;