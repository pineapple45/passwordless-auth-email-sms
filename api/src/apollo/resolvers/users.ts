import {
  IResolvers,
  UserInputError,
  AuthenticationError,
} from 'apollo-server-express';
import Otp from '../../models/Otp';
import { validateEmail, otpGeneratorUtil } from '../../utils/general';
import User from '../../models/User';
import { sendOTPEmail } from '../../utils/nodemailer';
import { sendOTPSMS } from '../../utils/twilio';

export const usersResolver: IResolvers = {
  Query: {
    currentUser: (parent, args, context) => {
      return context.getUser();
    },
  },
  Mutation: {
    getOtp: async (_, { emailOrPhone }: { emailOrPhone: string }) => {
      if (!emailOrPhone) {
        throw new UserInputError('No email or phone provided');
      }

      const isEmail = validateEmail(emailOrPhone);

      const genOtp = otpGeneratorUtil();

      if (isEmail) {
        const otp = await Otp.findOne({ user: emailOrPhone });
        if (otp) throw new Error('Otp already sent');

        const newOtp = new Otp({
          user: emailOrPhone,
          otp: genOtp,
          medium: 'email',
        });

        // save otp to database
        await newOtp.save();

        // send otp to email entered by user (nodemailer)
        // await sendOTPEmail({
        //   otp: genOtp,
        //   toUser: emailOrPhone,
        // });

        return `otp sent to ${emailOrPhone}`;
      } else {
        let phoneNumber: string;
        try {
          const { value, countryCode }: { value: string; countryCode: string } =
            JSON.parse(emailOrPhone);
          phoneNumber = value;

          const otp = await Otp.findOne({ user: phoneNumber });
          if (otp) throw new Error('Otp already sent');

          const newOtp = new Otp({
            user: phoneNumber,
            otp: genOtp,
            medium: 'phone',
          });

          await newOtp.save();

          // send sms to phone number entered by user using twilio
          return `otp sent to ${phoneNumber}`;
        } catch (err) {
          throw new UserInputError('invalid email or phone input');
        }
      }
    },

    login: async (_, { otp }, context) => {
      const foundOtp = await Otp.findOne({ otp });
      if (!foundOtp) throw new AuthenticationError('otp expired or invalid ');

      const { user, info } = await context.authenticate('graphql-local', {
        username: foundOtp.user,
        password: foundOtp.user,
      });

      context.login(user);

      return { user };
    },
    logout: (_, args, context) => {
      context.logout();
      context.req.session &&
        context.req.session.destroy((err: any) => {
          if (err) throw new AuthenticationError(err);
        });

      context.req.session = null;

      return 'user successfully logged out';
    },
    updateProfile: async (_, { id, username, email, phone }, context) => {
      if (!username && !phone && !email) {
        throw new UserInputError(
          'Please update at least one of the 3 feilds: username , email or phone'
        );
      }

      try {
        const existingUser = await User.findById(id);

        if (!existingUser) throw new Error('user not found');

        if (existingUser.username !== username) {
          existingUser.username = username;
        }
        if (existingUser.email !== email) {
          existingUser.email = email;
        }
        if (existingUser.phone !== phone) {
          existingUser.phone = phone;
        }

        await existingUser.save();
        return `user ${id} updated`;
      } catch (err) {
        let errMsg;
        if (err.code == 11000) {
          errMsg = Object.keys(err.keyValue)[0] + ' already exists'; // phone already exists
        } else {
          errMsg = err.message;
        }

        throw new Error(errMsg);
      }
    },
  },
};
