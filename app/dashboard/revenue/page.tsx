'use client';

import React from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import { mockOrders } from '@/lib/mockData';
import DataTable from '@/components/DataTable';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalanceWallet, Payment } from '@mui/icons-material';

export default function RevenuePage() {
  const orders = mockOrders;

  const totalRevenue = orders.reduce((sum, order) => {
    if (order.status !== 'cancelled' && order.status !== 'refunded') {
      return sum + order.totalAmount;
    }
    return sum;
  }, 0);

  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  const columns = [
    {
      id: 'orderNumber',
      label: 'Order',
      render: (order: any) => order.orderNumber,
      sortable: true,
    },
    {
      id: 'customer',
      label: 'Customer',
      render: (order: any) => order.customerName,
      sortable: true,
    },
    {
      id: 'amount',
      label: 'Amount',
      render: (order: any) => (
        <Box sx={{ fontWeight: 600 }}>
          ${order.totalAmount.toFixed(2)}
        </Box>
      ),
      numeric: true,
      sortable: true,
    },
    {
      id: 'status',
      label: 'Status',
      render: (order: any) => {
        const statusColors: { [key: string]: any } = {
          pending: 'warning',
          processing: 'info',
          shipped: 'secondary',
          delivered: 'success',
          cancelled: 'error',
          refunded: 'default',
        };
        return <Chip label={order.status} color={statusColors[order.status]} size="small" />;
      },
      sortable: true,
    },
    {
      id: 'date',
      label: 'Date',
      render: (order: any) => new Date(order.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <SidebarLayout>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Revenue
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <Paper sx={{ p: 3, boxShadow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'success.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AccountBalanceWallet sx={{ color: 'success.main' }} />
            </Box>
            <TrendingUp sx={{ color: 'success.main' }} />
          </Box>
          <Typography variant="body2" color="text.secondary" mb={1}>Total Revenue</Typography>
          <Typography variant="h4" fontWeight={700}>
            ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Typography>
          <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            ↑ 15% from last month
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, boxShadow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Payment sx={{ color: 'primary.main' }} />
            </Box>
            <TrendingUp sx={{ color: 'primary.main' }} />
          </Box>
          <Typography variant="body2" color="text.secondary" mb={1}>Avg Order Value</Typography>
          <Typography variant="h4" fontWeight={700}>${avgOrderValue.toFixed(2)}</Typography>
          <Typography variant="caption" color="primary.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            ↑ 5% from last month
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, boxShadow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'secondary.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp sx={{ color: 'secondary.main' }} />
            </Box>
            <TrendingUp sx={{ color: 'secondary.main' }} />
          </Box>
          <Typography variant="body2" color="text.secondary" mb={1}>Revenue Growth</Typography>
          <Typography variant="h4" fontWeight={700}>15.2%</Typography>
          <Typography variant="caption" color="secondary.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            ↑ 3% from last month
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, boxShadow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: 'warning.light', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AccountBalanceWallet sx={{ color: 'warning.main' }} />
            </Box>
            <TrendingDown sx={{ color: 'warning.main' }} />
          </Box>
          <Typography variant="body2" color="text.secondary" mb={1}>Pending Payouts</Typography>
          <Typography variant="h4" fontWeight={700}>
            ${(totalRevenue * 0.15).toFixed(2)}
          </Typography>
          <Typography variant="caption" color="warning.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            ↓ 2% from last month
          </Typography>
        </Paper>
      </Box>

      <DataTable
        data={orders.slice(0, 10)}
        columns={columns}
        title="Transaction History"
        searchPlaceholder="Search transactions..."
      />
    </SidebarLayout>
  );
}
