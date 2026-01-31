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
  Button,
  Divider,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import FileUpload from './FileUpload';
import { mockCategories, mockProducts } from '@/lib/mockData';

// Mock product groups
const mockProductGroups = [
  { id: '1', name: 'Electronics Group' },
  { id: '2', name: 'Fashion Group' },
  { id: '3', name: 'Sports Group' },
];

interface PricingEntry {
  minOrderQuantity: number;
  price: number;
  discountPrice: number;
  discountPercentage: number;
  discountStartDate: string;
  discountEndDate: string;
}

interface ProductFormData {
  isVariant: boolean;
  variantOf: string;
  name: string;
  shortDescription: string;
  description: string;
  sku: string;
  keywords: string;
  group: string;
  category: string;
  productType: string;
  minOrderQuantity: number;
  maxOrderQuantity: number;
  stockQuantity: number;
  allowOutOfStockOrders: boolean;
  pricings: PricingEntry[];
  properties: Array<{ name: string; value: string }>;
}

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onFormSubmit?: (data: ProductFormData) => void;
  formId?: string;
}

export default function ProductForm({ initialData, onFormSubmit, formId = 'product-form' }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    isVariant: initialData?.isVariant ?? false,
    variantOf: initialData?.variantOf || '',
    name: initialData?.name || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    sku: initialData?.sku || '',
    keywords: initialData?.keywords || '',
    group: initialData?.group || '',
    category: initialData?.category || '',
    productType: initialData?.productType || '',
    minOrderQuantity: initialData?.minOrderQuantity || 1,
    maxOrderQuantity: initialData?.maxOrderQuantity || 100,
    stockQuantity: initialData?.stockQuantity || 0,
    allowOutOfStockOrders: initialData?.allowOutOfStockOrders ?? false,
    pricings: initialData?.pricings || [{
      minOrderQuantity: 1,
      price: 0,
      discountPrice: 0,
      discountPercentage: 0,
      discountStartDate: '',
      discountEndDate: '',
    }],
    properties: initialData?.properties || [{ name: '', value: '' }],
  });

  const handleChange = (field: keyof ProductFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: any; type?: string; checked?: boolean } }
  ) => {
    const target = 'target' in e ? e.target : e;
    const value = target.type === 'checkbox' ? (target as any).checked : target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSwitchChange = (field: keyof ProductFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const handlePropertyChange = (index: number, field: 'name' | 'value') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newProperties = [...formData.properties];
    newProperties[index] = { ...newProperties[index], [field]: e.target.value };
    setFormData((prev) => ({ ...prev, properties: newProperties }));
  };

  const addProperty = () => {
    setFormData((prev) => ({
      ...prev,
      properties: [...prev.properties, { name: '', value: '' }],
    }));
  };

  const removeProperty = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      properties: prev.properties.filter((_, i) => i !== index),
    }));
  };

  const handlePricingChange = (index: number, field: keyof PricingEntry) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: any; type?: string; checked?: boolean } }
  ) => {
    const target = 'target' in e ? e.target : e;
    const value = target.type === 'checkbox' ? (target as any).checked : target.value;
    const newPricings = [...formData.pricings];
    newPricings[index] = { ...newPricings[index], [field]: value };
    setFormData((prev) => ({ ...prev, pricings: newPricings }));
  };

  const addPricing = () => {
    setFormData((prev) => ({
      ...prev,
      pricings: [...prev.pricings, {
        minOrderQuantity: 1,
        price: 0,
        discountPrice: 0,
        discountPercentage: 0,
        discountStartDate: '',
        discountEndDate: '',
      }],
    }));
  };

  const removePricing = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pricings: prev.pricings.filter((_, i) => i !== index),
    }));
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
        {/* Basic Information */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Basic Information
          </Typography>
        </Grid>
        {/* Is Variant Switch */}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.isVariant}
                onChange={handleSwitchChange('isVariant')}
              />
            }
            label="Is Variant"
          />
        </Grid>
        {/* Variant Of - Only show when isVariant is true, at the top of all input fields */}
        {formData.isVariant && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Variant Of</InputLabel>
              <Select
                value={formData.variantOf}
                label="Variant Of"
                onChange={(e) => setFormData((prev) => ({ ...prev, variantOf: e.target.value }))}
              >
                {mockProducts.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {/* Product Name - Always in its normal position with other fields */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Product Name"
            value={formData.name}
            onChange={handleChange('name')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="SKU"
            value={formData.sku}
            onChange={handleChange('sku')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Product Group</InputLabel>
            <Select
              value={formData.group}
              label="Product Group"
              onChange={(e) => setFormData((prev) => ({ ...prev, group: e.target.value }))}
            >
              {mockProductGroups.map((group) => (
                <MenuItem key={group.id} value={group.id}>
                  {group.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              label="Category"
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
            >
              {mockCategories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Product Type</InputLabel>
            <Select
              value={formData.productType}
              label="Product Type"
              onChange={(e) => setFormData((prev) => ({ ...prev, productType: e.target.value }))}
            >
              <MenuItem value="physical">Physical</MenuItem>
              <MenuItem value="digital">Digital</MenuItem>
              <MenuItem value="service">Service</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Short Description"
            value={formData.shortDescription}
            onChange={handleChange('shortDescription')}
            multiline
            rows={2}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={handleChange('description')}
            multiline
            rows={4}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Keywords"
            value={formData.keywords}
            onChange={handleChange('keywords')}
            placeholder="Comma-separated keywords"
            helperText="Enter keywords separated by commas"
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Inventory Management */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Inventory Management
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
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
            label="Max Order Quantity"
            type="number"
            value={formData.maxOrderQuantity}
            onChange={handleChange('maxOrderQuantity')}
            inputProps={{ min: 1 }}
            required
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Stock Quantity"
            type="number"
            value={formData.stockQuantity}
            onChange={handleChange('stockQuantity')}
            inputProps={{ min: 0 }}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.allowOutOfStockOrders}
                onChange={handleSwitchChange('allowOutOfStockOrders')}
              />
            }
            label="Allow Out of Stock Orders"
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Pricing */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Pricing
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={addPricing}
              size="small"
              variant="outlined"
            >
              Add Pricing
            </Button>
          </Box>
        </Grid>
        {formData.pricings.map((pricing, index) => (
          <React.Fragment key={index}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Pricing Entry {index + 1}
                </Typography>
                <IconButton
                  onClick={() => removePricing(index)}
                  color="error"
                  size="small"
                  disabled={formData.pricings.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Min Order Quantity"
                type="number"
                value={pricing.minOrderQuantity}
                onChange={handlePricingChange(index, 'minOrderQuantity')}
                inputProps={{ min: 1 }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={pricing.price}
                onChange={handlePricingChange(index, 'price')}
                inputProps={{ min: 0, step: 0.01 }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Discount Price"
                type="number"
                value={pricing.discountPrice}
                onChange={handlePricingChange(index, 'discountPrice')}
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Discount Percentage"
                type="number"
                value={pricing.discountPercentage}
                onChange={handlePricingChange(index, 'discountPercentage')}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Discount Start Date"
                type="datetime-local"
                value={pricing.discountStartDate}
                onChange={handlePricingChange(index, 'discountStartDate')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Discount End Date"
                type="datetime-local"
                value={pricing.discountEndDate}
                onChange={handlePricingChange(index, 'discountEndDate')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            {index < formData.pricings.length - 1 && (
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>
            )}
          </React.Fragment>
        ))}

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Product Properties */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" fontWeight={600}>
              Product Properties
            </Typography>
            <Button
              startIcon={<AddIcon />}
              onClick={addProperty}
              size="small"
              variant="outlined"
            >
              Add Property
            </Button>
          </Box>
        </Grid>
        {formData.properties.map((property, index) => (
          <Grid item xs={12} key={index}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
              <TextField
                label="Property Name"
                value={property.name}
                onChange={handlePropertyChange(index, 'name')}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Property Value"
                value={property.value}
                onChange={handlePropertyChange(index, 'value')}
                sx={{ flex: 1 }}
              />
              <IconButton
                onClick={() => removeProperty(index)}
                color="error"
                disabled={formData.properties.length === 1}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Product Images */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Product Images
          </Typography>
          <FileUpload
            label="Drop product images here or click to upload"
            multiple={true}
            accept="image/*"
          />
        </Grid>

      </Grid>
    </Box>
  );
}

