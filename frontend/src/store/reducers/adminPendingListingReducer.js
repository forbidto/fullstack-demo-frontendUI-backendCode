import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';


const pendingListingsCacheState = {
    listings: [],
    nextToken: null
};

const selectListings = state => state.pendingListingsCache.listings;

export const selectFilteredResult = (typeFilter, statusFilter, priceMinFilter, priceMaxFilter, districtFilter) => createSelector(
    [selectListings],
    (listings) => {
      return listings.filter(listing => {
        const typeMatch = typeFilter ? listing.type === typeFilter : true;
        const statusMatch = statusFilter ? listing.status === statusFilter : true;
        const priceMinMatch = priceMinFilter
            ? listing.price >= priceMinFilter
            : true;
            const priceMaxMatch = priceMaxFilter
            ? listing.price <= priceMaxFilter
            : true;
        const districtMatch = districtFilter ? listing.district === districtFilter : true;
  
        return typeMatch && statusMatch && priceMinMatch && priceMaxMatch && districtMatch;
      });
    }
  );


export const pendingListingsCacheSlice = createSlice({
    name: "pendingListingsCache",
    initialState: pendingListingsCacheState,
    reducers: {
        firstPendingListingsQuery: (state, action) => {
            state.listings = [...new Set([...state.listings, ...action.payload.data.listPendingListings.items])];
            state.nextToken = action.payload.data.listPendingListings.nextToken;
        },
        nextPendingListingsQuery: (state, action) => {
            state.listings = [...new Set([...state.listings, ...action.payload.data.listPendingListings.items])];
            state.nextToken = action.payload.data.listPendingListings.nextToken;
        },
        clearPendingListingsState:(state)=>{
            state.listings =[];
            state.nextToken = null
        }
    }
});

const selectPendingListingById = (state, listingId) => {
    state.listings.listings.find(listing => listing.id === listingId)
}

export const { firstPendingListingsQuery, nextPendingListingsQuery, clearPendingListingsState } = pendingListingsCacheSlice.actions;
export default pendingListingsCacheSlice.reducer;


