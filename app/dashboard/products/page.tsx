'use client';

import React, { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import FullPageForm from '@/components/FullPageForm';
import DataTable from '@/components/DataTable';
import ProductForm from '@/components/ProductForm';
import { mockProducts } from '@/lib/mockData';
import { Box, Avatar, Chip, IconButton, Button } from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

export default function ProductsPage() {
  const products = mockProducts;
  const [showForm, setShowForm] = useState(false);

  const columns = [
    {
      id: 'product',
      label: 'Name',
      render: (product: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            src={product.productImages[0]?.url}
            alt={product.name}
            variant="rounded"
            sx={{ width: 50, height: 50 }}
          />
          <Box>
            <Box sx={{ fontWeight: 600 }}>{product.name}</Box>
            <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{product.sku}</Box>
          </Box>
        </Box>
      ),
      sortable: true,
      filterable: true,
      getFilterValue: (product: any) => `${product.name} ${product.sku}`,
    },
    {
      id: 'category',
      label: 'Category',
      render: (product: any) => product.category.name,
      sortable: true,
      filterable: true,
      filterType: 'select' as const,
      filterOptions: Array.from(new Set(mockProducts.map(p => p.category.name))).map(cat => ({
        label: cat,
        value: cat,
      })),
      getFilterValue: (product: any) => product.category.name,
    },
    {
      id: 'price',
      label: 'Price',
      render: (product: any) => (
        <Box>
          <Box sx={{ fontWeight: 600 }}>
            ${product.productPricing.basePrice.toFixed(2)}
          </Box>
          {product.productPricing.compareAtPrice && (
            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', textDecoration: 'line-through' }}>
              ${product.productPricing.compareAtPrice.toFixed(2)}
            </Box>
          )}
        </Box>
      ),
      numeric: true,
      sortable: true,
      filterable: true,
      getFilterValue: (product: any) => product.productPricing.basePrice.toString(),
    },
    {
      id: 'status',
      label: 'Published',
      render: (product: any) => {
        const statusConfig: { [key: string]: { label: string; color: 'success' | 'warning' | 'error' | 'default' } } = {
          active: { label: 'Published', color: 'success' },
          draft: { label: 'Draft', color: 'default' },
          out_of_stock: { label: 'Out of Stock', color: 'error' },
          archived: { label: 'Archived', color: 'warning' },
        };
        const config = statusConfig[product.status] || statusConfig.draft;
        return <Chip label={config.label} color={config.color} size="small" />;
      },
      sortable: true,
      filterable: true,
      filterType: 'select' as const,
      filterOptions: [
        { label: 'Published', value: 'active' },
        { label: 'Draft', value: 'draft' },
        { label: 'Out of Stock', value: 'out_of_stock' },
        { label: 'Archived', value: 'archived' },
      ],
      getFilterValue: (product: any) => product.status,
    },
    {
      id: 'actions',
      label: 'Action',
      render: (product: any) => (
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
      <FullPageForm
        title="Add Product"
        onCancel={() => setShowForm(false)}
        onSubmit={() => {
          const form = document.getElementById('product-form') as HTMLFormElement;
          if (form) {
            form.requestSubmit();
          }
        }}
        submitLabel="Save Product"
      >
        <ProductForm
          formId="product-form"
          onFormSubmit={(data) => {
            setShowForm(false);
          }}
        />
      </FullPageForm>
    );
  }

  return (
    <SidebarLayout>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ typography: { xs: 'h5', sm: 'h4' }, fontWeight: 600, mb: { xs: 2, sm: 3 } }}>Product List</Box>
        <DataTable
          data={products}
          columns={columns}
          title=""
          searchPlaceholder="Search products..."
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
              Add Product
            </Button>
          }
        />
      </Box>
    </SidebarLayout>
  );
}
