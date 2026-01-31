'use client';

import React, { useState, useEffect } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';

const drawerWidth = 400;
const collapsedDrawerWidth = 64;

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Actual collapse state
  const [hoverCollapseEnabled, setHoverCollapseEnabled] = useState(false); // Controls if hover-collapse is active

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHoverState = localStorage.getItem('sidebarHoverCollapseEnabled');
      if (savedHoverState) {
        setHoverCollapseEnabled(JSON.parse(savedHoverState));
      }
      // Initialize collapsed state based on hoverCollapseEnabled
      setCollapsed(JSON.parse(savedHoverState || 'false'));
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleToggleCollapse = () => {
    const newHoverState = !hoverCollapseEnabled;
    setHoverCollapseEnabled(newHoverState);
    localStorage.setItem('sidebarHoverCollapseEnabled', JSON.stringify(newHoverState));
    // When hover mode is enabled, immediately collapse the sidebar
    setCollapsed(newHoverState);
  };

  const sidebarWidth = collapsed ? collapsedDrawerWidth : drawerWidth;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar 
        mobileOpen={mobileOpen} 
        onClose={handleDrawerToggle}
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
        hoverCollapseEnabled={hoverCollapseEnabled}
        setCollapsed={setCollapsed} // Pass setter for internal sidebar control
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 1.5, sm: 2, md: 3 },
          pb: { xs: 1.5, sm: 2, md: 3 },
          pl: { xs: 1.5, sm: 2, md: 2 },
          pr: { xs: 1.5, sm: 2, md: 3 },
          bgcolor: 'background.default',
          width: { md: `calc(100% - ${sidebarWidth}px)` },
          minWidth: 0,
          overflow: 'hidden',
          position: 'relative',
          transition: 'width 0.3s ease',
        }}
      >
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mb: 2, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {children}
      </Box>
    </Box>
  );
}
