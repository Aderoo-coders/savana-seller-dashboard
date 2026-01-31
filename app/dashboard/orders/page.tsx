'use client';

import React from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import DataTable from '@/components/DataTable';
import { mockOrders } from '@/lib/mockData';
import { Box, Chip, IconButton, Button } from '@mui/material';
import {
  Download as DownloadIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const orders = mockOrders;
  const router = useRouter();

  const columns = [
    {
      id: 'orderNumber',
      label: 'Order',
      render: (order: any) => order.orderNumber,
      sortable: true,
      filterable: true,
      getFilterValue: (order: any) => order.orderNumber,
    },
    {
      id: 'customer',
      label: 'Customer',
      render: (order: any) => (
        <Box>
          <Box sx={{ fontWeight: 600 }}>{order.customerName}</Box>
          <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{order.customerEmail}</Box>
        </Box>
      ),
      sortable: true,
      filterable: true,
      getFilterValue: (order: any) => `${order.customerName} ${order.customerEmail}`,
    },
    {
      id: 'items',
      label: 'Items',
      render: (order: any) => `${order.orderItems.length} item(s)`,
      numeric: true,
      sortable: true,
      filterable: true,
      getFilterValue: (order: any) => order.orderItems.length.toString(),
    },
    {
      id: 'status',
      label: 'Status',
      render: (order: any) => {
        const statusConfig: { [key: string]: { label: string; color: any } } = {
          pending: { label: 'Pending', color: 'warning' },
          processing: { label: 'Processing', color: 'info' },
          shipped: { label: 'Shipped', color: 'secondary' },
          delivered: { label: 'Delivered', color: 'success' },
          cancelled: { label: 'Cancelled', color: 'error' },
          refunded: { label: 'Refunded', color: 'default' },
        };
        const config = statusConfig[order.status] || statusConfig.pending;
        return <Chip label={config.label} color={config.color} size="small" />;
      },
      sortable: true,
      filterable: true,
      filterType: 'select' as const,
      filterOptions: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Refunded', value: 'refunded' },
      ],
      getFilterValue: (order: any) => order.status,
    },
    {
      id: 'amount',
      label: 'Total',
      render: (order: any) => (
        <Box sx={{ fontWeight: 600 }}>
          {order.currency} {order.totalAmount.toFixed(2)}
        </Box>
      ),
      numeric: true,
      sortable: true,
      filterable: true,
      getFilterValue: (order: any) => order.totalAmount.toString(),
    },
    {
      id: 'date',
      label: 'Date',
      render: (order: any) => new Date(order.createdAt).toLocaleDateString(),
      sortable: true,
      filterable: true,
      getFilterValue: (order: any) => new Date(order.createdAt).toLocaleDateString(),
    },
    {
      id: 'actions',
      label: 'Action',
      render: (order: any) => (
        <IconButton size="small" color="primary">
          <ViewIcon fontSize="small" />
        </IconButton>
      ),
      sortable: false,
    },
  ];

  return (
    <SidebarLayout>
      <Box sx={{ mb: 3, width: '100%' }}>
        <Box sx={{ 
          typography: { xs: 'h5', sm: 'h4' }, 
          fontWeight: 700, 
          mb: { xs: 2, sm: 3 }, 
          px: { xs: 1.5, sm: 2, md: 0 },
          color: 'text.primary',
          letterSpacing: '-0.02em',
        }}>
          Orders
        </Box>
        <DataTable
          data={orders}
          columns={columns}
          title=""
          searchPlaceholder="Search orders..."
          actionButton={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" size="small" onClick={() => router.push('/dashboard/orders/add')}>
                Create Order
              </Button>
              <IconButton color="primary">
                <DownloadIcon />
              </IconButton>
            </Box>
          }
        />
      </Box>
    </SidebarLayout>
  );
}
