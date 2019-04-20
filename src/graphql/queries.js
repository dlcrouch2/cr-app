// eslint-disable
// this is an auto generated file. This will be overwritten

export const getCategory = `query GetCategory($id: ID!) {
  getCategory(id: $id) {
    id
    name
    quantity
    details
  }
}
`;
export const listCategorys = `query ListCategorys(
  $filter: ModelCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      quantity
      details
    }
    nextToken
  }
}
`;
