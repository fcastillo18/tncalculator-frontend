import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import User from './pages/Users/User';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Operation from './pages/Operations/CreateOperation';
import OperationsRecords from './pages/Operations/OperationRecords';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user" element={<User />} />
      <Route path="/operation/create" element={<Operation />} />
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
