/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const authCheck = /* GraphQL */`
query AuthCheck{
  authCheck{
    isAuthenticated
    user{
      id
      userName
      role
    }
  }
}
`

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!, $lastLoginTime: AWSDateTime!) {
    getUser(id: $id, lastLoginTime: $lastLoginTime) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $lastLoginTime: ModelStringKeyConditionInput
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      lastLoginTime: $lastLoginTime
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getPendingListing = /* GraphQL */ `
  query GetPendingListing($userId: ID!, $createdAt: AWSDateTime!) {
    getPendingListing(userId: $userId, createdAt: $createdAt) {
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

export const listPendingOwners = /* GraphQL */`
 query ListPendingOwners(
  $pendingListingId: ID,
  $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
 ){
  listPendingOwners(
    pendingListingId:$pendingListingId
    limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
  ){
    items{
      id
	    type
	    ownerName
	    ownerHkId
	    ownerPhone
	    directorName
	    companyAddress
	    bussinessRegistrationId
    }
    nextToken
  }
 }
`

export const listPendingListings = /* GraphQL */ `
  query ListPendingListings(
    $status: String
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPendingListings(
      status: $status
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
	      userId
	      pendingOwnersId
	      status
	      photos
	      createdAt
	      updatedAt
        signSchedule
        level
        actualArea
        buildingYear
        lat
        lng
        deadline
        adsNumber
      }
      nextToken
    }
  }
`;


export const listMyListings = /* GraphQL */ `
  query ListMyListings(
    $userId: ID
    $nextToken: String
  ) {
    listMyListings(
      userId: $userId
      nextToken: $nextToken
    ) {
      items {
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
	      userId
	      pendingOwnersId
	      status
	      photos
	      createdAt
	      updatedAt
        signSchedule
        level
        actualArea
        buildingYear
        lat
        lng
        deadline
        adsNumber
      }
      nextToken
    }
  }
`;