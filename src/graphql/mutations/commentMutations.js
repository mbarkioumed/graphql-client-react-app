import { gql } from '@apollo/client';

export const CREATE_COMMENT = gql`
    mutation CreateComment($message: String!, $ownerId: ID!, $postId: ID!) {
        createComment(message: $message, ownerId: $ownerId, postId: $postId) {
            id
            message
            owner {
                id
                firstName
                lastName
            }
            post {
                id
                text
            }
            publishDate
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation DeleteComment($id: ID!) {
        deleteComment(id: $id)
    }
`;