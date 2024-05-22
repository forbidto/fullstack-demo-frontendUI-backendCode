Demo for a real estate trading platform with agent agreement signing online and buyer/seller direct chat function.

Only partial function showing on the frontend UI demo without backend hosting on http://react-app-bucket-deploy.s3-website.ap-east-1.amazonaws.com

Below 2 services coded in express server code 

1. User register / login:

Validate user input first in frontend then request OTP sending by restApi, Express server, MongoDb for OTP storing with TTL control and Aws SNS for OTP sending.

Same case for email OTP sending but use AWS SES for email sending

2. Listing CRUD on Postgre SQL

Use Sequelize library to integrate Postgre and Express.

Define Data model under backend/models directory that will apply to Postgre.

CRUD service under backend/services directory.


Frontend

Original some of service developed with Aws cloud service (Appsync, Lambda, DynamoDb). In later stage, i changed 2 services above to handle with Express server.

Responsive display by media query (follow App.css file).

No google map api key added so only development mode of google map display

1. Register

Validate user input under function stored in frontend/src/utils/authUtils.

Once validated, pass request to Rest Api (Express server) / Graphql (Appsync) for phone OTP sending 

User submit phone OTP they received, once the OTP correct, email OTP will send. 

Frontend UI pop up a modal for user input email OTP. Once OTP validated, user can be registered.

2. Login

Frontend UI showing 2 option for login (by phone / email to receive OTP)

Backend code only set up for email OTP as consideration of cost (sms $$ > email $$)

3. Listing display

Home page show listing data display. 2 display mode can be made (Card grid & List table) by switching in the right hand side of Filter bar

Set up filter, sort state to pass fetch query with filter and sort requirement. 

Homepage component pass useState and handle state change function to SearchFilter component. SearchFilter receuve the state change info then pass to Homepage for fetching.

Filter (roomType, area, buildingAage, price, type) and Keywords state are updated when user click sumbit button. Region and Sort state will directly pass to the main state change.

HomePage set up useEffect hook to call fetching once filter state change. 

4. Listing Detail

Main photo display can be changed by useState change when user click on the right handside photo grid item.

Previous set up with AWS S3 objects listing but now i hardcoded the source path

"預約睇樓" button redirect user to Chat page to the owner. 
Chat page Responsive display design to fit mobile screen. "預約睇樓" button inside Chat page is Aws amplify UI library. Message sending use graphql mutation subscription. The endpoint is stopped now.

"直接聯絡" button redirect user to agent agreement review and signing page. 
This function display agent agreement review and siging function. User will accept some terms first, then review agreement template, then sign on the web application. Once signed, the pdf file will pop up for user to download.

5. Post Listing

"我想賣樓" button redirect to upload listing page. User need to agree some terms first then input listing data. The input will be validated before submit. once validated, will redirect to agreement signing page as well.

6. My Listing

"我的放盤" button redirect to my listing page. click on the items under "物業名稱" will redirect to listing edit page. "編輯" button can change edit state for the listing then user can do some edit for some attributes  










