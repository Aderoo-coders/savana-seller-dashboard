'use client';

import React from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import DashboardCard from '@/components/DashboardCard';
import { mockDashboardStats } from '@/lib/mockData';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Avatar,
  Button,
  Stack,
  Grid,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';

// ✅ FIX: Import valid icon names individually
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const router = useRouter();
  const [chartMenuAnchor, setChartMenuAnchor] = React.useState<null | HTMLElement>(null);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' } = {
      pending: 'warning',
      processing: 'info',
      shipped: 'secondary',
      delivered: 'success',
      cancelled: 'error',
      refunded: 'default',
    };
    return colors[status] || 'default';
  };

  const handleChartMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setChartMenuAnchor(event.currentTarget);
  };

  const handleChartMenuClose = () => {
    setChartMenuAnchor(null);
  };

  // Mock sales data for the last 7 days
  const salesData = [
    { day: 'Mon', sales: 3200, orders: 12 },
    { day: 'Tue', sales: 2800, orders: 10 },
    { day: 'Wed', sales: 4500, orders: 18 },
    { day: 'Thu', sales: 3800, orders: 15 },
    { day: 'Fri', sales: 5200, orders: 22 },
    { day: 'Sat', sales: 6100, orders: 28 },
    { day: 'Sun', sales: 4800, orders: 20 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <SidebarLayout>
      <Box sx={{ width: '100%' }}>
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 4 } }}>
          <Typography 
            variant="h4" 
            fontWeight={700} 
            sx={{ 
              mb: 0.5,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }, 
              color: 'text.primary',
              letterSpacing: '-0.02em',
            }}
          >
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back! Here's what's happening with your business today.
          </Typography>
        </Box>

        {/* Main Stats Grid - 4 columns */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, sm: 3 },
            mb: { xs: 3, md: 4 },
          }}
        >
          <DashboardCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString('en-US', {
              minimumFractionDigits: 2,
            })}`}
            icon={AttachMoneyIcon}
            trend={{ value: 15, isPositive: true }}
          />
          <DashboardCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingBagIcon}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="Total Products"
            value={stats.totalProducts}
            icon={InventoryIcon}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="Pending Orders"
            value={stats.pendingOrders}
            icon={AccessTimeIcon}
            trend={{ value: -5, isPositive: false }}
          />
        </Box>

        {/* Additional Stats - 3 columns */}
        <Grid container spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard
              title="Low Stock"
              value={stats.lowStockProducts}
              icon={WarningIcon}
              trend={{ value: 2, isPositive: false }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper 
              sx={{ 
                p: { xs: 2, sm: 2.5 },
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 2, 
                  bgcolor: 'success.light',
                  background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '1px solid',
                  borderColor: 'success.light',
                }}>
                  <PeopleIcon sx={{ color: 'success.main', fontSize: 26 }} />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                Total Customers
              </Typography>
              <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>
                1,234
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUpIcon sx={{ fontSize: 14, color: 'success.main' }} />
                <Typography component="span" sx={{ color: 'success.main', fontWeight: 600 }}>
                  +12%
                </Typography>
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  vs last month
                </Typography>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper 
              sx={{ 
                p: { xs: 2, sm: 2.5 },
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 2, 
                  bgcolor: 'info.light',
                  background: 'linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0.05) 100%)',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '1px solid',
                  borderColor: 'info.light',
                }}>
                  <ShoppingBagIcon sx={{ color: 'info.main', fontSize: 26 }} />
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                Avg Order Value
              </Typography>
              <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}>
                $290.15
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUpIcon sx={{ fontSize: 14, color: 'success.main' }} />
                <Typography component="span" sx={{ color: 'success.main', fontWeight: 600 }}>
                  +5%
                </Typography>
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  vs last month
                </Typography>
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Sales Chart and Top Products - Two Column Layout */}
        <Grid container spacing={3} sx={{ mb: { xs: 3, md: 4 } }}>
          {/* Sales Chart */}
          <Grid item xs={12} lg={8}>
            <Paper 
              sx={{ 
                p: { xs: 2, sm: 3 },
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                    Sales Overview
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last 7 days sales performance
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={handleChartMenuOpen}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={chartMenuAnchor}
                  open={Boolean(chartMenuAnchor)}
                  onClose={handleChartMenuClose}
                >
                  <MenuItem onClick={handleChartMenuClose}>
                    <DownloadIcon sx={{ mr: 1, fontSize: 20 }} />
                    Export Data
                  </MenuItem>
                </Menu>
              </Box>
              
              {/* Simple Bar Chart */}
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 200, mb: 2 }}>
                  {salesData.map((data, index) => (
                    <Box key={index} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: '100%',
                          height: `${(data.sales / maxSales) * 100}%`,
                          bgcolor: 'primary.main',
                          borderRadius: '4px 4px 0 0',
                          mb: 1,
                          minHeight: 20,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: 'primary.dark',
                            transform: 'scaleY(1.05)',
                          },
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 600 }}>
                        ${(data.sales / 1000).toFixed(1)}k
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6875rem', mt: 0.5 }}>
                        {data.day}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Top Products */}
          <Grid item xs={12} lg={4}>
            <Paper 
              sx={{ 
                p: { xs: 2, sm: 3 },
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                  Top Products
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => router.push('/dashboard/products')}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '0.8125rem',
                  }}
                >
                  View All
                </Button>
              </Box>
              
              <Stack spacing={2.5}>
                {stats.topProducts.map((product, index) => (
                  <Box key={product.productId}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" fontWeight={600} sx={{ flex: 1, fontSize: '0.875rem' }}>
                        {product.productName}
                      </Typography>
                      <Typography variant="body2" fontWeight={700} color="primary.main">
                        ${product.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {product.ordersCount} orders
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        #{index + 1}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={(product.revenue / stats.topProducts[0].revenue) * 100} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                        },
                      }} 
                    />
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Recent Orders */}
        <Paper 
          sx={{ 
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}>
              Recent Orders
            </Typography>
            <Button
              variant="text"
              endIcon={<ArrowForwardIcon />}
              onClick={() => router.push('/dashboard/orders')}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              View All
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.secondary', py: 2 }}>
                    Order
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.secondary', py: 2 }}>
                    Customer
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.secondary', py: 2 }}>
                    Status
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.secondary', py: 2 }}>
                    Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem', color: 'text.secondary', py: 2 }}>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.recentOrders.map((order) => (
                  <TableRow 
                    key={order.id} 
                    hover
                    sx={{
                      '&:hover': {
                        bgcolor: 'action.hover',
                      },
                      '&:last-child td': {
                        borderBottom: 'none',
                      },
                    }}
                  >
                    <TableCell sx={{ py: 2.5, fontWeight: 600 }}>
                      {order.orderNumber}
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: 'primary.main',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                          }}
                        >
                          {order.customerName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                          {order.customerName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip 
                        label={order.status.charAt(0).toUpperCase() + order.status.slice(1)} 
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ 
                          fontWeight: 600,
                          textTransform: 'capitalize',
                        }}
                      />
                    </TableCell>
                    <TableCell align="right" sx={{ py: 2.5, fontWeight: 700, color: 'text.primary' }}>
                      {order.currency} {order.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ py: 2.5, color: 'text.secondary' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </SidebarLayout>
  );
}
