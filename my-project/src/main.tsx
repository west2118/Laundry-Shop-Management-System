import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Cache data as fresh for 5 minutes
      gcTime: 15 * 60 * 1000, // Keep inactive cache for 15 minutes
      refetchOnWindowFocus: false, // Don't automatically refetch when switching browser tabs
      retry: 1, // Only retry failed requests once
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
