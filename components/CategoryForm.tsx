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
import FileUpload from './FileUpload';
import { mockCategories } from '@/lib/mockData';

// Mock industries for dropdown
const mockIndustries = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Fashion' },
  { id: '3', name: 'Food & Beverages' },
  { id: '4', name: 'Sports & Outdoors' },
];

interface CategoryFormData {
  name: string;
  industry: string;
  parentCategory: string;
  isActive: boolean;
  bannerImage: File | null;
  iconImage: File | null;
  icon: string;
}

interface CategoryFormProps {
  initialData?: Partial<CategoryFormData>;
  onFormSubmit: (data: CategoryFormData) => void;
}

export default function CategoryForm({ initialData, onFormSubmit }: CategoryFormProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: initialData?.name || '',
    industry: initialData?.industry || '',
    parentCategory: initialData?.parentCategory || '',
    isActive: initialData?.isActive ?? true,
    bannerImage: null,
    iconImage: null,
    icon: initialData?.icon || '',
  });

  const handleChange = (field: keyof CategoryFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSwitchChange = (field: keyof CategoryFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} id="category-form">
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Category Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Category Name"
            value={formData.name}
            onChange={handleChange('name')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Industry</InputLabel>
            <Select
              value={formData.industry}
              label="Industry"
              onChange={(e) => setFormData((prev) => ({ ...prev, industry: e.target.value }))}
            >
              {mockIndustries.map((industry) => (
                <MenuItem key={industry.id} value={industry.id}>
                  {industry.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Parent Category (Optional)</InputLabel>
            <Select
              value={formData.parentCategory}
              label="Parent Category (Optional)"
              onChange={(e) => setFormData((prev) => ({ ...prev, parentCategory: e.target.value }))}
            >
              <MenuItem value="">None</MenuItem>
              {mockCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Banner Image
          </Typography>
          <FileUpload
            label="Drop banner image here or click to upload"
            multiple={false}
            accept="image/*"
            onFileSelect={(files) => setFormData((prev) => ({ ...prev, bannerImage: files?.[0] || null }))}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, mt: 2 }}>
            Icon Image
          </Typography>
          <FileUpload
            label="Drop icon image here or click to upload"
            multiple={false}
            accept="image/*"
            onFileSelect={(files) => setFormData((prev) => ({ ...prev, iconImage: files?.[0] || null }))}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Icon (Text/Code)"
            placeholder="e.g., icon-name or icon code"
            helperText="Enter icon name or code"
            value={formData.icon}
            onChange={handleChange('icon')}
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

