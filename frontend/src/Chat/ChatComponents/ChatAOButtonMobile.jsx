import { Button, Flex } from "@aws-amplify/ui-react";
import React, { useState } from "react";
import ReactModal from 'react-modal';
import AppointmentForm from "../../Appointment/Appointment";

ReactModal.setAppElement('#root');

const ChatAOButtonMobile = () => {


    const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false);

    const handleAppointmentButtonClick = () => {
        setIsAppointmentModalVisible(true);
    };


    const handleCloseModal = () => {
        setIsAppointmentModalVisible(false);
    };

    return (

        <div>
            <Flex className="chat-appointment-offer-button-gp">
                <Button
                    className="chat-property-appointment-button"
                    onClick={handleAppointmentButtonClick}
                >預約睇樓</Button>
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

export default ChatAOButtonMobile;