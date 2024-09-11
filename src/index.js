import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import "./index.css";
import Router from "routes";
import store from "./store";

import { createStandaloneToast } from "@chakra-ui/toast";

const { ToastContainer, toast } = createStandaloneToast();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router />
    <ToastContainer />
  </Provider>
);