import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const token = 'Y3KG60bApd5xkk9AEIUtzZwo6hdfwjfIQZF3sDehMbnkt7MzYxc9jeLAdp95KZFg';

const httpLink = createHttpLink({
  uri: 'https://ps-todo-db.hasura.app/v1/graphql',
});

// // Subscriptions require websockets
// const wsLink = new WebSocketLink({
//   uri: 'ws://ps-todo-db.hasura.app/v1/graphql',
//   options: {
//     reconnect: true,
//     // This is needed specifically for Hasura to allow subscriptions
//     connectionParams: {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         "x-hasura-admin-secret": token
//       }
//     }
//   }
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink
// );

// Add Hasura admin secret header to allow permission to perform mutations and queries
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": token
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
