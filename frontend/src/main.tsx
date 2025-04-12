// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./lib/redux/store.ts";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./lib/error_boundary/ErrorFallback.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ErrorBoundary FallbackComponent={ErrorFallBack}>
    <Provider store={store}>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </Provider>
  </ErrorBoundary>
  // </StrictMode>
);
