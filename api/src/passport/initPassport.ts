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
          matchingUser = await User.findOne({ email: email });
          if (!matchingUser) {
            const newUser = new User({
              username,
              email: email,
              loginStrategy: loginStrategies.LOCAL,
            });

            matchingUser = await newUser.save();
          }
        } else {
          const phone = username;
          matchingUser = await User.findOne({ phone: phone });
          if (!matchingUser) {
            const newUser = new User({
              username,
              phone: phone,
              loginStrategy: loginStrategies.LOCAL,
            });

            matchingUser = await newUser.save();
          }
        }

        const error = matchingUser
          ? null
          : new AuthenticationError('no matching user');
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
    console.log('serializing user', user);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('deserializing user', id);
    const matchingUser = await User.findById(id);
    done(null, matchingUser);
  });
  [];
};

export default initPassport;
