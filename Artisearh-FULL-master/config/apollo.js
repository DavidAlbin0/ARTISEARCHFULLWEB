import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Link para manejar errores
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL error]: Mensaje: ${message}, Path: ${path}`);
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Link para manejar la autenticación (añadir el token)
const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token'); // Suponiendo que guardas el token en localStorage

  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`, // Agregamos el token en los headers de la solicitud
      },
    });
  }

  return forward(operation);
});

// Link para la solicitud HTTP a tu servidor de GraphQL
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/', // tu endpoint de GraphQL
    //uri: 'http://10.121.1.143:4000/graphql', // tu endpoint de GraphQL
    //uri: '/graphql', // tu endpoint de GraphQL
});

// Configuración del cliente de Apollo
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authLink, httpLink]),
});

export default client;
