import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query GetComments($page: Int, $limit: Int) {
    comments(page: $page, limit: $limit) {
      id
      message
      publishDate
      owner {
        id
        firstName
        lastName
      }
      post {
        id
        text
      }
    }
  }
`;

export const GET_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: ID!, $page: Int, $limit: Int) {
    commentsByPost(postId: $postId, page: $page, limit: $limit) {
      id
      message
      publishDate
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_COMMENTS_BY_USER = gql`
  query GetCommentsByUser($userId: ID!, $page: Int, $limit: Int) {
    commentsByUser(userId: $userId, page: $page, limit: $limit) {
      id
      message
      publishDate
      post {
        id
        text
      }
    }
  }
`;