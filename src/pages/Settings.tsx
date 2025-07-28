import React from 'react';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Card, 
  CardContent,
  TextField,
  Button
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Settings
      </Typography>
      
      <Tabs value={value} onChange={handleChange} sx={{ mb: 3 }}>
        <Tab label="General" />
        <Tab label="Security" />
        <Tab label="Notifications" />
      </Tabs>
      
      <TabPanel value={value} index={0}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Application Settings
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Application Name"
              defaultValue="Nano Tuitions"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Default Timezone"
              select
              defaultValue="Asia/Kolkata"
            >
              <MenuItem value="Asia/Kolkata">India (IST)</MenuItem>
              <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
              <MenuItem value="Europe/London">London (GMT)</MenuItem>
            </TextField>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary">
                Save Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Security Settings
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Password Policy"
              select
              defaultValue="medium"
            >
              <MenuItem value="low">Low (6 characters minimum)</MenuItem>
              <MenuItem value="medium">Medium (8 characters with mix)</MenuItem>
              <MenuItem value="high">High (10 characters with special chars)</MenuItem>
            </TextField>
            <TextField
              fullWidth
              margin="normal"
              label="Session Timeout"
              select
              defaultValue="30"
            >
              <MenuItem value="15">15 minutes</MenuItem>
              <MenuItem value="30">30 minutes</MenuItem>
              <MenuItem value="60">60 minutes</MenuItem>
            </TextField>
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary">
                Save Security Settings
              </Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>
      
      <TabPanel value={value} index={2}>
        <Typography>Notification settings will be displayed here</Typography>
      </TabPanel>
    </Box>
  );
}

export default Settings;