import {
  ApolloClient,
  InMemoryCache,
  NormalizedCache,
  HttpLink,
} from '@apollo/client';

import { ErrorLink, onError } from '@apollo/client/link/error';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCache>;
const apiUrl = process.env.NEXT_PUBLIC_API;

const createIsomorphicLink = () => {
  return new HttpLink({
    uri: `${apiUrl}/graphql`, // http://localhost:4000/graphql
    credentials: 'include',
  });
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors);
  if (networkError) {
    if (typeof window !== undefined && !window.navigator.onLine) {
      alert('Please check your internet connection or retry again');
    } else if (
      typeof window !== undefined &&
      networkError.message ===
        'Response not successful: Received status code 400'
    ) {
      alert('Server received a bad request. Please check your client queries');
    }

    console.log(`[Network error]: ${networkError}`);
  }
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: errorLink.concat(createIsomorphicLink()),
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    _apolloClient.cache.restore(initialState!);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
