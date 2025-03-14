import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($page: Int, $limit: Int) {
    posts(page: $page, limit: $limit) {
      id
      text
      image
      likes
      tags
      publishDate
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      text
      image
      likes
      tags
      publishDate
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_POSTS_BY_USER = gql`
  query GetPostsByUser($userId: ID!, $page: Int, $limit: Int) {
    postsByUser(userId: $userId, page: $page, limit: $limit) {
      id
      text
      image
      likes
      tags
      publishDate
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_POSTS_BY_TAG = gql`
  query GetPostsByTag($tag: String!, $page: Int, $limit: Int) {
    postsByTag(tag: $tag, page: $page, limit: $limit) {
      id
      text
      image
      likes
      tags
      publishDate
      owner {
        id
        firstName
        lastName
      }
    }
  }
`;