import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Image: {
        fields: {
          likedBy: {
            merge: false,
          },
        },
      },
      Query: {
        fields: {
          search: {
            keyArgs: ['query'],
            merge: (existing = {}, incoming = {}) => {
              const existingResults = existing.results;
              const incomingResults = incoming.results;

              if (incomingResults) {
                return {
                  ...incoming,
                  results: [...(existingResults || []), ...incomingResults],
                };
              }

              return existing;
            },
          },
          getImages: {
            keyArgs: [],
            merge: (existing = {}, incoming = {}) => {
              const existingResults = existing.results;
              const incomingResults = incoming.results;
              console.log(existingResults, incomingResults);
              if (incomingResults) {
                return {
                  ...incoming,
                  results: [...(existingResults || []), ...incomingResults],
                };
              }

              return existing;
            },
          },
        },
      },
    },
  }),
});

export { client };
