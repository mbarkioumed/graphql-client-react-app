import { gql } from '@apollo/client';

export const CREATE_POST = gql`
    mutation CreatePost($text: String!, $ownerId: ID!) {
        createPost(text: $text, ownerId: $ownerId) {
            id
            text
            image
            likes
            publishDate
            owner {
                id
                firstName
                lastName
            }
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($id: ID!, $text: String, $image: String) {
        updatePost(id: $id, text: $text, image: $image) {
            id
            text
            image
            likes
            publishDate
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id)
    }
`;