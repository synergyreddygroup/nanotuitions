import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Toolbar,
  Box
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  AccountTree as BranchIcon,
  People as EmployeeIcon,
  School as StudentIcon,
  AttachMoney as FeeIcon,
  Paid as SalaryIcon,
  Today as AttendanceIcon,
  Receipt as ReceiptIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { currentUser } = useAuth();

  // Role-based menu items
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/', roles: ['admin', 'central', 'branch', 'employee'] },
    { text: 'Branches', icon: <BranchIcon />, path: '/branches', roles: ['admin'] },
    { text: 'Employees', icon: <EmployeeIcon />, path: '/employees', roles: ['admin', 'central'] },
    { text: 'Students', icon: <StudentIcon />, path: '/students', roles: ['admin', 'central', 'branch'] },
    { text: 'Fee Collection', icon: <FeeIcon />, path: '/fees', roles: ['branch'] },
    { text: 'Salary Management', icon: <SalaryIcon />, path: '/salaries', roles: ['central'] },
    { text: 'Attendance', icon: <AttendanceIcon />, path: '/attendance', roles: ['branch'] },
    { text: 'Receipts', icon: <ReceiptIcon />, path: '/receipts', roles: ['branch'] },
    { text: 'Reports', icon: <ReportIcon />, path: '/reports', roles: ['admin', 'central'] },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings', roles: ['admin'] },
  ];

  // Determine user role (simplified - in real app, get from user data)
  const userRole = currentUser?.email?.includes('admin') ? 'admin' : 
                  currentUser?.email?.includes('central') ? 'central' :
                  currentUser?.email?.includes('branch') ? 'branch' : 'employee';

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {filteredMenuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={logout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;