import "./index.css";
import "@elastic/eui/dist/eui_theme_dark.css";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
