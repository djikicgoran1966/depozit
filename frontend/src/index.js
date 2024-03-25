import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { onError } from'@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context';

// const client = new ApolloClient({
//   uri: 'http://localhost:5000/graphql',
//   cache: new InMemoryCache(),
// });

// const authLink = new HttpLink({
//   uri: "http://localhost:5000/graphql"
// });

const httpLink =  createHttpLink({
  uri: "http://10.168.108.7:5000/graphql"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});


// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token
//     }
//   };
// });


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});




const client=new ApolloClient({
  link:authLink.concat(errorLink).concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery:{
      fetchPolicy:"cache-and-network"
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
         <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
