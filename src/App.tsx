import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import UserPage from './pages/Users/UserPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import CreateOperation from './pages/Operations/CreateOperation';
import OperationsRecords from './pages/Operations/OperationRecords';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/operation/create" element={<CreateOperation />} />
      <Route path="/operation/listAll" element={<OperationsRecords />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
