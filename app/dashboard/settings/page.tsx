'use client';

import React, { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Stack,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Lock as LockIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  CreditCard as CreditCardIcon,
  Store as StoreIcon,
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { getCompanyProfile } from '@/lib/companyProfile';

type SettingsSection = 'profile' | 'notifications' | 'security' | 'localization' | 'appearance' | 'billing';

const settingsSections = [
  { id: 'profile' as SettingsSection, name: 'Profile', icon: PersonIcon },
  { id: 'notifications' as SettingsSection, name: 'Notifications', icon: NotificationsIcon },
  { id: 'security' as SettingsSection, name: 'Security', icon: SecurityIcon },
  { id: 'billing' as SettingsSection, name: 'Billing', icon: CreditCardIcon },
  { id: 'localization' as SettingsSection, name: 'Localization', icon: LanguageIcon },
  { id: 'appearance' as SettingsSection, name: 'Appearance', icon: PaletteIcon },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const companyProfile = getCompanyProfile();
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: companyProfile.name || '',
    email: companyProfile.email || '',
    phone: companyProfile.phone || '',
    website: companyProfile.website || '',
    description: companyProfile.description || '',
    address: companyProfile.address || '',
  });

  // Notification state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    productUpdates: true,
    marketingEmails: false,
    weeklyReports: true,
  });

  // Security state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: '30',
  });

  // Localization state
  const [localizationSettings, setLocalizationSettings] = useState({
    language: 'en',
    timezone: 'UTC',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
  });

  // Appearance state
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    sidebarCollapsed: false,
    compactMode: false,
  });

  const handleProfileChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNotificationChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSecurityChange = (field: string) => (e: any) => {
    setSecuritySettings((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLocalizationChange = (field: string) => (e: any) => {
    setLocalizationSettings((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAppearanceChange = (field: string) => (e: any) => {
    setAppearanceSettings((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Profile Settings
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                    <Avatar
                      src={companyProfile.logo}
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: 'primary.main',
                        fontSize: '2rem',
                        border: '3px solid',
                        borderColor: 'divider',
                      }}
                    >
                      {companyProfile.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Button variant="outlined" size="small" sx={{ mb: 1 }}>
                        Change Avatar
                      </Button>
                      <Typography variant="caption" color="text.secondary" display="block">
                        JPG, GIF or PNG. Max size of 2MB
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    value={profileData.name}
                    onChange={handleProfileChange('name')}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={handleProfileChange('email')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profileData.phone}
                    onChange={handleProfileChange('phone')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    value={profileData.website}
                    onChange={handleProfileChange('website')}
                    placeholder="https://example.com"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={profileData.description}
                    onChange={handleProfileChange('description')}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={profileData.address}
                    onChange={handleProfileChange('address')}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" size="large">
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );

      case 'notifications':
        return (
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Notification Preferences
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Email Notifications
                  </Typography>
                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.emailNotifications}
                          onChange={handleNotificationChange('emailNotifications')}
                        />
                      }
                      label="Enable email notifications"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.orderUpdates}
                          onChange={handleNotificationChange('orderUpdates')}
                        />
                      }
                      label="Order updates and status changes"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.productUpdates}
                          onChange={handleNotificationChange('productUpdates')}
                        />
                      }
                      label="Product updates and new features"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.weeklyReports}
                          onChange={handleNotificationChange('weeklyReports')}
                        />
                      }
                      label="Weekly reports and analytics"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notificationSettings.marketingEmails}
                          onChange={handleNotificationChange('marketingEmails')}
                        />
                      }
                      label="Marketing and promotional emails"
                    />
                  </Stack>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Push Notifications
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.pushNotifications}
                        onChange={handleNotificationChange('pushNotifications')}
                      />
                    }
                    label="Enable push notifications"
                  />
                </Box>
                <Box>
                  <Button variant="contained" size="large">
                    Save Preferences
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Box>
        );

      case 'security':
        return (
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Security Settings
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2, mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                Change Password
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" size="large">
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Two-Factor Authentication
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.twoFactorEnabled}
                        onChange={(e) => setSecuritySettings((prev) => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                      />
                    }
                    label="Enable two-factor authentication for additional security"
                  />
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Session Management
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>Session Timeout</InputLabel>
                    <Select
                      value={securitySettings.sessionTimeout}
                      label="Session Timeout"
                      onChange={handleSecurityChange('sessionTimeout')}
                    >
                      <MenuItem value="15">15 minutes</MenuItem>
                      <MenuItem value="30">30 minutes</MenuItem>
                      <MenuItem value="60">1 hour</MenuItem>
                      <MenuItem value="120">2 hours</MenuItem>
                      <MenuItem value="0">Never</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <Button variant="contained" size="large">
                    Save Security Settings
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Box>
        );

      case 'billing':
        return (
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Billing & Payment
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Payment Methods
                  </Typography>
                  <Button variant="outlined" startIcon={<CreditCardIcon />}>
                    Add Payment Method
                  </Button>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Billing Information
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Billing Name"
                        defaultValue="Acme Corporation"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Tax ID"
                        defaultValue="TAX-123456"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Billing Address"
                        multiline
                        rows={2}
                        defaultValue="123 Business Street, City, State 12345"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Button variant="contained" size="large">
                    Save Billing Information
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Box>
        );

      case 'localization':
        return (
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Localization Settings
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={localizationSettings.language}
                      label="Language"
                      onChange={handleLocalizationChange('language')}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                      <MenuItem value="zh">Chinese</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={localizationSettings.timezone}
                      label="Timezone"
                      onChange={handleLocalizationChange('timezone')}
                    >
                      <MenuItem value="UTC">UTC</MenuItem>
                      <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                      <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                      <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                      <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                      <MenuItem value="Europe/London">London (GMT)</MenuItem>
                      <MenuItem value="Asia/Dubai">Dubai (GST)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Currency</InputLabel>
                    <Select
                      value={localizationSettings.currency}
                      label="Currency"
                      onChange={handleLocalizationChange('currency')}
                    >
                      <MenuItem value="USD">USD - US Dollar</MenuItem>
                      <MenuItem value="EUR">EUR - Euro</MenuItem>
                      <MenuItem value="GBP">GBP - British Pound</MenuItem>
                      <MenuItem value="JPY">JPY - Japanese Yen</MenuItem>
                      <MenuItem value="CNY">CNY - Chinese Yuan</MenuItem>
                      <MenuItem value="AED">AED - UAE Dirham</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Date Format</InputLabel>
                    <Select
                      value={localizationSettings.dateFormat}
                      label="Date Format"
                      onChange={handleLocalizationChange('dateFormat')}
                    >
                      <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                      <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                      <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                      <MenuItem value="DD-MM-YYYY">DD-MM-YYYY</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" size="large">
                    Save Localization Settings
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );

      case 'appearance':
        return (
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Appearance Settings
            </Typography>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Theme
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel>Theme</InputLabel>
                    <Select
                      value={appearanceSettings.theme}
                      label="Theme"
                      onChange={handleAppearanceChange('theme')}
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="auto">Auto (System)</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
                    Layout Preferences
                  </Typography>
                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={appearanceSettings.sidebarCollapsed}
                          onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, sidebarCollapsed: e.target.checked }))}
                        />
                      }
                      label="Collapsed sidebar by default"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={appearanceSettings.compactMode}
                          onChange={(e) => setAppearanceSettings((prev) => ({ ...prev, compactMode: e.target.checked }))}
                        />
                      }
                      label="Compact mode (reduced spacing)"
                    />
                  </Stack>
                </Box>
                <Box>
                  <Button variant="contained" size="large">
                    Save Appearance Settings
                  </Button>
                </Box>
              </Stack>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <SidebarLayout>
      <Box sx={{ display: 'flex', gap: 3, minHeight: '100%' }}>
        {/* Settings Sidebar */}
        <Paper
          sx={{
            width: { xs: '100%', md: 280 },
            minWidth: 280,
            p: 2,
            borderRadius: 2,
            height: 'fit-content',
            position: { md: 'sticky' },
            top: { md: 24 },
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2, px: 1 }}>
            Settings
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List sx={{ p: 0 }}>
            {settingsSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <ListItem key={section.id} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    selected={isActive}
                    onClick={() => setActiveSection(section.id)}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'primary.contrastText',
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={section.name} />
                    {isActive && <CheckCircleIcon sx={{ fontSize: 20 }} />}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Paper>

        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {renderContent()}
        </Box>
      </Box>
    </SidebarLayout>
  );
}
