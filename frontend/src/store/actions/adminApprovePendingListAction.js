import { generateClient } from 'aws-amplify/api';
import { listPendingListings, listPendingOwners } from '../../graphql/queries';
import { firstPendingListingsQuery, nextPendingListingsQuery } from '../reducers/adminPendingListingReducer';
import { approvePendingListing } from '../../graphql/mutations';



const client = generateClient();


export const fetchPendingListings = async (status, sortDirection, nextToken) => {

    try {
        if (nextToken !== null) {
            const variables = {
                status: status,
                nextToken: nextToken,
                sortDirection: sortDirection
            };
            const listingData = await client.graphql({
                query: listPendingListings,
                variables
            });
            console.log("listing data:", listingData)
            return{success:true, data:listingData}
        } else {
            const variables = {
                status: status,
                sortDirection: sortDirection
            };
            const listingData = await client.graphql({
                query: listPendingListings,
                variables
            });
            console.log("listing data:", listingData)
            return{success:true, listingData}
        }
    } catch (err) {
        console.error('Error fetching listings', err);
        return{success:false, err}
    }
};

export const fetchPendingOwners = async (id) =>{

    try{
        const variables = {
            pendingListingId: id,
        };
        const ownerData = await client.graphql({
            query:listPendingOwners,
            variables
        })

        console.log("ownerData.data:", ownerData.data)

        const individualOwners = ownerData.data.listPendingOwners.items.filter(
            (owner) => owner.type === "Individual"
          );
          const companyOwners = ownerData.data.listPendingOwners.items.filter(
            (owner) => owner.type === "Company"
          );
      
          return { individualOwners, companyOwners };

    }catch(error){
        console.error('Error fetching owners', error);
        return { individualOwners: [], companyOwners: [] };
    }

}


export const validateApprovalInput = (level, actualSize, buildingYear, lat, lng) =>{

    const errorMessages = [];

    if(level === null){
        errorMessages.push('請確認樓層')
    };

    if(isNaN(actualSize) || actualSize === null){
        errorMessages.push('請輸入實際面積數字')
    };

    if(isNaN(buildingYear) || buildingYear === null){
        errorMessages.push('請輸入樓齡數字')
    };

    if(isNaN(lat) || lat === null){
        errorMessages.push('請輸入緯度數字')
    };

    if(isNaN(lng) || lng === null){
        errorMessages.push('請輸入經度數字')
    };

    if(errorMessages.length>0){
        return{success:false, message:errorMessages}
    }else{
        return{success:true, message:"validate success"}
    }


}

export const submitPendingListingApproval = async(input, identifier)=>{
    try{
        const variables = {
            input,
            identifier
        }
console.log("variables:", variables)
   const approval = await client.graphql({
            query: approvePendingListing,
            variables
        });
        console.log("approval:", approval)
        return{success:true, message:"approved successfully"}
    }catch(error){
        return{success:false, message:"error in upload", error}
    }
}


