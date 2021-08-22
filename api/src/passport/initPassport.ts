import passport from 'passport';
import { GraphQLLocalStrategy } from 'graphql-passport';
import { AuthenticationError } from 'apollo-server-express';
import User from '../models/User';
import { validateEmail, loginStrategies } from '../utils/general';

const initPassport = () => {
  passport.use(
    new GraphQLLocalStrategy(
      async (username: any, password: any, done: any) => {
        let matchingUser = null;
        if (validateEmail(username)) {
          const email = username;
          matchingUser = User.findOne({ email });
          if (!matchingUser) {
            const newUser = new User({
              username: email,
              email: email,
              loginStrategy: loginStrategies.LOCAL,
            });

            matchingUser = await newUser.save();
          }
        } else {
          const phone = username;
          matchingUser = User.findOne({ phone });
          if (!matchingUser) {
            const newUser = new User({
              username: phone,
              phone: phone,
              loginStrategy: loginStrategies.LOCAL,
            });

            matchingUser = await newUser.save();
          }
        }

        const error = matchingUser
          ? null
          : new AuthenticationError('no mathcing user found');
        done(error, matchingUser);

        // {
        //     _id,
        //     username,
        //     email,
        //     phone,
        //     loginStrategy
        // }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    console.log('serialising user', user);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('deserialising user', id);
    const matchingUser = User.findById(id);
    done(null, matchingUser);
  });
};

export default initPassport;
