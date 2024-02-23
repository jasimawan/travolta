import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/index.ts";
import { GlobalSearchProvider } from "./context/GlobalSearchContext.tsx";
import SnackbarProvider from "./context/SnackbarProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <GlobalSearchProvider>
          <App />
        </GlobalSearchProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
