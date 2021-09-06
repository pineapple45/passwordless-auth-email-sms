import Router from 'next/router';
import React from 'react';
import { initializeApollo } from '../apollo/client';
import { CURRENT_USER_QUERY } from '../apollo/queries';

async function getUser(ctx: any) {
  const client = initializeApollo();
  let user = null;

  console.log('COOKIE', ctx.req.headers.cookie);

  try {
    const { data } = await client.query({
      query: CURRENT_USER_QUERY,
      fetchPolicy: 'network-only',
      context: {
        headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined,
      },
    });

    user = data.currentUser;
  } catch (err) {
    console.log(err);
  }

  return user;
}

export function WithAuthServerSideProps(getServerSidePropsFunc?: Function) {
  return async (context: any) => {
    const user = await getUser(context);
    if (!user) {
      context.res.writeHead(302, {
        Location: '/login',
      });
      context.res.end();
    }

    if (getServerSidePropsFunc) {
      const data = await getServerSidePropsFunc(context, user);
      return {
        props: {
          user,
          data,
        },
      };
    }
    return { props: { user, data: { props: { user } } } };
  };
}

// withAuthComponent.tsx
export function WithAuthComponent(Component: any) {
  return ({ user, data }: { user: any; data: any }) => {
    console.log('CURRENT LOGGED IN USER', user);

    return <Component {...data.props} />;
  };
}
