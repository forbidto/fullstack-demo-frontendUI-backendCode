import { createSlice } from "@reduxjs/toolkit";


const form3InputState = {
        region: "香港",
        district: "堅尼地城",
        type: "私樓",
        estate: "fafasf",
        block: "12",
        phase: "41",
        floor: "41",
        unit: "d",
        room: "開放式",
        facilities: ["堅尼地城"],
        decorations: ["堅尼地城"],
        view: ["堅尼地城"],
        sellingPoints: ["堅尼地城"],
        isHaunt: false,
        price: "8500000",
        priceWithoutLandPremium: "8500000",

    individualOwners: [{
        "userId": "8d35f9ca-d75d-4a9b-bc71-bc03b4a4c319",
        "createdAt": "2023-11-24T14:58:22.314Z",
        "bussinessRegistrationId": null,
        "companyAddress": null,
        "directorName": null,
        "id": "99bf8278-f0ed-409e-928c-2fbf1162cae3",
        "ownerHkId": "c1234569",
        "ownerName": "CHAN TAI MAN",
        "ownerPhone": "94785541",
        "type": "individual"
       }],
    companyOwners: [{
        "userId": "abcf",
        "createdAt": "2018-10-13T19:00:00Z",
        "bussinessRegistrationId": null,
        "companyAddress": null,
        "directorName": null,
        "id": "opsada",
        "ownerHkId": "dsaihvzxjv",
        "ownerName": "LEE LEUNG KEI",
        "ownerPhone": "dsaihvzxjv",
        "type": "individual"
       }],
    isValid:false,
    errorMessages:[],
    form3Selection:{
        agreeTimeToVisit:true,
        agreeKeepKey:false,
        agreeShareKey:false,
        agreeShareInfo:true,
        agreeAds:true,
        agentBenefit:false,
        propertyInfoBeforeTempAgreement:true,
        paidBeforeComplete:true
    }
};


const form3InputSlice = createSlice({
    name: "form3Input",
    initialState: form3InputState,
    reducers: {
        validInput: (state, action) => {
            state.isValid=true;
            Object.assign(state, action.payload.formInput);
            state.individualOwners = action.payload.individualOwners;
            state.companyOwners = action.payload.companyOwners;
        },
        invalidInput: (state, action)=>{
            state.isValid=false;
            state.errorMessages=action.payload.errorMessages;
        },
        clearErrorMessages: (state,action)=>{
            state.errorMessages=[];
        },
        form3AgreementUpdate:(state, action)=>{
            state.form3Selection.paidBeforeComplete=action.payload.value
        }

    }
});


export const { validInput, invalidInput, clearErrorMessages, form3AgreementUpdate } = form3InputSlice.actions;
export default form3InputSlice.reducer;