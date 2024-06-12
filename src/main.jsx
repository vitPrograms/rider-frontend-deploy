import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE } from "./config/oAuth2/google.js";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { URL } from "./config/URL/urls.js";

const theme = createTheme();

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri: `${URL.SERVER.HOST + URL.SERVER.ENDPOINT.GRAPHQL}`,
  credentials: "include",
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return forward(operation);
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <GoogleOAuthProvider clientId={GOOGLE.CLIENT_ID}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ApolloProvider>
      </Provider>
    </ThemeProvider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
