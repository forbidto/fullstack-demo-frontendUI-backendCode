import awsmobile from "../aws-exports";

/* const getJwtToken = () => {
  // Function to retrieve JWT token from local storage or any other storage mechanism
  return localStorage.getItem('userToken');
};

const appSyncClient = new AWSAppSyncClient({
    url: awsExports.aws_appsync_graphqlEndpoint,
    region: awsExports.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        jwtToken: getJwtToken,
    },
    disableOffline: true
});

export default appSyncClient; */

const APPSYNC_ENDPOINT = "http://localhost:5000/appsync";
const POST_API_ENDPOINT="http://localhost:5000/apiappsync";
const API_GATEWAY_KEY="awsmobile.aws_appsync_apiKey";
/* const API_KEY = awsmobile.aws_appsync_apiKey; */

export const fetchGraphQL = async(query, variables = {}) =>{
  try {
    const response = await fetch(APPSYNC_ENDPOINT, {
      method: 'POST',
      credentials: 'include', // For including cookies in the request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      console.error('GraphQL Error:', jsonResponse.errors);
      throw new Error('GraphQL Error');
    }

    return jsonResponse.data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}




export const postApigatewayToAppsync = async(query, variables = {})=>{
  try{
const response = await fetch(POST_API_ENDPOINT, {
  method:'POST',
credentials:'include',
headers:{
  'Content-Type': 'application/json',
},
body: JSON.stringify({ query, variables })
})

const jsonResponse = await response.json();

    if (jsonResponse.errors) {
      console.error('GraphQL Error:', jsonResponse.errors);
      throw new Error('GraphQL Error');
    }

    return jsonResponse.data;

  }catch(error){
    console.error('Fetch Error:', error);
    throw error;
  }
}

