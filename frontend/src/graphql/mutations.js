/* eslint-disable */
// this is an auto generated file. This will be overwritten


export const sendMessage = /* GraphQL */ `
mutation SendMessage($input:SendMessageInput!){
  sendMessage(input:$input){
    ... on TextPhotoMessage {
      id
      text
      imageId
      messageStatus
    }
    ... on AppointmentMessage {
      id
      visitDate
      visitTime
      visitStatus
    }
  }
}
`


export const sendOTP = /* GraphQL */ `
  mutation SendOTP($operation:String, $type:String, $phoneNumber: String, $email:String) {
    sendOTP(operation:$operation, type:$type, phoneNumber: $phoneNumber, email:$email) {
      message
      success
    }
  }
`;

export const validatePhoneOtpForRegistration = /* GraphQL */`
mutation ValidatePhoneOtpForRegistration(
  $userEmail:String
  $userPhone:String
  $otp: Int
){
  validatePhoneOtpForRegistration(userEmail:$userEmail, userPhone:$userPhone, otp:$otp){
    success
    message
  }
}
`

export const deleteUploadedPhoto = /* GraphQL */ `
mutation DeleteUploadedPhoto(
$operation:String
$listingId:String
$photoKeys:[String]
){
  deleteUploadedPhoto(operation:$operation, listingId:$listingId, photoKeys:$photoKeys){
    success
    message
  }
}
`


export const createPendingListing = /* GraphQL */`
mutation CreatePendingListing(
  $pendingListingInput: PendingListingInput!
) {
  createPendingListing(pendingListingInput:$pendingListingInput){
   success
   message
   pendingListingData{
    id
   }
   error
  }
}
`

export const createCompletePendingListing = /* GraphQL */ `
  mutation CreateCompletePendingListing(
    $input: CreateCompletePendingListingInput!
  ) {
    createCompletePendingListing(input: $input) {
      pendingListing {
        id
      }
      pendingOwners {
        id
      }
    }
  }
`;


export const createPresignedUploadUrl =/* GraphQL */`
mutation CreatePresignedUploadUrl(
  $photoKeys:[String], $noOfPhotos: Int
){
  createPresignedUploadUrl(photoKeys:$photoKeys, noOfPhotos:$noOfPhotos){
  success
    presignedUrls
    message
  }
}
`




export const createUserWithOTP = /* GraphQL */ `
  mutation CreateUserWithOTP(
    $condition: ModelUserConditionInput
    $input: CreateUserInputWithOTP!
    $otp: Int!
  ) {
    createUserWithOTP(condition: $condition, input: $input, otp: $otp) {
      exp
      iat
      message
      refreshToken
      role
      status
      token
      user {
        id
        userName
        userEmail
        userPhone
        role
        icon
        createdAt
        updatedAt
        lastLoginTime
        refreshToken
        __typename
      }
      __typename
    }
  }
`;

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      userName
      userEmail
      userPhone
      role
      icon
      createdAt
      updatedAt
      lastLoginTime
      refreshToken
      pendingListings {
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      userName
      userEmail
      userPhone
      role
      icon
      createdAt
      updatedAt
      lastLoginTime
      refreshToken
      pendingListings {
        nextToken
        __typename
      }
      __typename
    }
  }
`;

export const approvePendingListing = /* GraphQL */ `
mutation ApprovePendingListing(
  $input:PendingListingApprovalInput
  $identifier: PendingListingIdentifierInput
){
  approvePendingListing(input:$input, identifier:$identifier){
    success
    message
  }
}
`

export const createAgreementUploadUrl = /* GraphQL */ `
mutation CreateAgreementUploadUrl(
  $listingId:ID
  $role:String
  $userId:ID
){
  createAgreementUploadUrl(listingId:$listingId, role:$role, userId:$userId){
    success
    presignedUrl
    pdfId
    message
  }
}
`

export const signAgreementUpdate = /* GraphQL */ `
mutation signAgreementUpdate(
  $listingId:ID
  $agreementId:ID
  $role:String
  $district:String
  $type:String
){
  signAgreementUpdate(listingId:$listingId, agreementId:$agreementId, role:$role, district:$district, type:$type){
    success
    message
  }
}
`


export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      userName
      userEmail
      userPhone
      role
      icon
      createdAt
      updatedAt
      lastLoginTime
      refreshToken
      pendingListings {
        nextToken
        __typename
      }
      __typename
    }
  }
`;

export const updatePendingListing = /* GraphQL */ `
  mutation UpdatePendingListing(
    $input: UpdatePendingListingInput!
    $condition: ModelPendingListingConditionInput
  ) {
    updatePendingListing(input: $input, condition: $condition) {
      id
      region
      district
      type
      estate
      block
      phase
      floor
      unit
      room
      facilities
      decorations
      view
      sellingPoints
      isHaunt
      price
      priceWithoutLandPremium
      pendingIndividualOwners {
        nextToken
        __typename
      }
      pendingCompanyOwners {
        nextToken
        __typename
      }
      userId
      user {
        id
        userName
        userEmail
        userPhone
        role
        icon
        createdAt
        updatedAt
        lastLoginTime
        refreshToken
        __typename
      }
      status
      createdAt
      updatedAt
      userPendingListingsId
      userPendingListingsLastLoginTime
      pendingListingUserId
      pendingListingUserLastLoginTime
      __typename
    }
  }
`;
export const deletePendingListing = /* GraphQL */ `
  mutation DeletePendingListing(
    $input: DeletePendingListingInput!
    $condition: ModelPendingListingConditionInput
  ) {
    deletePendingListing(input: $input, condition: $condition) {
      id
      region
      district
      type
      estate
      block
      phase
      floor
      unit
      room
      facilities
      decorations
      view
      sellingPoints
      isHaunt
      price
      priceWithoutLandPremium
      pendingIndividualOwners {
        nextToken
        __typename
      }
      pendingCompanyOwners {
        nextToken
        __typename
      }
      userId
      user {
        id
        userName
        userEmail
        userPhone
        role
        icon
        createdAt
        updatedAt
        lastLoginTime
        refreshToken
        __typename
      }
      status
      createdAt
      updatedAt
      userPendingListingsId
      userPendingListingsLastLoginTime
      pendingListingUserId
      pendingListingUserLastLoginTime
      __typename
    }
  }
`;
export const createPendingCompanyOwner = /* GraphQL */ `
  mutation CreatePendingCompanyOwner(
    $input: CreatePendingCompanyOwnerInput!
    $condition: ModelPendingCompanyOwnerConditionInput
  ) {
    createPendingCompanyOwner(input: $input, condition: $condition) {
      id
      companyName
      bussinessRegistrationId
      directorName
      directorHkId
      directorPhone
      companyAddress
      createdAt
      PendingListingId
      updatedAt
      pendingListingPendingCompanyOwnersUserId
      pendingListingPendingCompanyOwnersCreatedAt
      __typename
    }
  }
`;
export const updatePendingCompanyOwner = /* GraphQL */ `
  mutation UpdatePendingCompanyOwner(
    $input: UpdatePendingCompanyOwnerInput!
    $condition: ModelPendingCompanyOwnerConditionInput
  ) {
    updatePendingCompanyOwner(input: $input, condition: $condition) {
      id
      companyName
      bussinessRegistrationId
      directorName
      directorHkId
      directorPhone
      companyAddress
      createdAt
      PendingListingId
      updatedAt
      pendingListingPendingCompanyOwnersUserId
      pendingListingPendingCompanyOwnersCreatedAt
      __typename
    }
  }
`;
export const deletePendingCompanyOwner = /* GraphQL */ `
  mutation DeletePendingCompanyOwner(
    $input: DeletePendingCompanyOwnerInput!
    $condition: ModelPendingCompanyOwnerConditionInput
  ) {
    deletePendingCompanyOwner(input: $input, condition: $condition) {
      id
      companyName
      bussinessRegistrationId
      directorName
      directorHkId
      directorPhone
      companyAddress
      createdAt
      PendingListingId
      updatedAt
      pendingListingPendingCompanyOwnersUserId
      pendingListingPendingCompanyOwnersCreatedAt
      __typename
    }
  }
`;
export const createPendingIndividualOwner = /* GraphQL */ `
  mutation CreatePendingIndividualOwner(
    $input: CreatePendingIndividualOwnerInput!
    $condition: ModelPendingIndividualOwnerConditionInput
  ) {
    createPendingIndividualOwner(input: $input, condition: $condition) {
      id
      ownerName
      ownerHkId
      ownerPhone
      createdAt
      PendingListingId
      updatedAt
      pendingListingPendingIndividualOwnersUserId
      pendingListingPendingIndividualOwnersCreatedAt
      __typename
    }
  }
`;
export const updatePendingIndividualOwner = /* GraphQL */ `
  mutation UpdatePendingIndividualOwner(
    $input: UpdatePendingIndividualOwnerInput!
    $condition: ModelPendingIndividualOwnerConditionInput
  ) {
    updatePendingIndividualOwner(input: $input, condition: $condition) {
      id
      ownerName
      ownerHkId
      ownerPhone
      createdAt
      PendingListingId
      updatedAt
      pendingListingPendingIndividualOwnersUserId
      pendingListingPendingIndividualOwnersCreatedAt
      __typename
    }
  }
`;
export const deletePendingIndividualOwner = /* GraphQL */ `
  mutation DeletePendingIndividualOwner(
    $input: DeletePendingIndividualOwnerInput!
    $condition: ModelPendingIndividualOwnerConditionInput
  ) {
    deletePendingIndividualOwner(input: $input, condition: $condition) {
      id
      ownerName
      ownerHkId
      ownerPhone
      createdAt
      PendingListingId
      updatedAt
      pendingListingPendingIndividualOwnersUserId
      pendingListingPendingIndividualOwnersCreatedAt
      __typename
    }
  }
`;
