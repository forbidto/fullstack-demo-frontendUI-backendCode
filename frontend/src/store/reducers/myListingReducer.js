import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';


const myListingState = {
  listings: [{
    id: "1f2c81cb-1996-4dea-b0fd-df06e5d5d835",
    createdAt: "2023-12-13T07:34:43.373Z",
    actualArea: 144,
    adsNumber: "asdzxcczad",
    block: "154",
    buildingYear: 414,
    createdAt_id: "2023-12-13T07:34:43.373Z_1f2c81cb-1996-4dea-b0fd-df06e5d5d835",
    deadline: "2023-12-28",
    decorations: [
      "豪華/特色裝修"
    ],
    district: "堅尼地城",
    estate: "TEST",
    facilities: [
      "鄰近港鐵站"
    ],
    floor: "14",
    isHaunt: false,
    isProcessed: false,
    lat: 515,
    level: "mid",
    lng: 14412,
    phase: "14",
    photos: [
      "pending-listings/1f2c81cb-1996-4dea-b0fd-df06e5d5d835/5a4e42f9-609a-43a1-b74b-982bf68678a6.jpg"
    ],
    price: 8500000,
    priceWithoutLandPremium: null,
    region: "香港",
    room: "開放式",
    sellerAgreementId: "c13d6dd3-c9f8-4232-8376-b722d5388e79",
    sellingPoints: [
      "連一個車位"
    ],
    signedAt: "2023-12-29T14:29:27.799+08:00",
    signSchedule: "2023-12-23",
    status: "已生效",
    statusDistrict: "已生效#堅尼地城",
    type: "私樓",
    typeUpdatedAtId: "私樓#2023-12-29T14:29:27.799+08:00#1f2c81cb-1996-4dea-b0fd-df06e5d5d835",
    unit: "4",
    updatedAt: "2023-12-29T14:29:27.799+08:00",
    userId: "test",
    view: [
      "開揚遠景"
    ]
  }],
  nextToken: null,
  individualOwners: [{
    userId: "8d35f9ca-d75d-4a9b-bc71-bc03b4a4c319",
    createdAt: "2023-11-24T14:58:22.314Z",
    bussinessRegistrationId: null,
    companyAddress: null,
    directorName: null,
    id: "99bf8278-f0ed-409e-928c-2fbf1162cae3",
    ownerHkId: "c1234569",
    ownerName: "CHAN TAI MAN",
    ownerPhone: "94785541",
    type: "individual"
  }, {
    userId: "abcf",
    createdAt: "2018-10-13T19:00:00Z",
    bussinessRegistrationId: null,
    companyAddress: null,
    directorName: null,
    id: "opsada",
    ownerHkId: "dsaihvzxjv",
    ownerName: "LEE LEUNG KEI",
    ownerPhone: "dsaihvzxjv",
    type: "individual"
  }],
  companyOwners: [{
    userId: "test563223",
    createdAt: "2023-11-22T07:25:42.944Z",
    bussinessRegistrationId: "97845541",
    companyAddress: "BAI TAT YING LIMITED COMPANY",
    directorName: "LEE LEUNG KEI",
    id: "7aa8e110-99a5-46f5-887d-e6864f3495f5",
    ownerHkId: "c1234569",
    ownerName: "BAI TAT YING LIMITED COMPANY",
    ownerPhone: "97845541",
    type: "company"
  }],
  nextTokenOwnerQuery: null
};


const selectMyListings = state => state.myListingState.listings;

export const selectMyListingsFilteredResult = (statusFilter) => createSelector(
  [selectMyListings],
  (listings) => {
    return listings.filter(listing => {
      const statusMatch = statusFilter ? listing.status === statusFilter : true;
      return statusMatch;
    });
  }
);


export const myListingSlice = createSlice({
  name: "myListings",
  initialState: myListingState,
  reducers: {
    myListingsQuery: (state, action) => {
      state.listings = [...new Set([...state.listings, ...action.payload.data.listMyListings.items])];
      state.nextToken = action.payload.data.listMyListings.nextToken;
    },
    clearMyListingsState: (state) => {
      state.listings = [];
      state.nextToken = null
    },
    myListingIndividualOwnersQuery: (state, action) => {
      console.log('myListingIndividualOwnersQuery:', action)
      state.individualOwners = action.payload;
      state.nextTokenOwnerQuery = action.payload.nextToken;
    },
    myListingCompanyOwnersQuery: (state, action) => {
      console.log('myListingCompanyOwnersQuery:', action)
      state.companyOwners = action.payload;
      state.nextTokenOwnerQuery = action.payload.nextToken;
    },
    clearMyListingOwnersState: (state) => {
      state.individualOwners = [];
      state.companyOwners = [];
      state.nextTokenOwnerQuery = null
    },
    testAddListing: (state) => {
      state.listings = []
      state.individualOwners = [{
        userId: "8d35f9ca-d75d-4a9b-bc71-bc03b4a4c319",
        createdAt: "2023-11-24T14:58:22.314Z",
        bussinessRegistrationId: null,
        companyAddress: null,
        directorName: null,
        id: "99bf8278-f0ed-409e-928c-2fbf1162cae3",
        ownerHkId: "c1234569",
        ownerName: "CHAN TAI MAN",
        ownerPhone: "94785541",
        type: "individual"
      }, {
        userId: "abcf",
        createdAt: "2018-10-13T19:00:00Z",
        bussinessRegistrationId: null,
        companyAddress: null,
        directorName: null,
        id: "opsada",
        ownerHkId: "dsaihvzxjv",
        ownerName: "LEE LEUNG KEI",
        ownerPhone: "dsaihvzxjv",
        type: "individual"
      }];
      state.companyOwners = [{
        userId: "test563223",
        createdAt: "2023-11-22T07:25:42.944Z",
        bussinessRegistrationId: "97845541",
        companyAddress: "BAI TAT YING LIMITED COMPANY",
        directorName: "LEE LEUNG KEI",
        id: "7aa8e110-99a5-46f5-887d-e6864f3495f5",
        ownerHkId: "c1234569",
        ownerName: "BAI TAT YING LIMITED COMPANY",
        ownerPhone: "97845541",
        type: "company"
      }];
    }
  }
});

/* 
export const myListingOwnerSlice = createSlice({
  name: 'myListingOwners',
  initialState: myListingOwnersState,
  reducers: {
    myListingOwnersQuery: (state, action) => {
      console.log('myListingOwner:', action)
      state.individualOwners = [...new Set([...state.individualOwners, ...action.payload.individualOwners])];
      state.companyOwners = [...new Set([...state.companyOwners, ...action.payload.companyOwners])];
      state.nextToken = action.payload.data.listMyListings.nextToken;
    },
    clearMyListingOwnersState: (state) => {
      state.individualOwners = [];
      state.companyOwners = [];
      state.nextToken = null
    }
  }
}) */




export const { testAddListing, myListingsQuery, clearMyListingsState, myListingIndividualOwnersQuery, myListingCompanyOwnersQuery, clearMyListingOwnersState } = myListingSlice.actions;
export default myListingSlice.reducer;
