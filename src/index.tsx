import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloLink, Observable, HttpLink, gql } from '@apollo/client';
import { ApolloProvider } from "@apollo/react-hooks"
import { getAccessToken, setAccessToken } from './accessToken';
import { App } from './App';
import { tokenRefreshLink } from './apollo/apolloLinks';


const cache = new InMemoryCache({});

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any
    Promise.resolve(operation)
      .then(operation => {
          operation.setContext({
            headers:{
              authorization: `bearer ${getAccessToken()}`
            }
          })
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));
    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);



const client = new ApolloClient({
  link: ApolloLink.from([
    tokenRefreshLink,
    requestLink,
    new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include"
    })
  ]),
  cache
});

cache.writeQuery({
  query: gql`
  query GetCartItems {
    cartItems
  }
`,
  data: {
    isConnected: true
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
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

