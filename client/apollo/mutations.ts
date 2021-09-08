import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($otp: String!) {
    login(otp: $otp) {
      user {
        _id
        username
        email
        phone
        loginStrategy
      }
    }
  }
`;

export const GET_OTP_MUTATION = gql`
  mutation getOtp($emailOrPhone: String!) {
    getOtp(emailOrPhone: $emailOrPhone)
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateProfile(
    $id: ID!
    $username: String
    $email: String
    $phone: String
  ) {
    updateProfile(id: $id, username: $username, email: $email, phone: $phone)
  }
`;
