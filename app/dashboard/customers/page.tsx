'use client';

import React from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import { mockOrders } from '@/lib/mockData';
import DataTable from '@/components/DataTable';
import { Box, Typography, Avatar } from '@mui/material';
import { AttachMoney, ShoppingBag } from '@mui/icons-material';

export default function CustomersPage() {
  const orders = mockOrders;

  // Create unique customers from orders
  const customers = Array.from(
    new Map(orders.map(order => [order.customerEmail, {
      name: order.customerName,
      email: order.customerEmail,
      orders: orders.filter(o => o.customerEmail === order.customerEmail),
    }])).values()
  );

  const columns = [
    {
      id: 'customer',
      label: 'Customer',
      render: (customer: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {customer.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Box sx={{ fontWeight: 600 }}>{customer.name}</Box>
            <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              ID: CUST-{String(customers.indexOf(customer) + 1).padStart(3, '0')}
            </Box>
          </Box>
        </Box>
      ),
      sortable: true,
      filterable: true,
      getFilterValue: (customer: any) => customer.name,
    },
    {
      id: 'email',
      label: 'Contact',
      render: (customer: any) => customer.email,
      sortable: true,
      filterable: true,
      getFilterValue: (customer: any) => customer.email,
    },
    {
      id: 'totalOrders',
      label: 'Total Orders',
      render: (customer: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShoppingBag fontSize="small" color="action" />
          {customer.orders.length}
        </Box>
      ),
      numeric: true,
      sortable: true,
      filterable: true,
      getFilterValue: (customer: any) => customer.orders.length.toString(),
    },
    {
      id: 'totalSpent',
      label: 'Total Spent',
      render: (customer: any) => {
        const total = customer.orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600, color: 'success.main' }}>
            <AttachMoney fontSize="small" />
            {total.toFixed(2)}
          </Box>
        );
      },
      numeric: true,
      sortable: true,
      filterable: true,
      getFilterValue: (customer: any) => {
        const total = customer.orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
        return total.toString();
      },
    },
    {
      id: 'lastOrder',
      label: 'Last Order',
      render: (customer: any) => {
        const lastOrder = customer.orders.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];
        return new Date(lastOrder.createdAt).toLocaleDateString();
      },
      sortable: true,
      filterable: true,
      getFilterValue: (customer: any) => {
        const lastOrder = customer.orders.sort((a: any, b: any) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];
        return new Date(lastOrder.createdAt).toLocaleDateString();
      },
    },
  ];

  return (
    <SidebarLayout>
      <Box sx={{ mb: 3, width: '100%' }}>
        <Typography 
          variant="h4" 
          fontWeight={700} 
          sx={{ 
            mb: { xs: 2, sm: 3 }, 
            fontSize: { xs: '1.5rem', sm: '2rem' }, 
            px: { xs: 1.5, sm: 2, md: 0 },
            color: 'text.primary',
            letterSpacing: '-0.02em',
          }}
        >
          Customers
        </Typography>
        <DataTable
          data={customers}
          columns={columns}
          title=""
          searchPlaceholder="Search customers..."
        />
      </Box>
    </SidebarLayout>
  );
}
