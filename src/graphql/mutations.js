/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createSubCategory = /* GraphQL */ `
  mutation CreateSubCategory(
    $input: CreateSubCategoryInput!
    $condition: ModelSubCategoryConditionInput
  ) {
    createSubCategory(input: $input, condition: $condition) {
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
export const updateSubCategory = /* GraphQL */ `
  mutation UpdateSubCategory(
    $input: UpdateSubCategoryInput!
    $condition: ModelSubCategoryConditionInput
  ) {
    updateSubCategory(input: $input, condition: $condition) {
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
export const deleteSubCategory = /* GraphQL */ `
  mutation DeleteSubCategory(
    $input: DeleteSubCategoryInput!
    $condition: ModelSubCategoryConditionInput
  ) {
    deleteSubCategory(input: $input, condition: $condition) {
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
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createPrimeService = /* GraphQL */ `
  mutation CreatePrimeService(
    $input: CreatePrimeServiceInput!
    $condition: ModelPrimeServiceConditionInput
  ) {
    createPrimeService(input: $input, condition: $condition) {
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
export const updatePrimeService = /* GraphQL */ `
  mutation UpdatePrimeService(
    $input: UpdatePrimeServiceInput!
    $condition: ModelPrimeServiceConditionInput
  ) {
    updatePrimeService(input: $input, condition: $condition) {
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
export const deletePrimeService = /* GraphQL */ `
  mutation DeletePrimeService(
    $input: DeletePrimeServiceInput!
    $condition: ModelPrimeServiceConditionInput
  ) {
    deletePrimeService(input: $input, condition: $condition) {
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
export const createPhotoCategory = /* GraphQL */ `
  mutation CreatePhotoCategory(
    $input: CreatePhotoCategoryInput!
    $condition: ModelPhotoCategoryConditionInput
  ) {
    createPhotoCategory(input: $input, condition: $condition) {
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
export const updatePhotoCategory = /* GraphQL */ `
  mutation UpdatePhotoCategory(
    $input: UpdatePhotoCategoryInput!
    $condition: ModelPhotoCategoryConditionInput
  ) {
    updatePhotoCategory(input: $input, condition: $condition) {
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
export const deletePhotoCategory = /* GraphQL */ `
  mutation DeletePhotoCategory(
    $input: DeletePhotoCategoryInput!
    $condition: ModelPhotoCategoryConditionInput
  ) {
    deletePhotoCategory(input: $input, condition: $condition) {
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
export const createSellerProfile = /* GraphQL */ `
  mutation CreateSellerProfile(
    $input: CreateSellerProfileInput!
    $condition: ModelSellerProfileConditionInput
  ) {
    createSellerProfile(input: $input, condition: $condition) {
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
export const updateSellerProfile = /* GraphQL */ `
  mutation UpdateSellerProfile(
    $input: UpdateSellerProfileInput!
    $condition: ModelSellerProfileConditionInput
  ) {
    updateSellerProfile(input: $input, condition: $condition) {
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
export const deleteSellerProfile = /* GraphQL */ `
  mutation DeleteSellerProfile(
    $input: DeleteSellerProfileInput!
    $condition: ModelSellerProfileConditionInput
  ) {
    deleteSellerProfile(input: $input, condition: $condition) {
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
