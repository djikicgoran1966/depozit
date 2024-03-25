import { gql } from '@apollo/client'

export const USER_LOGIN = gql`
  mutation Login($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      id
      token
      firstName
      lastName
      email
      tokenExpiration
      role
    }
  }
`;
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $id: ID
    $password: String
    $newPassword: String
    $confirmation: String
  ) {
    changePassword(
      id: $id
      password: $password
      newPassword: $newPassword
      confirmation: $confirmation
    ) {
      _id
      firstName
      lastName
      email
      password
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID, $firstName: String, $lastName:String, $email: String) {
    updateUser(id: $id, firstName: $firstName, lastName:$lastName, email: $email) {
      _id
      firstName
      lastName
      email
    }
  }
`;
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID) {
    deleteUser(id: $id) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const ADD_USER = gql`
  mutation CreateUser($userInput: UserInput) {
    createUser(userInput: $userInput) {
      _id
      firstName
      lastName
      email
    }
  }
`;

