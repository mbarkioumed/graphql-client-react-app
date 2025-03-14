import { gql } from '@apollo/client';

export const CREATE_LOCATION = gql`
    mutation CreateLocation($street: String, $city: String, $state: String, $country: String, $timezone: String) {
        createLocation(street: $street, city: $city, state: $state, country: $country, timezone: $timezone) {
            id
            street
            city
            state
            country
            timezone
        }
    }
`;

export const UPDATE_LOCATION = gql`
    mutation UpdateLocation($id: ID!, $street: String, $city: String, $state: String, $country: String, $timezone: String) {
        updateLocation(id: $id, street: $street, city: $city, state: $state, country: $country, timezone: $timezone) {
            id
            street
            city
            state
            country
            timezone
        }
    }
`;

export const DELETE_LOCATION = gql`
    mutation DeleteLocation($id: ID!) {
        deleteLocation(id: $id)
    }
`;