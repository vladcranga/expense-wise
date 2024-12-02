import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Dashboard from './components/Dashboard';
import Register from './components/Register.tsx';
import Login from './components/Login.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import RedirectIfLoggedIn from './components/RedirectIfLoggedIn.tsx';

createRoot(document.getElementById('root')!).render(
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
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
