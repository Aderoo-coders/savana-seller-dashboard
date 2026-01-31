'use client';

import React, { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import FullPageForm from '@/components/FullPageForm';
import ProductImageForm from '@/components/ProductImageForm';
import { mockProducts } from '@/lib/mockData';
import DataTable from '@/components/DataTable';
import { Box, Typography, Button, Avatar, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function ProductImagePage() {
  const products = mockProducts;
  const [showForm, setShowForm] = useState(false);
  
  // Flatten product images for table display
  const images = products.flatMap(product =>
    product.productImages.map(img => ({
      ...img,
      productName: product.name,
      productSku: product.sku,
    }))
  );

  const columns = [
    {
      id: 'product',
      label: 'Product',
      render: (item: any) => (
        <Box>
          <Box sx={{ fontWeight: 600 }}>{item.productName}</Box>
          <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{item.productSku}</Box>
        </Box>
      ),
      sortable: true,
    },
    {
      id: 'image',
      label: 'Image',
      render: (item: any) => (
        <Avatar
          src={item.url}
          alt={item.alt}
          variant="rounded"
          sx={{ width: 60, height: 60 }}
        />
      ),
      sortable: false,
    },
    {
      id: 'alt',
      label: 'Alt Text',
      render: (item: any) => item.alt,
      sortable: true,
    },
    {
      id: 'primary',
      label: 'Primary',
      render: (item: any) => (
        item.isPrimary ? <Chip label="Yes" color="success" size="small" /> : <Chip label="No" size="small" variant="outlined" />
      ),
      sortable: true,
    },
    {
      id: 'order',
      label: 'Order',
      render: (item: any) => item.order,
      numeric: true,
      sortable: true,
    },
  ];

  if (showForm) {
    return (
      <FullPageForm
        title="Upload Product Image"
        onCancel={() => setShowForm(false)}
        onSubmit={() => {
          const form = document.getElementById('product-image-form') as HTMLFormElement;
          if (form) {
            form.requestSubmit();
          }
        }}
        submitLabel="Upload Image"
      >
        <ProductImageForm
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
          Product Images
        </Typography>
        <DataTable
          data={images}
          columns={columns}
          title=""
          searchPlaceholder="Search images..."
          actionButton={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Upload Image
            </Button>
          }
        />
      </Box>
    </SidebarLayout>
  );
}

