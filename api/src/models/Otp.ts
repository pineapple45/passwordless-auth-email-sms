import { model, models, Schema, Document } from 'mongoose';

export interface OtpSchemaProps extends Document {
  otp: number;
  user?: string;
  medium: string; // 'phone' or 'email'
  expireAt: string;
}

export const OtpSchema = new Schema<OtpSchemaProps>(
  {
    otp: { type: Number, required: true },
    user: { type: String, required: true, unique: true },
    medium: { type: String, required: true },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: '5m' },
    },
  },
  {
    timestamps: true,
  }
);

export default models.Otp || model<OtpSchemaProps>('Otp', OtpSchema);
