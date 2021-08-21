import { IResolvers } from 'apollo-server-express';

const frameworks = [
  {
    _id: Math.random().toString(),
    name: 'React',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png',
  },
  {
    _id: Math.random().toString(),
    name: 'Angular',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
  },
  {
    _id: Math.random().toString(),
    name: 'Vue',
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png',
  },
];

export const frameworkResolvers: IResolvers = {
  Query: {
    listFrameworks: (parent, args, context) => {
      return frameworks;
    },
  },
};
