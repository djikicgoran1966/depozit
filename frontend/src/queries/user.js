import { gql } from '@apollo/client'

export const GET_USERS = gql`
  {
    users {
      _id
      firstName
      lastName
      email
      role
      password
      
    }
  }
`;

export const ORDINARY_USERS = gql`
  {
    ordinaryUsers {
        _id
      firstName
      lastName
      email
      password
    }
  }
`;
