Real Estate Trading Platform
Overview
This project is a demo of a real estate trading platform featuring online agent agreement signing and a direct chat function for buyers and sellers. 

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








