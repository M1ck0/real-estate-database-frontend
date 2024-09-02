import React from "react";

import { createRoot } from "react-dom/client";

import App from "./shell/app";

import "./common/styles/normalize.css";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
