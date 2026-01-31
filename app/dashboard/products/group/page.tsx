'use client';

import React, { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import FullPageForm from '@/components/FullPageForm';
import DataTable from '@/components/DataTable';
import ProductGroupForm from '@/components/ProductGroupForm';
import { mockProductGroups } from '@/lib/mockData';
import { Box, Chip, IconButton, Button } from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

export default function ProductGroupPage() {
  const [showForm, setShowForm] = useState(false);
  const productGroups = mockProductGroups;

  const columns = [
    {
      id: 'name',
      label: 'Group Name',
      render: (group: any) => (
        <Box sx={{ fontWeight: 600 }}>{group.name}</Box>
      ),
      sortable: true,
      filterable: true,
      getFilterValue: (group: any) => group.name,
    },
    {
      id: 'company',
      label: 'Company',
      render: (group: any) => group.company.name,
      sortable: true,
      filterable: true,
      filterType: 'select' as const,
      filterOptions: Array.from(new Set(mockProductGroups.map(g => g.company.name))).map(company => ({
        label: company,
        value: company,
      })),
      getFilterValue: (group: any) => group.company.name,
    },
    {
      id: 'productCount',
      label: 'Products',
      render: (group: any) => (
        <Chip 
          label={group.productCount} 
          size="small" 
          color="primary" 
          variant="outlined"
        />
      ),
      numeric: true,
      sortable: true,
      filterable: true,
      getFilterValue: (group: any) => group.productCount.toString(),
    },
    {
      id: 'createdAt',
      label: 'Created At',
      render: (group: any) => new Date(group.createdAt).toLocaleDateString(),
      sortable: true,
      filterable: false,
    },
    {
      id: 'actions',
      label: 'Action',
      render: (group: any) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" color="primary">
            <ViewIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
      sortable: false,
    },
  ];

  if (showForm) {
    return (
      <SidebarLayout>
        <FullPageForm
          title="Add Product Group"
          onCancel={() => {
            if (typeof window !== 'undefined') {
              window.history.back();
            }
          }}
          onSubmit={() => {
            const form = document.getElementById('product-group-form') as HTMLFormElement;
            if (form) {
              form.requestSubmit();
            }
          }}
          submitLabel="Save Group"
        >
          <ProductGroupForm
            formId="product-group-form"
            onFormSubmit={(data) => {
              // Redirect to product groups list after successful submission
              if (typeof window !== 'undefined') {
                window.location.href = '/dashboard/products/group';
              }
            }}
          />
        </FullPageForm>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ typography: { xs: 'h5', sm: 'h4' }, fontWeight: 600, mb: { xs: 2, sm: 3 } }}>
          Product Groups
        </Box>
        <DataTable
          data={productGroups}
          columns={columns}
          title=""
          searchPlaceholder="Search product groups..."
          actionButton={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': { bgcolor: 'primary.dark' },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              Add Group
            </Button>
          }
        />
      </Box>
    </SidebarLayout>
  );
}

