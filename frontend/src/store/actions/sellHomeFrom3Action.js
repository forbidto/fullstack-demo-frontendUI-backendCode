import AWS from 'aws-sdk';
import { isValidHKID, validateBussinessRegistrationId, validateHKPhoneNumber, validateFloor, validateOwnerNameInput, validateCompanyNameInput } from "../utils/authUtils"
import { generateClient } from 'aws-amplify/api';
import { invalidInput, validInput } from "../reducers/sellHomeForm3Reducer";
import { createPendingListing, createPresignedUploadUrl, deleteUploadedPhoto } from "../../graphql/mutations";
import { v4 as uuidv4 } from 'uuid';
import { fetchGraphQL, postApigatewayToAppsync } from '../../graphql/graphqlClient';



export const form3InputValidate = async (formInput, individualOwners, companyOwners) => {


    const requiredFields = ['region', 'district', 'type', 'estate', 'floor', 'unit', 'room', 'price']
    const FieldsMapping = {
        'region': '區域',
        'district': '地區',
        'type': '物業類型',
        'estate': '屋苑/大廈名稱',
        'floor': '樓層',
        'unit': '單位',
        'room': '房間',
        'price': '放售價錢'
    }

    let errorMessages = []

    for (const field of requiredFields) {
        if (!formInput[field] || formInput[field].length === 0) {
            errorMessages.push(`請輸入${FieldsMapping[field]}`);
        }
    }

    if (formInput.isHaunt !== true && formInput.isHaunt !== false) {
        errorMessages.push('請確認是否凶宅');
    }

    if (validateFloor(formInput.floor) === false) {
        errorMessages.push('請輸入正確樓層');
    }

    if (individualOwners.length === 0 && companyOwners.length === 0) {
        errorMessages.push(`請輸入至少1位業主`)
    }

    for (let i = 0; i < individualOwners.length; i++) {

        const owner = individualOwners[i];

        if (!validateOwnerNameInput(owner.ownerName)) {
            errorMessages.push(`請輸入個人業主 ${i + 1} 英文名稱`)
        }

        if (owner.ownerName === "") {
            errorMessages.push(`請輸入個人業主 ${i + 1} 英文名稱`);
        }

        if (isValidHKID(owner.ownerHkId) === false) {
            errorMessages.push(`請輸入個人業主 ${i + 1} 正確身份證`);
        }

        if (validateHKPhoneNumber(owner.ownerPhone) === false) {
            errorMessages.push(`請輸入個人業主 ${i + 1} 正確電話`);
        }
    }

    for (let i = 0; i < companyOwners.length; i++) {
        const companyOwner = companyOwners[i];

        if (companyOwner.companyName === "") {
            errorMessages.push(`請輸入公司業主 ${i + 1} 英文名稱`);
        }

        if (!validateCompanyNameInput(companyOwner.companyName)) {
            errorMessages.push(`請輸入公司 ${i + 1} 英文名稱`)
        }

        if (companyOwner.directorName === "") {
            errorMessages.push(`請輸入公司業主 ${i + 1} 董事名稱`);
        }

        if (isValidHKID(companyOwner.directorHkId) === false) {
            errorMessages.push(`請輸入公司董事 ${i + 1} 正確身份證`);
        }
        if (validateHKPhoneNumber(companyOwner.directorPhone) === false) {
            errorMessages.push(`請輸入公司業主 ${i + 1} 正確電話`)
        }
        if (validateBussinessRegistrationId(companyOwner.bussinessRegistrationId) === false) {
            errorMessages.push(`請輸入公司業主 ${i + 1} 正確商業登記證號碼`)
        }
    }

    if (errorMessages.length > 0) {
        return { isValid: false, errorMessages: errorMessages }
    } else {
        return { isValid: true }
    }


}



export const uploadPendingListing = async (form3Input, individualOwners, companyOwners, photos, userId) => {


    const localToken = sessionStorage.getItem('localToken');

    const customHeaders = {
        'Authorization': localToken
    }


    const client = generateClient();
    //const localToken = sessionStorage.getItem('localToken');

    const { region, district, type, estate, block, phase, floor, unit, room, facilities, decorations, view, sellingPoints, isHaunt, price, priceWithoutLandPremium } = form3Input;


    const floatPrice = parseFloat(price);
    const floatPriceWithoutLandPremium = parseFloat(priceWithoutLandPremium);

    console.log('photos:', photos);

    const listingId = uuidv4();
    const photoKeys = photos.map(() => `pending-listings/${listingId}/pendingPhotos/${uuidv4()}`)

    console.log("photoKeys:", photoKeys)

    const uuidPattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;

    const extractedPhotoKeys = photoKeys.map((photoKey) => {
        const matches = photoKey.match(uuidPattern);
        return matches ? matches[0] : null;
    });

    console.log('extractedPhotoKeys:', extractedPhotoKeys)

    const deletePhotos = async (listingId) => {

        try {
            const response = await client.graphql({
                query: deleteUploadedPhoto,
                variables: {
                    operation: "destroy",
                    listingId
                }
            });
            console.log('Deletion response:', response);
            return { success: true, message: "Photos deleted successfully" };
        } catch (error) {
            console.error('Failed to delete photos:', error);
            return { success: false, message: "Failed to delete photos" };
        }
    }

    const pendingOwnerData = [
        ...individualOwners.map(owner => ({
            id: owner.id,
            type: "個人業主",
            ownerName: owner.ownerName,
            ownerHkId: owner.ownerHkId,
            ownerPhone: owner.ownerPhone,
            directorName: null,  // Individual owners do not have directorName
            companyAddress: null,  // Individual owners do not have companyAddress
            bussinessRegistrationId: null,  // Individual owners do not have bussinessRegistrationId
            pendingListingId: listingId,
            userId: userId
        })),
        ...companyOwners.map(companyOwner => ({
            id: companyOwner.id,
            type: "公司業主",
            ownerName: companyOwner.companyName,  // Company owners do not have ownerName
            ownerHkId: companyOwner.directorHkId,  // Company owners do not have ownerHkId
            ownerPhone: companyOwner.directorPhone,
            directorName: companyOwner.directorName,
            companyAddress: companyOwner.companyAddress,
            bussinessRegistrationId: companyOwner.bussinessRegistrationId,
            pendingListingId: listingId,
            userId: userId,
        }))
    ]

    const pendingListData = {
        id: listingId,
        region: region,
        district: district,
        type: type,
        estate: estate,
        block: block,
        phase: phase,
        floor: floor,
        unit: unit,
        room: room,
        facilities: facilities,
        decorations: decorations,
        view: view,
        sellingPoints: sellingPoints,
        isHaunt: isHaunt,
        price: floatPrice,
        priceWithoutLandPremium: floatPriceWithoutLandPremium,
        pendingOwnersId: [...individualOwners.map((owner) => owner.id), ...companyOwners.map((companyOwner) => companyOwner.id)],
        pendingOwners: pendingOwnerData,
        userId: userId,
        status: "待審批",
        photos: extractedPhotoKeys

    };




    try {
        /*  const uploadPhotosResponse = await uploadFile(photos, pendingListData.id);
         console.log("upload photo response :" + uploadPhotosResponse); */

        const callUploadPhotoMutationRes = await client.graphql({
            query: createPresignedUploadUrl,
            variables: {
                photoKeys: photoKeys,
                noOfPhotos: photos.length
            },
        }, customHeaders)

        console.log(callUploadPhotoMutationRes);

        console.log("uploadedPhotosUrls :" + JSON.stringify(callUploadPhotoMutationRes, null, 2));

        const presignedUrls = callUploadPhotoMutationRes.data.createPresignedUploadUrl.presignedUrls;
        const uploadResult = await Promise.all(photos.map((photo, index) => {
            const url = presignedUrls[index];
            console.log(url);
            console.log(photo.file);
            return fetch(url, {
                method: "PUT",
                body: photo.file,
            });
        }));
        console.log(uploadResult)

        const allUploadsSuccessful = uploadResult.every(response => response.ok);

        if (allUploadsSuccessful) {

            const callUploadListingMutationRes = await client.graphql({
                query: createPendingListing,
                variables: {
                    pendingListingInput: pendingListData
                }
            }, customHeaders);
            console.log("createdPendingList :" + callUploadListingMutationRes);

            return { success: true, message: "成功上傳" }

        } else {

            await deletePhotos(listingId);

            console.log('upload image fail');
            return { success: false, message: "上傳圖片失敗" }
        }

    } catch (error) {
        console.log(error);

        await deletePhotos(listingId);

        return { success: false, message: "系統連接失敗" }
    }

} 