import { gql } from '@apollo/client';

export const GET_TAGS = gql`
  query GetTags($page: Int, $limit: Int) {
    tags(page: $page, limit: $limit) {
      id
      name
    }
  }
`;

export const GET_TAG = gql`
  query GetTag($id: ID!) {
    tag(id: $id) {
      id
      name
    }
  }
`;