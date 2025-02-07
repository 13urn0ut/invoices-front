import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import UserContextProvider from "./contexts/UserContextProvider";
import InvoiceContextProvider from "./contexts/InvoiceContextProvider";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <InvoiceContextProvider>
          <App />
        </InvoiceContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </StrictMode>
);
