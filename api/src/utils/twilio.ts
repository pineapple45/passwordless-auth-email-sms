import * as dotenv from 'dotenv';
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendSMS = async ({
  to,
  body,
  from,
}: {
  to: string;
  body: string;
  from: string;
}) => {
  try {
    const response = await client.messages.create({
      body: body,
      from: from,
      to: to,
    });

    return { message: response, error: false };
  } catch (err) {
    return { message: err, error: true };
  }
};

export const sendOTPSMS = async ({
  toUser,
  otp,
}: {
  toUser: string;
  otp: string;
}) => {
  const response = await sendSMS({
    to: toUser,
    body: `OTP for login: ${otp}`,
    from: process.env.TWILIO_SENDER_PHONE_NUMBER as string,
  });

  return response;
};
