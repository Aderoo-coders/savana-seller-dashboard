'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';

interface AddressFormData {
  country: string;
  city: string;
  subAdmin: string;
  subAdmin2: string;
  locality: string;
  subLocality: string;
  homeAddress: string;
  lat: string;
  lng: string;
}

interface AddressFormProps {
  initialData?: Partial<AddressFormData>;
  onFormSubmit: (data: AddressFormData) => void;
}

export default function AddressForm({ initialData, onFormSubmit }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressFormData>({
    country: initialData?.country || '',
    city: initialData?.city || '',
    subAdmin: initialData?.subAdmin || '',
    subAdmin2: initialData?.subAdmin2 || '',
    locality: initialData?.locality || '',
    subLocality: initialData?.subLocality || '',
    homeAddress: initialData?.homeAddress || '',
    lat: initialData?.lat || '',
    lng: initialData?.lng || '',
  });

  const handleChange = (field: keyof AddressFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} id="address-form">
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Address Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Country"
            value={formData.country}
            onChange={handleChange('country')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="City"
            value={formData.city}
            onChange={handleChange('city')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Sub Admin"
            value={formData.subAdmin}
            onChange={handleChange('subAdmin')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Sub Admin 2"
            value={formData.subAdmin2}
            onChange={handleChange('subAdmin2')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Locality"
            value={formData.locality}
            onChange={handleChange('locality')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Sub Locality"
            value={formData.subLocality}
            onChange={handleChange('subLocality')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Home Address"
            value={formData.homeAddress}
            onChange={handleChange('homeAddress')}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Latitude"
            type="number"
            value={formData.lat}
            onChange={handleChange('lat')}
            inputProps={{ 
              step: 'any',
              min: -90,
              max: 90
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LocationIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Longitude"
            type="number"
            value={formData.lng}
            onChange={handleChange('lng')}
            inputProps={{ 
              step: 'any',
              min: -180,
              max: 180
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LocationIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

