/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      slug
      subCategories {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        slug
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSubCategory = /* GraphQL */ `
  query GetSubCategory($id: ID!) {
    getSubCategory(id: $id) {
      id
      name
      slug
      categoryID
      category {
        id
        name
        slug
        createdAt
        updatedAt
        __typename
      }
      products {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSubCategories = /* GraphQL */ `
  query ListSubCategories(
    $filter: ModelSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        slug
        categoryID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const subCategoriesByCategoryID = /* GraphQL */ `
  query SubCategoriesByCategoryID(
    $categoryID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subCategoriesByCategoryID(
      categoryID: $categoryID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        slug
        categoryID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      description
      price
      thumbnailUrl
      fileUrl
      status
      adminFeedback
      techStack
      livePreviewUrl
      subCategoryID
      subCategory {
        id
        name
        slug
        categoryID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        price
        thumbnailUrl
        fileUrl
        status
        adminFeedback
        techStack
        livePreviewUrl
        subCategoryID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productsBySubCategoryID = /* GraphQL */ `
  query ProductsBySubCategoryID(
    $subCategoryID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productsBySubCategoryID(
      subCategoryID: $subCategoryID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        price
        thumbnailUrl
        fileUrl
        status
        adminFeedback
        techStack
        livePreviewUrl
        subCategoryID
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPrimeService = /* GraphQL */ `
  query GetPrimeService($id: ID!) {
    getPrimeService(id: $id) {
      id
      name
      url
      isActive
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPrimeServices = /* GraphQL */ `
  query ListPrimeServices(
    $filter: ModelPrimeServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrimeServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        url
        isActive
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPhotoCategory = /* GraphQL */ `
  query GetPhotoCategory($id: ID!) {
    getPhotoCategory(id: $id) {
      id
      name
      slug
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPhotoCategories = /* GraphQL */ `
  query ListPhotoCategories(
    $filter: ModelPhotoCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhotoCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        slug
        description
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSellerProfile = /* GraphQL */ `
  query GetSellerProfile($id: ID!) {
    getSellerProfile(id: $id) {
      id
      shopName
      description
      website
      status
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSellerProfiles = /* GraphQL */ `
  query ListSellerProfiles(
    $filter: ModelSellerProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSellerProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        shopName
        description
        website
        status
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
