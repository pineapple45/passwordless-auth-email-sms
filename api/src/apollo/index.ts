import { mergeSchemas } from 'apollo-server-express';
import { frameworkSchema, userSchema } from './type-defs';
import { frameworkResolvers, usersResolver } from './resolvers';

export const schemaObject = mergeSchemas({
  schemas: [frameworkSchema, userSchema],
  resolvers: [frameworkResolvers, usersResolver],
});
