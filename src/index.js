import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE } from "./config/oAuth2/google";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./app/store";

const theme = createTheme();


ReactDOM.render(
  <GoogleOAuthProvider clientId={GOOGLE.CLIENT_ID}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Provider>
    </ThemeProvider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
