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
  Switch,
  FormControlLabel,
} from '@mui/material';
import FileUpload from './FileUpload';
import { mockProducts } from '@/lib/mockData';

interface ProductImageFormData {
  product: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

interface ProductImageFormProps {
  initialData?: Partial<ProductImageFormData>;
  onFormSubmit: (data: ProductImageFormData) => void;
}

export default function ProductImageForm({ initialData, onFormSubmit }: ProductImageFormProps) {
  const [formData, setFormData] = useState<ProductImageFormData>({
    product: initialData?.product || '',
    alt: initialData?.alt || '',
    isPrimary: initialData?.isPrimary ?? false,
    order: initialData?.order || 1,
  });

  const handleChange = (field: keyof ProductImageFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (field: keyof ProductImageFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} id="product-image-form">
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Product Image Information
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
        <Grid item xs={12}>
          <FileUpload
            label="Drop image here or click to upload"
            multiple={false}
            accept="image/*"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Alt Text"
            value={formData.alt}
            onChange={handleChange('alt')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Order"
            type="number"
            value={formData.order}
            onChange={handleChange('order')}
            inputProps={{ min: 1 }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isPrimary}
                onChange={handleSwitchChange('isPrimary')}
              />
            }
            label="Set as Primary Image"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

