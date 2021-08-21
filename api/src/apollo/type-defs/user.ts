import { makeExecutableSchema, gql } from 'apollo-server-express';

export const userSchema = makeExecutableSchema({
  typeDefs: gql`
    type User {
      _id: ID!
      username: String
      email: String
      phone: String
      loginStrategy: String!
    }

    type AuthPayload {
      user: User
    }

    type Query {
      currentUser: User
    }

    type Mutation {
      getOtp(emailOrPhone: String!): String!
      login(otp: Int!): AuthPayload
      logout: Boolean
      updateProfile(
        id: ID!
        username: String
        email: String
        phone: String
      ): String!
    }
  `,
});
