import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { schemaObject } from './apollo';
import passport from 'passport';
import session from 'express-session';
import { v4 as uuid } from 'uuid';
import { buildContext } from 'graphql-passport';
import initPassport from './passport/initPassport';
import MongoStore from 'connect-mongo';

const clientUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL
    : 'http://localhost:3000';

initPassport();
const app: Express = express();

app.use(express.json());

app.use(
  session({
    genid: (req: Request) => uuid(),
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI as string,
      autoRemove: 'interval',
      autoRemoveInterval: 10,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  credentials: true,
  origin: clientUrl,
};

// Initialising apollo server
const apolloServer = new ApolloServer({
  schema: schemaObject,
  context: ({ req, res }: { req: Request; res: Response }) =>
    buildContext({ req, res }),
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
});

apolloServer.applyMiddleware({ app: app, cors: corsOptions });

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 4000;

mongoose
  .connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('conected to mongodb...');
    app.listen(PORT, () => {
      console.log(`Listening to PORT ${PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
