import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';

import AppLayout from './components/layout/AppLayout';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Branches from './pages/Branches';
import Employees from './pages/Employees';
import Students from './pages/Students';
import Fees from './pages/Fees';
import Salaries from './pages/Salaries';
import Attendance from './pages/Attendance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import PrivateRoute from './components/auth/PrivateRoute';

import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="branches" element={<Branches />} />
              <Route path="employees" element={<Employees />} />
              <Route path="students" element={<Students />} />
              <Route path="fees" element={<Fees />} />
              <Route path="salaries" element={<Salaries />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

