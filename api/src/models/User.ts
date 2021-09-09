import { models, model, Schema, Document } from 'mongoose';

export interface UserSchemaProps extends Document {
  username: string;
  email?: string;
  phone?: string;
  loginStrategy: string;
}

export const UserSchema = new Schema<UserSchemaProps>(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: false,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } },
      },
    },
    phone: {
      type: String,
      required: false,
      index: {
        unique: true,
        partialFilterExpression: { phone: { $type: 'string' } },
      },
    },
    loginStrategy: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// In case of serverless functions to avoid overriding existing schemas
export default models.User || model<UserSchemaProps>('User', UserSchema);
