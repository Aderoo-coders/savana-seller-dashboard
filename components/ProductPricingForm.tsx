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
  Switch,
  FormControlLabel,
  Typography,
} from '@mui/material';
import { mockProducts } from '@/lib/mockData';

interface ProductPricingFormData {
  product: string;
  minOrderQuantity: number;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  discountStartDate: string;
  discountEndDate: string;
  isActive: boolean;
}

interface ProductPricingFormProps {
  initialData?: Partial<ProductPricingFormData>;
  onFormSubmit: (data: ProductPricingFormData) => void;
}

export default function ProductPricingForm({ initialData, onFormSubmit }: ProductPricingFormProps) {
  const [formData, setFormData] = useState<ProductPricingFormData>({
    product: initialData?.product || '',
    minOrderQuantity: initialData?.minOrderQuantity || 1,
    price: initialData?.price || 0,
    discountPrice: initialData?.discountPrice || 0,
    discountPercentage: initialData?.discountPercentage || 0,
    discountStartDate: initialData?.discountStartDate || '',
    discountEndDate: initialData?.discountEndDate || '',
    isActive: initialData?.isActive ?? true,
  });

  const handleChange = (field: keyof ProductPricingFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: any; type?: string; checked?: boolean } }
  ) => {
    const target = e.target as { value: any; type?: string; checked?: boolean };
    const value = target.type === 'checkbox'
      ? target.checked
      : target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (field: keyof ProductPricingFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} id="product-pricing-form">
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Product Pricing Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
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
            label="Min Order Quantity"
            type="number"
            value={formData.minOrderQuantity}
            onChange={handleChange('minOrderQuantity')}
            inputProps={{ min: 1 }}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange('price')}
            inputProps={{ min: 0, step: 0.01 }}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Discount Price"
            type="number"
            value={formData.discountPrice}
            onChange={handleChange('discountPrice')}
            inputProps={{ min: 0, step: 0.01 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Discount Percentage"
            type="number"
            value={formData.discountPercentage}
            onChange={handleChange('discountPercentage')}
            inputProps={{ min: 0, max: 100 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Discount Start Date"
            type="datetime-local"
            value={formData.discountStartDate}
            onChange={handleChange('discountStartDate')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Discount End Date"
            type="datetime-local"
            value={formData.discountEndDate}
            onChange={handleChange('discountEndDate')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isActive}
                onChange={handleSwitchChange('isActive')}
              />
            }
            label="Is Active"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

