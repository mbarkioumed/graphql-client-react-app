import { gql } from '@apollo/client';

export const GET_LOCATIONS = gql`
  query GetLocations($page: Int, $limit: Int) {
    locations(page: $page, limit: $limit) {
      id
      street
      city
      state
      country
      timezone
    }
  }
`;

export const GET_LOCATION = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      street
      city
      state
      country
      timezone
    }
  }
`;