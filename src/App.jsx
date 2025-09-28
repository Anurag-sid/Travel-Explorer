import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CountryDetailPage from './pages/CountryDetailPage';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to home if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? <Navigate to="/" replace /> : children;
};

function AppRoutes() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <HomePage />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/country/:countryId" 
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  <CountryDetailPage />
                </ErrorBoundary>
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <AppRoutes />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
