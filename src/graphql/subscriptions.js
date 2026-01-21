/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onCreateCategory(filter: $filter) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onUpdateCategory(filter: $filter) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($filter: ModelSubscriptionCategoryFilterInput) {
    onDeleteCategory(filter: $filter) {
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
export const onCreateSubCategory = /* GraphQL */ `
  subscription OnCreateSubCategory(
    $filter: ModelSubscriptionSubCategoryFilterInput
  ) {
    onCreateSubCategory(filter: $filter) {
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
export const onUpdateSubCategory = /* GraphQL */ `
  subscription OnUpdateSubCategory(
    $filter: ModelSubscriptionSubCategoryFilterInput
  ) {
    onUpdateSubCategory(filter: $filter) {
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
export const onDeleteSubCategory = /* GraphQL */ `
  subscription OnDeleteSubCategory(
    $filter: ModelSubscriptionSubCategoryFilterInput
  ) {
    onDeleteSubCategory(filter: $filter) {
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
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onCreateProduct(filter: $filter, owner: $owner) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onUpdateProduct(filter: $filter, owner: $owner) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct(
    $filter: ModelSubscriptionProductFilterInput
    $owner: String
  ) {
    onDeleteProduct(filter: $filter, owner: $owner) {
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
export const onCreatePrimeService = /* GraphQL */ `
  subscription OnCreatePrimeService(
    $filter: ModelSubscriptionPrimeServiceFilterInput
  ) {
    onCreatePrimeService(filter: $filter) {
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
export const onUpdatePrimeService = /* GraphQL */ `
  subscription OnUpdatePrimeService(
    $filter: ModelSubscriptionPrimeServiceFilterInput
  ) {
    onUpdatePrimeService(filter: $filter) {
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
export const onDeletePrimeService = /* GraphQL */ `
  subscription OnDeletePrimeService(
    $filter: ModelSubscriptionPrimeServiceFilterInput
  ) {
    onDeletePrimeService(filter: $filter) {
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
export const onCreatePhotoCategory = /* GraphQL */ `
  subscription OnCreatePhotoCategory(
    $filter: ModelSubscriptionPhotoCategoryFilterInput
  ) {
    onCreatePhotoCategory(filter: $filter) {
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
export const onUpdatePhotoCategory = /* GraphQL */ `
  subscription OnUpdatePhotoCategory(
    $filter: ModelSubscriptionPhotoCategoryFilterInput
  ) {
    onUpdatePhotoCategory(filter: $filter) {
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
export const onDeletePhotoCategory = /* GraphQL */ `
  subscription OnDeletePhotoCategory(
    $filter: ModelSubscriptionPhotoCategoryFilterInput
  ) {
    onDeletePhotoCategory(filter: $filter) {
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
export const onCreateSellerProfile = /* GraphQL */ `
  subscription OnCreateSellerProfile(
    $filter: ModelSubscriptionSellerProfileFilterInput
    $owner: String
  ) {
    onCreateSellerProfile(filter: $filter, owner: $owner) {
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
export const onUpdateSellerProfile = /* GraphQL */ `
  subscription OnUpdateSellerProfile(
    $filter: ModelSubscriptionSellerProfileFilterInput
    $owner: String
  ) {
    onUpdateSellerProfile(filter: $filter, owner: $owner) {
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
export const onDeleteSellerProfile = /* GraphQL */ `
  subscription OnDeleteSellerProfile(
    $filter: ModelSubscriptionSellerProfileFilterInput
    $owner: String
  ) {
    onDeleteSellerProfile(filter: $filter, owner: $owner) {
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
