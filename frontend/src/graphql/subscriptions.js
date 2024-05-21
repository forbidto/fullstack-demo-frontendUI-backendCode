/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserWithOTP = /* GraphQL */ `
  subscription OnCreateUserWithOTP($filter: ModelSubscriptionUserFilterInput) {
    onCreateUserWithOTP(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreatePendingListing = /* GraphQL */ `
  subscription OnCreatePendingListing(
    $filter: ModelSubscriptionPendingListingFilterInput
  ) {
    onCreatePendingListing(filter: $filter) {
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
export const onUpdatePendingListing = /* GraphQL */ `
  subscription OnUpdatePendingListing(
    $filter: ModelSubscriptionPendingListingFilterInput
  ) {
    onUpdatePendingListing(filter: $filter) {
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
export const onDeletePendingListing = /* GraphQL */ `
  subscription OnDeletePendingListing(
    $filter: ModelSubscriptionPendingListingFilterInput
  ) {
    onDeletePendingListing(filter: $filter) {
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
export const onCreatePendingCompanyOwner = /* GraphQL */ `
  subscription OnCreatePendingCompanyOwner(
    $filter: ModelSubscriptionPendingCompanyOwnerFilterInput
  ) {
    onCreatePendingCompanyOwner(filter: $filter) {
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
export const onUpdatePendingCompanyOwner = /* GraphQL */ `
  subscription OnUpdatePendingCompanyOwner(
    $filter: ModelSubscriptionPendingCompanyOwnerFilterInput
  ) {
    onUpdatePendingCompanyOwner(filter: $filter) {
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
export const onDeletePendingCompanyOwner = /* GraphQL */ `
  subscription OnDeletePendingCompanyOwner(
    $filter: ModelSubscriptionPendingCompanyOwnerFilterInput
  ) {
    onDeletePendingCompanyOwner(filter: $filter) {
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
export const onCreatePendingIndividualOwner = /* GraphQL */ `
  subscription OnCreatePendingIndividualOwner(
    $filter: ModelSubscriptionPendingIndividualOwnerFilterInput
  ) {
    onCreatePendingIndividualOwner(filter: $filter) {
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
export const onUpdatePendingIndividualOwner = /* GraphQL */ `
  subscription OnUpdatePendingIndividualOwner(
    $filter: ModelSubscriptionPendingIndividualOwnerFilterInput
  ) {
    onUpdatePendingIndividualOwner(filter: $filter) {
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
export const onDeletePendingIndividualOwner = /* GraphQL */ `
  subscription OnDeletePendingIndividualOwner(
    $filter: ModelSubscriptionPendingIndividualOwnerFilterInput
  ) {
    onDeletePendingIndividualOwner(filter: $filter) {
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
