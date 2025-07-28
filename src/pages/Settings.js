import React, { useState } from 'react';
import {
  Box, Typography, Paper, Tabs, Tab,
  TextField, Button, Alert
} from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Settings() {
  const [tabValue, setTabValue] = useState(0);
  const [appName, setAppName] = useState('Nano Tuitions');
  const [adminEmail, setAdminEmail] = useState('admin@nanotuitions.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGeneralSettingsSave = () => {
    console.log('Saving General Settings:', { appName, adminEmail });
    alert('General settings saved!');
    // In a real app, update settings in Firebase
  };

  const handleChangePassword = () => {
    setPasswordError('');
    setSuccessMessage('');
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    console.log('Changing Password for current user...');
    alert('Password changed successfully! (In a real app, Firebase Auth update)');
    // In a real app, use Firebase auth.currentUser.updatePassword(password)
    setSuccessMessage('Password updated successfully!');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>System Settings</Typography>

      <Paper elevation={2} sx={{ p: 0 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tabs">
          <Tab label="General Settings" />
          <Tab label="Change Password" />
          {/* <Tab label="Roles & Permissions" />
          <Tab label="Integrations" /> */}
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>General Application Settings</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Application Name"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Default Admin Email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            type="email"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleGeneralSettingsSave}
          >
            Save General Settings
          </Button>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>Change Your Password</Typography>
          {passwordError && <Alert severity="error" sx={{ mb: 2 }}>{passwordError}</Alert>}
          {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleChangePassword}
            disabled={!password || !confirmPassword}
          >
            Change Password
          </Button>
        </TabPanel>

        {/* You can add more TabPanel components for other settings */}
      </Paper>
    </Box>
  );
}

export default Settings;