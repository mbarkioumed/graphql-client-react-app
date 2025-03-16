import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String!
    ) {
        createUser(
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
        ) {
            id
            firstName
            lastName
            email
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $firstName: String, $lastName: String) {
        updateUser(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
            email
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id)
    }
`;
