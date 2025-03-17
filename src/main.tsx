import { StrictMode, Suspense } from "react";
import "./i18n.ts";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { MainLoader } from "./core/components/atoms/loader";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<MainLoader />}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
);
