import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./store/store.ts";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorBoundary/ErrorFallback.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ErrorBoundary fallback={<ErrorFallback />}>
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>
  // </React.StrictMode>
);
