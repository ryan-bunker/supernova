import * as React from "react";
import * as ReactDOM from "react-dom";
import { createMuiTheme, MuiThemeProvider, CssBaseline } from "@material-ui/core";
import App from "./app";
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

let serverWorker: Worker;
//if (window.Worker) {
  serverWorker = new Worker('./server/worker.ts', { name: 'server-worker', type: 'module' });
//}

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "no-cache"
        },
        query: {
            fetchPolicy: "no-cache"
        }
    }
});

let domContainer = document.querySelector('#app-root');
ReactDOM.render(
    <MuiThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App serverWorker={serverWorker} graphClient={client} />
    </MuiThemeProvider>, domContainer);

