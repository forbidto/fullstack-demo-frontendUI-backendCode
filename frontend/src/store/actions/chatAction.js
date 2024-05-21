import { generateClient } from 'aws-amplify/api';
import { sendMessage, sendOTP, validatePhoneOtpForRegistration } from '../../graphql/mutations';



const client = generateClient();


export const callSendMessage = async (chatId, messageType, listingId, senderId, text) => {
    console.log(chatId, messageType, listingId, senderId, text)
    return await client.graphql({
        query: sendMessage,
        variables: {
            input:{
                type: messageType,
                chatId,
                listingId,
                senderId,
                text,
            }
        },
    });
}