import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import Client from "./Apollo/Client";
import { ApolloProvider } from "@apollo/client";

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
};

ReactDOM.render(
  <ApolloProvider client={Client}>
    <Provider template={AlertTemplate} {...options}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
