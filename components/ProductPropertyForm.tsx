'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { mockProducts } from '@/lib/mockData';

interface ProductPropertyFormData {
  product: string;
  name: string;
  value: string;
}

interface ProductPropertyFormProps {
  initialData?: Partial<ProductPropertyFormData>;
  onFormSubmit: (data: ProductPropertyFormData) => void;
}

export default function ProductPropertyForm({ initialData, onFormSubmit }: ProductPropertyFormProps) {
  const [formData, setFormData] = useState<ProductPropertyFormData>({
    product: initialData?.product || '',
    name: initialData?.name || '',
    value: initialData?.value || '',
  });

  const handleChange = (field: keyof ProductPropertyFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} id="product-property-form">
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Product Property Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Product</InputLabel>
            <Select
              value={formData.product}
              label="Product"
              onChange={(e) => setFormData((prev) => ({ ...prev, product: e.target.value }))}
            >
              {mockProducts.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Property Name"
            value={formData.name}
            onChange={handleChange('name')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Property Value"
            value={formData.value}
            onChange={handleChange('value')}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
}

