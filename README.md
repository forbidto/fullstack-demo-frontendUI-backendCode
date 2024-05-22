Real Estate Trading Platform
Overview
This project is a demo of a real estate trading platform featuring online agent agreement signing and a direct chat function for buyers and sellers. The frontend UI demo is partially functional and available at Demo Link (http://react-app-bucket-deploy.s3-website.ap-east-1.amazonaws.com/). The backend services are not hosted.

Backend Services
Two main services are implemented using Express.js:

User Registration/Login:

Frontend Validation: User input is validated on the frontend.
OTP Handling:
OTP for phone verification is sent using AWS SNS, and for email using AWS SES.
OTPs are stored in MongoDB with TTL control.
Flow: After frontend validation, a request is made to the Express server to send an OTP. Once the phone OTP is verified, an email OTP is sent. Both OTPs must be validated for registration.
Listing CRUD Operations:

Database: Uses PostgreSQL with Sequelize ORM.
Data Models: Defined under backend/models.
CRUD Services: Implemented under backend/services.
Frontend
Initially, some services were developed using AWS Cloud services (AppSync, Lambda, DynamoDB). Later, these were migrated to an Express server setup.

Responsive Design: Implemented using media queries in App.css.
Google Maps: Development mode only, as no API key is added.
Key Features
User Registration:

Validation: Uses functions from frontend/src/utils/authUtils.
OTP Handling: Requests are made to the Express server (or AppSync) for OTP sending. Phone OTP is followed by email OTP for registration completion.
UI: A modal prompts users to enter the received OTPs.
User Login:

Options: Login via phone or email to receive an OTP.
Backend Setup: Currently, only email OTP is set up for cost considerations.

Auth:
Backend generate JWT access token and UUID refresh token.
Response by http cookie / direct jwt in local storage.

Listing Display:

Home Page: Displays listings in either card grid or list table format.
Filtering and Sorting: Filters and sort options are handled via state and passed to the SearchFilter component.
Data Fetching: Uses useEffect to fetch data based on filter state changes.
Listing Detail:

Photo Display: Main photo can be changed by clicking thumbnails.
Chat Feature: "預約睇樓" button redirects to a responsive chat page. Chat functionality uses GraphQL mutation and subscription (currently stopped).
Agent Agreement: "直接聯絡" button redirects to the agent agreement signing page. Users can review, sign, and download the agreement.
Post Listing:

Upload Listing: "我想賣樓" button redirects to the upload page. Users must agree to terms before submitting their listing, which redirects to the agreement signing page.
My Listing:

Manage Listings: "我的放盤" button redirects to the user's listings. Users can edit listings by clicking on "物業名稱" or the "編輯" button.
Technologies Used
Frontend: React, AWS AppSync, AWS Amplify, Redux, MUI
Backend: Node.js, Express.js, MongoDB, PostgreSQL, AWS SNS, AWS SES, Sequelize
Cloud Services: AWS S3, AWS Lambda, AWS DynamoDB







