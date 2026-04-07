import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import "./assets/styles/global.css";
import "./assets/styles/fonts.css";
import "./assets/styles/typography.css";
import "./assets/styles/variables.css";
import "./assets/styles/forms.css";
import "./assets/styles/modals.css";

import HomePage from "./components/pages/HomePage";
import Layout from "./components/ui/layout/Layout/Layout";
import LoginPage from "./components/pages/LoginPage";
import AdminPage from "./components/pages/AdminPage";
import { ScrollToHash } from "./components/hooks/useNavigation";
import NotFound from "./components/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <ScrollToHash />
          <Routes>
            <Route path="/finance/" element={<HomePage />} />
            <Route path="/finance/login" element={<LoginPage />} />
            <Route path="/finance/admin" element={<AdminPage />} />
            <Route path="/finance/*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
