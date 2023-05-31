import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import UserPage from './pages/Users/UserPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import CreateOperation from './pages/Operations/CreateOperation';
import OperationsRecords from './pages/Operations/OperationRecords';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Protected from './components/ProtectedRoute/ProtectedRoute';
import { ERole } from './types/Constants';
import { AuthContext, AuthProvider } from './auth/AuthContext';
import React from 'react';

export function App() {
  const { isUserLoggedIn } = React.useContext(AuthContext);
  console.log('isUserLoggedIn:', isUserLoggedIn);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={isUserLoggedIn ? <Dashboard /> : <Login />} />
      <Route
        path="/dashboard"
        element={
          <Protected isSignedIn={isUserLoggedIn} path="/dashboard">
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/user"
        element={
          <Protected
            isSignedIn={isUserLoggedIn}
            path="/user"
            requiredRole={ERole.ADMIN} // TODO replace with sign in user role when working ISSUE-43
          >
            <UserPage />
          </Protected>
        }
      />
      <Route
        path="/operation/create"
        element={
          <Protected isSignedIn={isUserLoggedIn} path="/operation/create">
            <CreateOperation />
          </Protected>
        }
      />
      <Route
        path="/operation/listAll"
        element={
          <Protected isSignedIn={isUserLoggedIn} path="/operation/create">
            <OperationsRecords />
          </Protected>
        }
      />
      <Route path="*" element={<NotFound />} />
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
}

// Create a client
const queryClient = new QueryClient();

export function WrappedApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
