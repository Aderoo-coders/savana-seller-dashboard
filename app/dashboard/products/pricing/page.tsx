'use client';

import React, { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import FullPageForm from '@/components/FullPageForm';
import ProductPricingForm from '@/components/ProductPricingForm';
import { mockProducts } from '@/lib/mockData';
import DataTable from '@/components/DataTable';
import { Box, Typography, Button, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function ProductPricingPage() {
  const products = mockProducts;
  const [showForm, setShowForm] = useState(false);

  const columns = [
    {
      id: 'product',
      label: 'Product',
      render: (product: any) => product.name,
      sortable: true,
    },
    {
      id: 'basePrice',
      label: 'Base Price',
      render: (product: any) => `$${product.productPricing.basePrice.toFixed(2)}`,
      numeric: true,
      sortable: true,
    },
    {
      id: 'comparePrice',
      label: 'Compare Price',
      render: (product: any) =>
        product.productPricing.compareAtPrice
          ? `$${product.productPricing.compareAtPrice.toFixed(2)}`
          : '-',
      numeric: true,
      sortable: true,
    },
    {
      id: 'costPrice',
      label: 'Cost Price',
      render: (product: any) => `$${product.productPricing.costPrice.toFixed(2)}`,
      numeric: true,
      sortable: true,
    },
    {
      id: 'currency',
      label: 'Currency',
      render: (product: any) => (
        <Chip label={product.productPricing.currency} size="small" />
      ),
      sortable: true,
    },
  ];

  if (showForm) {
    return (
      <FullPageForm
        title="Add Product Pricing"
        onCancel={() => setShowForm(false)}
        onSubmit={() => {
          const form = document.getElementById('product-pricing-form') as HTMLFormElement;
          if (form) {
            form.requestSubmit();
          }
        }}
        submitLabel="Save Pricing"
      >
        <ProductPricingForm
          onFormSubmit={(data) => {
            setShowForm(false);
          }}
        />
      </FullPageForm>
    );
  }

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
          Product Pricing
        </Typography>
        <DataTable
          data={products}
          columns={columns}
          title=""
          searchPlaceholder="Search pricing..."
          actionButton={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Add Pricing
            </Button>
          }
        />
      </Box>
    </SidebarLayout>
  );
}

