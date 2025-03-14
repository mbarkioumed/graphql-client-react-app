import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query GetUsers($page: Int, $limit: Int) {
        users(page: $page, limit: $limit) {
            id
            firstName
            lastName
            email
            gender
            dateOfBirth
            registerDate
            phone
            picture
        }
    }
`;

export const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            firstName
            lastName
            email
            gender
            dateOfBirth
            registerDate
            phone
            picture
            location {
                id
                street
                city
                state
                country
                timezone
            }
        }
    }
`;
