'use client';

import React, { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import FullPageForm from '@/components/FullPageForm';
import CategoryForm from '@/components/CategoryForm';
import { mockCategories } from '@/lib/mockData';
import DataTable from '@/components/DataTable';
import { Box, Typography, Button, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

export default function CategoriesPage() {
  const categories = mockCategories;
  const [showForm, setShowForm] = useState(false);

  const columns = [
    {
      id: 'name',
      label: 'Category Name',
      render: (category: any) => category.name,
      sortable: true,
    },
    {
      id: 'slug',
      label: 'Slug',
      render: (category: any) => category.slug,
      sortable: true,
    },
    {
      id: 'description',
      label: 'Description',
      render: (category: any) => category.description || '-',
      sortable: true,
    },
    {
      id: 'productCount',
      label: 'Products',
      render: (category: any) => (
        <Chip label={category.productCount} color="primary" size="small" />
      ),
      numeric: true,
      sortable: true,
    },
  ];

  if (showForm) {
    return (
      <FullPageForm
        title="Add Category"
        onCancel={() => setShowForm(false)}
        onSubmit={() => {
          const form = document.getElementById('category-form') as HTMLFormElement;
          if (form) {
            form.requestSubmit();
          }
        }}
        submitLabel="Save Category"
      >
        <CategoryForm
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
          Categories
        </Typography>
        <DataTable
          data={categories}
          columns={columns}
          title=""
          searchPlaceholder="Search categories..."
          actionButton={
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => setShowForm(true)}
              sx={{ width: { xs: '100%', sm: 'auto' } }}
            >
              Add Category
            </Button>
          }
        />
      </Box>
    </SidebarLayout>
  );
}
