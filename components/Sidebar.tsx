'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  ShoppingCart as OrdersIcon,
  Category as CategoriesIcon,
  Analytics as AnalyticsIcon,
  People as CustomersIcon,
  LocationOn as AddressesIcon,
  Chat as MessagesIcon,
  AccountBalanceWallet as RevenueIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  Reviews as ReviewsIcon,
  Add as AddIcon,
  List as ListIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Group as GroupIcon,
  ExpandMore,
  ExpandLess,
  Close as CloseIcon,
} from '@mui/icons-material';
import { getCompanyProfile, CompanyProfile } from '@/lib/companyProfile';

const drawerWidth = 400;
const collapsedDrawerWidth = 64;

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: DashboardIcon,
  },
  {
    name: 'Products',
    icon: ProductsIcon,
    children: [
      { name: 'Product List', href: '/dashboard/products', icon: ListIcon },
      { name: 'Add Product', href: '/dashboard/products/add', icon: AddIcon },
      { name: 'Product Group', href: '/dashboard/products/group', icon: GroupIcon },
      { name: 'Reviews', href: '/dashboard/reviews', icon: ReviewsIcon },
    ],
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
    icon: OrdersIcon,
  },
  // {
  //   name: 'Categories',
  //   href: '/dashboard/categories',
  //   icon: CategoriesIcon,
  // },
  // {
  //   name: 'Analytics',
  //   href: '/dashboard/analytics',
  //   icon: AnalyticsIcon,
  // },
  // {
  //   name: 'Customers',
  //   href: '/dashboard/customers',
  //   icon: CustomersIcon,
  // },
  // {
  //   name: 'Addresses',
  //   href: '/dashboard/addresses',
  //   icon: AddressesIcon,
  // },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessagesIcon,
  },
  {
    name: 'Revenue',
    href: '/dashboard/revenue',
    icon: RevenueIcon,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: SettingsIcon,
  },
];

const bottomNavItems = [
  { name: 'Help & Support', href: '/dashboard/help', icon: HelpIcon },
  { name: 'Logout', href: '/logout', icon: LogoutIcon },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  hoverCollapseEnabled?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

export default function Sidebar({
  mobileOpen,
  onClose,
  collapsed = false,
  onToggleCollapse,
  hoverCollapseEnabled = false,
  setCollapsed,
}: SidebarProps = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [isProfileLoaded, setIsProfileLoaded] = useState(false);

  const unreadMessages = 3; // Mock unread message count

  useEffect(() => {
    // Load company profile on client-side only
    if (typeof window !== 'undefined') {
      setCompanyProfile(getCompanyProfile());
      setIsProfileLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isProfileLoaded) return;

    // Update company profile when localStorage changes
    const handleStorageChange = () => {
      setCompanyProfile(getCompanyProfile());
    };

    // Handle custom event for same-tab updates
    const handleProfileUpdate = () => {
      setCompanyProfile(getCompanyProfile());
    };

    // Listen for storage events (cross-tab)
    window.addEventListener('storage', handleStorageChange);

    // Listen for custom event (same-tab)
    window.addEventListener('companyProfileUpdated', handleProfileUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('companyProfileUpdated', handleProfileUpdate);
    };
  }, [isProfileLoaded]);

  // Auto-expand sections when their child pages are active
  useEffect(() => {
    const sectionsToOpen: { [key: string]: boolean } = {};
    navItems.forEach((item) => {
      if (item.children && item.children.length > 0) {
        // Check if any child link matches the current pathname
        const hasActiveChild = item.children.some((child) => pathname === child.href);
        if (hasActiveChild) {
          sectionsToOpen[item.name] = true;
        }
      }
    });
    if (Object.keys(sectionsToOpen).length > 0) {
      setOpenSections((prev) => ({ ...prev, ...sectionsToOpen }));
    }
  }, [pathname]);

  const handleSectionClick = (name: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleNavClick = (href: string | undefined, parentSection?: string) => {
    if (href) {
      router.push(href);
      // Keep parent section open when clicking child links
      if (parentSection) {
        setOpenSections((prev) => ({
          ...prev,
          [parentSection]: true,
        }));
      }
      if (onClose) {
        onClose();
      }
    }
  };

  const isActive = (href: string | undefined) => {
    if (!href) return false;
    return pathname === href;
  };

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    }
  };

  const handleProfileClick = () => {
    router.push('/dashboard/profile');
  };

  const handleMouseEnter = () => {
    if (hoverCollapseEnabled && setCollapsed) {
      setCollapsed(false);
    }
  };

  const handleMouseLeave = () => {
    if (hoverCollapseEnabled && setCollapsed) {
      setCollapsed(true);
    }
  };

  const isCollapsed = collapsed;

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#ffffff',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', bgcolor: 'transparent', height: '100%', color: 'text.primary' }}>
          {/* Close Button for Mobile */}
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              onClick={onClose}
              sx={{
                color: 'text.primary',
                bgcolor: 'rgba(0, 0, 0, 0.04)',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.08)',
                  borderColor: 'text.secondary',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Logo Section */}
          {companyProfile && (
            <Box
              sx={{
                p: 3.5,
                display: 'flex',
                alignItems: 'center',
                gap: 2.5,
                cursor: 'pointer',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
                transition: 'background-color 0.2s',
              }}
              onClick={handleProfileClick}
            >
              <Avatar
                src={companyProfile.logo}
                sx={{
                  bgcolor: 'primary.main',
                  width: 56,
                  height: 56,
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  border: '2px solid',
                  borderColor: 'divider',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
              >
                {companyProfile.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: 'text.primary' }}>
                  {companyProfile.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Seller Portal
                </Typography>
              </Box>
            </Box>
          )}

          <Divider sx={{ borderColor: 'divider', mx: 2 }} />

          {/* Navigation */}
          <List sx={{ px: 2.5, py: 1.5, bgcolor: 'transparent' }}>
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = openSections[item.name];

              if (hasChildren) {
                return (
                  <React.Fragment key={item.name}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => handleSectionClick(item.name)}
                        selected={isOpen}
                        sx={{
                          borderRadius: 2,
                          mb: 0.75,
                          py: 1.25,
                          color: 'text.primary',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)',
                          },
                          '&.Mui-selected': {
                            bgcolor: 'rgba(0, 0, 0, 0.08)',
                          },
                        }}
                      >
                        <ListItemIcon>
                          <item.icon sx={{ color: 'text.secondary', minWidth: 40 }} />
                        </ListItemIcon>
                        <ListItemText primary={item.name} sx={{ color: 'text.primary' }} />
                        {isOpen ? <ExpandLess sx={{ color: 'text.secondary' }} /> : <ExpandMore sx={{ color: 'text.secondary' }} />}
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.children!.map((child) => (
                          <ListItem key={child.href} disablePadding>
                            <ListItemButton
                              selected={isActive(child.href)}
                              onClick={() => handleNavClick(child.href, item.name)}
                              sx={{
                                pl: 5,
                                borderRadius: 2,
                                mb: 0.5,
                                py: 1,
                                color: 'text.primary',
                                '&:hover': {
                                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                                },
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
                              <ListItemIcon>
                                <child.icon sx={{ color: isActive(child.href) ? 'inherit' : 'text.secondary', minWidth: 36 }} />
                              </ListItemIcon>
                              <ListItemText primary={child.name} sx={{ color: isActive(child.href) ? 'inherit' : 'text.primary' }} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
              }

              return (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    selected={isActive(item.href)}
                    onClick={() => handleNavClick(item.href)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.75,
                      py: 1.25,
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                      },
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
                    <ListItemIcon>
                      <item.icon sx={{ color: isActive(item.href) ? 'inherit' : 'text.secondary', minWidth: 40 }} />
                    </ListItemIcon>
                    <ListItemText primary={item.name} sx={{ color: isActive(item.href) ? 'inherit' : 'text.primary' }} />
                    {item.name === 'Messages' && unreadMessages > 0 && (
                      <Box
                        sx={{
                          bgcolor: 'error.main',
                          color: 'error.contrastText',
                          borderRadius: '50%',
                          width: 20,
                          height: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {unreadMessages}
                      </Box>
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <Divider sx={{ my: 1.5, borderColor: 'divider', mx: 2 }} />

          {/* Bottom Navigation */}
          <List sx={{ px: 2.5, py: 1.5, bgcolor: 'transparent' }}>
            {bottomNavItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  selected={isActive(item.href)}
                  onClick={() => handleNavClick(item.href)}
                  sx={{
                    borderRadius: 2,
                    mb: 0.75,
                    py: 1.25,
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)',
                    },
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
                  <ListItemIcon>
                    <item.icon sx={{ color: isActive(item.href) ? 'inherit' : 'text.secondary', minWidth: 40 }} />
                  </ListItemIcon>
                  <ListItemText primary={item.name} sx={{ color: isActive(item.href) ? 'inherit' : 'text.primary' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
          flexShrink: 0,
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: isCollapsed ? collapsedDrawerWidth : drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#ffffff',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <Box
          sx={{ overflow: 'auto', bgcolor: 'transparent', height: '100%', color: 'text.primary' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Logo Section with Toggle */}
          <Box sx={{ p: 3.5, display: 'flex', alignItems: 'center', gap: 2.5, position: 'relative' }}>
            {companyProfile && (
              <>
                {!isCollapsed && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.5,
                      flex: 1,
                      cursor: 'pointer',
                      borderRadius: 2,
                      p: 1,
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                      },
                      transition: 'background-color 0.2s',
                    }}
                    onClick={handleProfileClick}
                  >
                    <Avatar
                      src={companyProfile.logo}
                      sx={{
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        border: '2px solid',
                        borderColor: 'divider',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      {companyProfile.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight={700} sx={{ color: 'text.primary' }}>
                        {companyProfile.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Seller Portal
                      </Typography>
                    </Box>
                  </Box>
                )}
                {isCollapsed && (
                  <Box
                    sx={{
                      cursor: 'pointer',
                      borderRadius: 2,
                      p: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      width: '100%',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                      },
                      transition: 'background-color 0.2s',
                    }}
                    onClick={handleProfileClick}
                  >
                    <Avatar
                      src={companyProfile.logo}
                      sx={{
                        bgcolor: 'primary.main',
                        width: 48,
                        height: 48,
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        border: '2px solid',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {companyProfile.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>
                )}
              </>
            )}
            <Tooltip title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} placement="right">
              <IconButton
                onClick={handleToggleCollapse}
                sx={{
                  color: 'text.secondary',
                  bgcolor: isCollapsed ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 0, 0, 0.04)',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.12)',
                    borderColor: 'text.secondary',
                    transform: 'scale(1.05)',
                  },
                  ml: isCollapsed ? 0 : 1,
                  width: 36,
                  height: 36,
                  transition: 'all 0.2s ease',
                }}
              >
                {isCollapsed ? (
                  <ChevronRightIcon sx={{ fontSize: 20, fontWeight: 'bold' }} />
                ) : (
                  <ChevronLeftIcon sx={{ fontSize: 20, fontWeight: 'bold' }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          <Divider sx={{ borderColor: 'divider', mx: 2 }} />

          {/* Navigation */}
          {!isCollapsed && (
            <List sx={{ px: 2.5, py: 1.5, bgcolor: 'transparent' }}>
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openSections[item.name];

                if (hasChildren) {
                  return (
                    <React.Fragment key={item.name}>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => handleSectionClick(item.name)}
                          selected={isOpen}
                          sx={{
                            borderRadius: 2,
                            mb: 0.75,
                            py: 1.25,
                            color: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                            },
                            '&.Mui-selected': {
                              bgcolor: 'rgba(255, 255, 255, 0.15)',
                            },
                          }}
                        >
                          <ListItemIcon>
                            <item.icon sx={{ color: 'text.secondary', minWidth: 40 }} />
                          </ListItemIcon>
                          <ListItemText primary={item.name} sx={{ color: 'text.primary' }} />
                          {isOpen ? <ExpandLess sx={{ color: 'text.secondary' }} /> : <ExpandMore sx={{ color: 'text.secondary' }} />}
                        </ListItemButton>
                      </ListItem>
                      <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.children!.map((child) => (
                            <ListItem key={child.href} disablePadding>
                              <ListItemButton
                                selected={isActive(child.href)}
                                onClick={() => handleNavClick(child.href)}
                                sx={{
                                  pl: 5,
                                  borderRadius: 2,
                                  mb: 0.5,
                                  py: 1,
                                  color: 'text.primary',
                                  '&:hover': {
                                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                                  },
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
                                <ListItemIcon>
                                  <child.icon sx={{ color: isActive(child.href) ? 'inherit' : 'text.secondary', minWidth: 36 }} />
                                </ListItemIcon>
                                <ListItemText primary={child.name} sx={{ color: isActive(child.href) ? 'inherit' : 'text.primary' }} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </React.Fragment>
                  );
                }

                return (
                  <ListItem key={item.href} disablePadding>
                    <ListItemButton
                      selected={isActive(item.href)}
                      onClick={() => handleNavClick(item.href)}
                      sx={{
                        borderRadius: 2,
                        mb: 0.75,
                        py: 1.25,
                        color: 'text.primary',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.04)',
                        },
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
                      <ListItemIcon>
                        <item.icon sx={{ color: isActive(item.href) ? 'inherit' : 'text.secondary', minWidth: 40 }} />
                      </ListItemIcon>
                      <ListItemText primary={item.name} sx={{ color: isActive(item.href) ? 'inherit' : 'text.primary' }} />
                      {item.name === 'Messages' && unreadMessages > 0 && (
                        <Box
                          sx={{
                            bgcolor: 'error.main',
                            color: 'error.contrastText',
                            borderRadius: '50%',
                            width: 20,
                            height: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          {unreadMessages}
                        </Box>
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          )}

          {isCollapsed && (
            <List sx={{ px: 1, py: 1.5, bgcolor: 'transparent' }}>
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                if (hasChildren) {
                  // For collapsed state, show only the parent icon
                  return (
                    <Tooltip key={item.name} title={item.name} placement="right">
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => handleSectionClick(item.name)}
                          selected={openSections[item.name]}
                          sx={{
                            borderRadius: 2,
                            mb: 0.75,
                            py: 1.25,
                            justifyContent: 'center',
                            color: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                            },
                            '&.Mui-selected': {
                              bgcolor: 'rgba(255, 255, 255, 0.15)',
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                            <item.icon sx={{ color: 'text.secondary' }} />
                          </ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    </Tooltip>
                  );
                }
                return (
                  <Tooltip key={item.href} title={item.name} placement="right">
                    <ListItem disablePadding>
                      <ListItemButton
                        selected={isActive(item.href)}
                        onClick={() => handleNavClick(item.href)}
                        sx={{
                          borderRadius: 2,
                          mb: 0.75,
                          py: 1.25,
                          justifyContent: 'center',
                          color: 'text.primary',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)',
                          },
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
                        <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                          <item.icon sx={{ color: isActive(item.href) ? 'inherit' : 'text.secondary' }} />
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                );
              })}
            </List>
          )}

          <Divider sx={{ my: 1.5, borderColor: 'divider', mx: 2 }} />

          {/* Bottom Navigation */}
          {!isCollapsed && (
            <List sx={{ px: 2.5, py: 1.5, bgcolor: 'transparent' }}>
              {bottomNavItems.map((item) => (
                <ListItem key={item.href} disablePadding>
                  <ListItemButton
                    selected={isActive(item.href)}
                    onClick={() => handleNavClick(item.href)}
                    sx={{
                      borderRadius: 2,
                      mb: 0.75,
                      py: 1.25,
                      color: 'text.primary',
                      '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.04)',
                      },
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
                    <ListItemIcon>
                      <item.icon sx={{ color: isActive(item.href) ? 'inherit' : 'text.secondary', minWidth: 40 }} />
                    </ListItemIcon>
                    <ListItemText primary={item.name} sx={{ color: isActive(item.href) ? 'inherit' : 'text.primary' }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}

          {isCollapsed && (
            <List sx={{ px: 1, py: 1.5, bgcolor: 'transparent' }}>
              {bottomNavItems.map((item) => (
                <Tooltip key={item.href} title={item.name} placement="right">
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={isActive(item.href)}
                      onClick={() => handleNavClick(item.href)}
                      sx={{
                        borderRadius: 2,
                        mb: 0.75,
                        py: 1.25,
                        justifyContent: 'center',
                        color: 'text.primary',
                        '&:hover': {
                          bgcolor: 'rgba(0, 0, 0, 0.04)',
                        },
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
                      <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center' }}>
                        <item.icon sx={{ color: isActive(item.href) ? 'inherit' : 'text.secondary' }} />
                      </ListItemIcon>
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              ))}
            </List>
          )}
        </Box>
      </Drawer>
    </>
  );
}
