'use client';

import React, { useMemo, useState } from 'react';
import { Box, Grid, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Button, Typography } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { mockProducts } from '@/lib/mockData';

interface OrderItem {
  productId: string;
  quantity: number;
}

interface OrderFormData {
  paymentMethod: string;
  status: string;
  items: OrderItem[];
  notes?: string;
}

interface OrderFormProps {
  initialData?: Partial<OrderFormData>;
  onFormSubmit?: (data: OrderFormData) => void;
  formId?: string;
}

const paymentMethods = [
  { value: 'card', label: 'Card' },
  { value: 'cod', label: 'Cash on Delivery' },
  { value: 'bank', label: 'Bank Transfer' },
];

const orderStatuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function OrderForm({ initialData, onFormSubmit, formId = 'order-form' }: OrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    paymentMethod: initialData?.paymentMethod || 'card',
    status: initialData?.status || 'pending',
    items: initialData?.items || [{ productId: mockProducts[0]?.id ?? '', quantity: 1 }],
    notes: initialData?.notes || '',
  });

  const handleChange = (field: keyof OrderFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: any } }
  ) => {
    const value = (e as any).target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index: number, field: keyof OrderItem) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: any } }
  ) => {
    const value = field === 'quantity' ? Math.max(1, parseInt((e as any).target.value || '1', 10)) : (e as any).target.value;
    setFormData((prev) => {
      const next = [...prev.items];
      next[index] = { ...next[index], [field]: value } as OrderItem;
      return { ...prev, items: next };
    });
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { productId: mockProducts[0]?.id ?? '', quantity: 1 }],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const totals = useMemo(() => {
    const items = formData.items.map((it) => {
      const product = mockProducts.find((p: any) => p.id === it.productId);
      const price = product?.productPricing?.basePrice ?? 0;
      const lineTotal = price * it.quantity;
      return { ...it, price, lineTotal };
    });
    const subTotal = items.reduce((acc, it) => acc + it.lineTotal, 0);
    return { items, subTotal };
  }, [formData.items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit?.(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} id={formId}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={formData.paymentMethod}
              label="Payment Method"
              onChange={handleChange('paymentMethod')}
            >
              {paymentMethods.map((pm) => (
                <MenuItem key={pm.value} value={pm.value}>{pm.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={handleChange('status')}
            >
              {orderStatuses.map((s) => (
                <MenuItem key={s.value} value={s.value}>{s.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" fontWeight={600}>Items</Typography>
            <Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={addItem}>Add Item</Button>
          </Box>
          {formData.items.map((item, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
              <Grid item xs={12} md={7}>
                <FormControl fullWidth>
                  <InputLabel>Product</InputLabel>
                  <Select
                    value={item.productId}
                    label="Product"
                    onChange={handleItemChange(index, 'productId')}
                  >
                    {mockProducts.map((p: any) => (
                      <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8} md={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  inputProps={{ min: 1 }}
                  onChange={handleItemChange(index, 'quantity')}
                />
              </Grid>
              <Grid item xs={4} md={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <IconButton color="error" onClick={() => removeItem(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Notes (optional)"
            value={formData.notes}
            onChange={handleChange('notes')}
            multiline
            rows={3}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3, mt: 1, fontWeight: 700 }}>
            <Box>Subtotal: {totals.subTotal.toFixed(2)}</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}



