import "./index.css";
import "@elastic/eui/dist/eui_theme_dark.css";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const cache = createCache({
  key: "dsn-converter-emotion-cache-key",
  nonce: "DIGITIZE_CSP_NONCE",
});

ReactDOM.render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <App />
    </CacheProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
