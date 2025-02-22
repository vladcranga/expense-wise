import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import ExpensePage from "./components/dashboard/ExpensePage";
import ConverterPage from "./components/dashboard/ConverterPage";
import CalculatorPage from "./components/dashboard/CalculatorPage";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfLoggedIn>
              <App />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectIfLoggedIn>
              <Register />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard/expenses" replace />} />
          <Route path="expenses" element={<ExpensePage />} />
          <Route path="converter" element={<ConverterPage />} />
          <Route path="calculator" element={<CalculatorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
