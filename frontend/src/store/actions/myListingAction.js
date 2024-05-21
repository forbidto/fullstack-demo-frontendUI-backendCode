import { generateClient } from 'aws-amplify/api';
import { listMyListings} from '../../graphql/queries';
import { createAgreementUploadUrl, signAgreementUpdate } from '../../graphql/mutations';



const client = generateClient();


export const fetchMyListing = async (userId) => {

    try {
            const variables = {
                userId: userId,
                nextToken: null,
            };
            const myListingData = await client.graphql({
                query: listMyListings,
                variables
            });
            console.log("myListingData:", myListingData)
            return{success:true, myListingData}
       
        }
     catch (err) {
        console.error('Error fetching listings', err);
        return{success:false, err}
    }
};


/* export const fetchPendingOwners = async (id) =>{

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

} */


export const getSellerAgreementUploadUrl = async (listingId, userId) =>{

    const variables = {
        listingId,
        userId,
        role:"seller"
    };

    try{
        const getUrl = await client.graphql({
            query:createAgreementUploadUrl,
            variables
        });
        console.log("getSellerAgreementUploadUrl:", getUrl)
        const urls = getUrl.data.createAgreementUploadUrl.presignedUrl
        const pdfId = getUrl.data.createAgreementUploadUrl.pdfId
        return{success:true, urls, pdfId}
    }catch(error){
        console.error('Error fetching listings', error);
        return{success:false, error}
    }

}

export const sellerAgreementDataUpdate = async (listingId, agreementId, district, type) =>{
    
    const variables = {
        listingId,
        agreementId,
        role:"seller",  
        district,
        type
    };

    console.log('variables:',variables)
    try{
        const updateRes = await client.graphql({
            query:signAgreementUpdate,
            variables
        });
        console.log('updateRes:',updateRes)
    }catch(error){
        console.error('Error update', error);
        return{success:false, error}
    }

}

