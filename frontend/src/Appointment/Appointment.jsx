import { CheckboxField,Text, Flex,  Label, Heading, Input,Button } from "@aws-amplify/ui-react";
import React from "react";


const AppointmentForm = ({ onClose }) =>{

return (

    <Flex className="chat-make-appointment-gp">
    <Heading className="chat-make-appointment-head">預約睇樓</Heading>
    <Label htmlFor="chat-make-appointment-date">日期</Label>
    <Input id="chat-make-appointment-date" type="date" />
    <CheckboxField 
    label="本人明白及同意，此日期將更新為已簽署的＂地產代理協議表格4＂上的視察日期。" 
    name="agree-appointment-date"  value="yes"/>

    <Label htmlFor="chat-make-appointment-time">時間</Label>
    <Input id="chat-make-appointment-time" type="time" />
    <Text className="offer-deal-remark">(睇樓前3小時不能取消預約)</Text>

    <Flex className="chat-make-appointment-button-gp">
    <Button className="chat-make-appointment-button-accept" >確定</Button>
      <Button onClick={onClose} >取消</Button>
        </Flex>

    </Flex>

)

}

export default AppointmentForm;