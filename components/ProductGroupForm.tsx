'use client';

import React, { useState } from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';

interface ProductGroupFormData {
  name: string;
}

interface ProductGroupFormProps {
  initialData?: Partial<ProductGroupFormData>;
  onFormSubmit?: (data: ProductGroupFormData) => void;
  formId?: string;
}

export default function ProductGroupForm({ initialData, onFormSubmit, formId = 'product-group-form' }: ProductGroupFormProps) {
  const [formData, setFormData] = useState<ProductGroupFormData>({
    name: initialData?.name || '',
  });

  const handleChange = (field: keyof ProductGroupFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFormSubmit) {
      onFormSubmit(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} id={formId}>
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Product Group Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Group Name"
            value={formData.name}
            onChange={handleChange('name')}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
}

