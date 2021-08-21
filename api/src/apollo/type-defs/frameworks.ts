import { makeExecutableSchema, gql } from 'apollo-server-express';

export const frameworkSchema = makeExecutableSchema({
  typeDefs: gql`
    type Framework {
      _id: ID!
      name: String!
      url: String
    }

    type Query {
      listFrameworks: [Framework]!
    }
  `,
});
