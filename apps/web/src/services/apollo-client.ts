import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  GetImagesQuery,
  StrictTypedTypePolicies,
} from '@image-like/data-access';

import { getAccessToken } from './cookies';

const httpLink = createHttpLink({
  uri: 'http://localhost:3333/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const typePolicies: StrictTypedTypePolicies = {
  Image: {
    fields: {
      likedBy: {
        merge: false,
      },
    },
  },
  Query: {
    fields: {
      getImages: {
        keyArgs: ['q'],
        merge: (existing = {}, incoming = {}) => {
          const existingResults = existing.results;
          const incomingResults = incoming.results;

          if (incomingResults) {
            const results = [...(existingResults || []), ...incomingResults];
            return {
              ...incoming,
              page: Math.ceil(results.length / 20),
              hasMore: incoming.page < incoming.total_pages,
              results,
            };
          }

          return existing;
        },
      },
    },
  },
};

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies,
  }),
});

export { client };
