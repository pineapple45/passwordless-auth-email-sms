import * as dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GithubStrategy, Profile } from 'passport-github2';
import { GraphQLLocalStrategy } from 'graphql-passport';
import { AuthenticationError } from 'apollo-server-express';
import User from '../models/User';
import { validateEmail, loginStrategies } from '../utils/general';

const apiUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.API_URL
    : 'http://localhost:4000';

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

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: `${apiUrl}/auth/github/callback`,
      },
      (accessToken: any, refreshToken: any, profile: Profile, done: any) => {
        process.nextTick(async () => {
          let user = {};

          try {
            const matchingUser = await User.findOne({
              githubId: profile.id,
            });

            if (!matchingUser) {
              const newUser = new User({
                githubId: profile.id,
                username: profile.username,
                loginStrategy: loginStrategies.GITHUB,
              });

              console.log('mathing User found!');
              const res = await newUser.save();

              user = {
                ...profile,
                _id: res._id,
              };
            } else {
              console.log('matching user found!');
              user = {
                ...profile,
                _id: matchingUser._id,
              };
            }
          } catch (err) {
            let errMsg;
            if (err.code == 11000) {
              errMsg = Object.keys(err.KeyValue)[0] + 'already exists';
            } else {
              errMsg = err.message;
            }

            throw new Error(errMsg);
          }

          return done(null, user);
        });
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
