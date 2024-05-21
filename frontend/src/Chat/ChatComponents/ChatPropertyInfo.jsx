import { Button, Image, Text, Flex, Divider, Card, Heading } from "@aws-amplify/ui-react";
import React, { useState } from "react";
import contactImage from "../../Img/test2.png";
import ReactModal from 'react-modal';
import AppointmentForm from "../../Appointment/Appointment";


ReactModal.setAppElement('#root');

const ChatPropertyInfo = () => {

  const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false);

  const handleAppointmentButtonClick = () => {
    setIsAppointmentModalVisible(true);
  };


  const handleCloseModal = () => {
    setIsAppointmentModalVisible(false);
  };



  return (
    <div>
      <Flex className="chat-property-gp">
        <Image src={contactImage}
          className="chat-property-image"
          alt="propertyPhoto"
        />
        <Text className="chat-property-name">太和中心 2房1廳</Text>
        <Text className="chat-property-brief">A座低層</Text>
        <Text className="chat-property-price">543萬</Text>
        <Divider orientation="horizontal" />
        <Button className="chat-property-appointment-button" onClick={handleAppointmentButtonClick}>預約睇樓</Button>
      </Flex>

      {/* APPOINTMENT MODAL */}

      <ReactModal
        isOpen={isAppointmentModalVisible}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        className="chat-make-appointment-modal"
        overlayClassName="modal-overlay"
      >
        <AppointmentForm onClose={handleCloseModal} />
        {/*   <Flex className="modal-notice-button-gp">
      <Button className="modal-notice-button-return" onClick={handleCloseModal}>取消</Button>
        <Button className="modal-notice-button-accept" onClick={handleCloseModal}>確定</Button>
        </Flex> */}
      </ReactModal>

    </div>

  )

}

export default ChatPropertyInfo;