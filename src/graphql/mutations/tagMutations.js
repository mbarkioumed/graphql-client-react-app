import { gql } from '@apollo/client';

export const CREATE_TAG = gql`
    mutation CreateTag($name: String!) {
        createTag(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_TAG = gql`
    mutation UpdateTag($id: ID!, $name: String!) {
        updateTag(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_TAG = gql`
    mutation DeleteTag($id: ID!) {
        deleteTag(id: $id)
    }
`;