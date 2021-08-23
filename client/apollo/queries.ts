import { gql } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
  query {
    currentUser {
      _id
      username
      email
      phone
      loginStrategy
    }
  }
`;

export const LIST_FRAMEWORKS_QUERY = gql`
  query {
    listFrameworks {
      _id
      name
      url
    }
  }
`;
