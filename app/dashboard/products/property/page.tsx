'use client';

import React, { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import FullPageForm from '@/components/FullPageForm';
import ProductPropertyForm from '@/components/ProductPropertyForm';
import { mockProducts } from '@/lib/mockData';
import DataTable from '@/components/DataTable';
import { Box, Typography, Button, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function ProductPropertyPage() {
  const products = mockProducts;
  const [showForm, setShowForm] = useState(false);
  
  // Flatten product properties for table display
  const properties = products.flatMap(product =>
    product.productProperties.map(prop => ({
      ...prop,
      productName: product.name,
    }))
  );

  const columns = [
    {
      id: 'product',
      label: 'Product',
      render: (item: any) => item.productName,
      sortable: true,
    },
    {
      id: 'name',
      label: 'Property Name',
      render: (item: any) => item.name,
      sortable: true,
    },
    {
      id: 'value',
      label: 'Value',
      render: (item: any) => item.value,
      sortable: true,
    },
    {
      id: 'type',
      label: 'Type',
      render: (item: any) => (
        <Chip label={item.type} size="small" color="primary" variant="outlined" />
      ),
      sortable: true,
    },
  ];

  if (showForm) {
    return (
      <FullPageForm
        title="Add Product Property"
        onCancel={() => setShowForm(false)}
        onSubmit={() => {
          const form = document.getElementById('product-property-form') as HTMLFormElement;
          if (form) {
            form.requestSubmit();
          }
        }}
        submitLabel="Save Property"
      >
        <ProductPropertyForm
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
          Product Properties
        </Typography>
        <DataTable
          data={properties}
          columns={columns}
          title=""
          searchPlaceholder="Search properties..."
          actionButton={
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Add Property
            </Button>
          }
        />
      </Box>
    </SidebarLayout>
  );
}

