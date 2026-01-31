'use client';

import React from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import { Box, Typography } from '@mui/material';
import DataTable from '@/components/DataTable';

// Mock reviews data based on schema
const mockReviews = [
  {
    id: '1',
    product: 'Product 1',
    user: 'John Doe',
    rate: 5,
    comment: 'Excellent product! Very satisfied.',
    isCompleted: true,
    company: 'My Company',
  },
  {
    id: '2',
    product: 'Product 2',
    user: 'Jane Smith',
    rate: 4,
    comment: 'Good quality, fast shipping.',
    isCompleted: true,
    company: 'My Company',
  },
  {
    id: '3',
    product: 'Product 3',
    user: 'Bob Johnson',
    rate: 3,
    comment: 'Average product, could be better.',
    isCompleted: false,
    company: 'My Company',
  },
];

export default function ReviewsPage() {
  const columns = [
    {
      id: 'product',
      label: 'Product',
      sortable: true,
      render: (review: any) => review.product,
    },
    {
      id: 'user',
      label: 'User',
      sortable: true,
      render: (review: any) => review.user,
    },
    {
      id: 'rate',
      label: 'Rating',
      sortable: true,
      numeric: true,
      render: (review: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2">{review.rate}</Typography>
          <Typography variant="body2" color="warning.main">★</Typography>
        </Box>
      ),
    },
    {
      id: 'comment',
      label: 'Comment',
      sortable: false,
      render: (review: any) => (
        <Typography variant="body2" sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {review.comment}
        </Typography>
      ),
    },
    {
      id: 'isCompleted',
      label: 'Status',
      sortable: true,
      render: (review: any) => (
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            bgcolor: review.isCompleted ? 'success.light' : 'warning.light',
            color: review.isCompleted ? 'success.dark' : 'warning.dark',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'inline-block',
          }}
        >
          {review.isCompleted ? 'Completed' : 'Pending'}
        </Box>
      ),
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
          Reviews
        </Typography>
        <DataTable
          data={mockReviews}
          columns={columns}
          title=""
          searchPlaceholder="Search reviews..."
        />
      </Box>
    </SidebarLayout>
  );
}














