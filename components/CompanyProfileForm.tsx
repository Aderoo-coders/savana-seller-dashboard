'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Avatar,
  Chip,
  Stack,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import FileUpload from './FileUpload';
import { CompanyProfile, getCompanyProfile, saveCompanyProfile } from '@/lib/companyProfile';

interface CompanyProfileFormProps {
  initialData?: CompanyProfile;
  onSave?: (data: CompanyProfile) => void;
  onCancel?: () => void;
  formId?: string;
}

export default function CompanyProfileForm({ initialData, onSave, onCancel, formId = 'company-profile-form' }: CompanyProfileFormProps) {
  const [formData, setFormData] = useState<CompanyProfile>(
    initialData || getCompanyProfile()
  );
  const [logoPreview, setLogoPreview] = useState<string | undefined>(formData.logo);
  const [legalDocumentPreviews, setLegalDocumentPreviews] = useState<string[]>(formData.legalDocuments || []);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setLogoPreview(initialData.logo);
      setLegalDocumentPreviews(initialData.legalDocuments || []);
    }
  }, [initialData]);

  const handleChange = (field: keyof CompanyProfile) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogoUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({ ...prev, logo: base64String }));
        setLogoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({ ...prev, logo: undefined }));
    setLogoPreview(undefined);
  };

  const handleLegalDocumentUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const readers = fileArray.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then((base64Strings) => {
        const updatedDocuments = [...legalDocumentPreviews, ...base64Strings];
        setLegalDocumentPreviews(updatedDocuments);
        setFormData((prev) => ({ ...prev, legalDocuments: updatedDocuments }));
      });
    }
  };

  const handleRemoveLegalDocument = (index: number) => {
    const updatedDocuments = legalDocumentPreviews.filter((_, i) => i !== index);
    setLegalDocumentPreviews(updatedDocuments);
    setFormData((prev) => ({ ...prev, legalDocuments: updatedDocuments }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCompanyProfile(formData);
    // Trigger custom event to update sidebar
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('companyProfileUpdated', { detail: formData }));
    }
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <Box component="form" id={formId} onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Grid container spacing={3}>
        {/* Company Logo Section - At the Top */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Company Logo
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: { xs: 2, sm: 3 }
          }}>
            <Avatar
              src={logoPreview}
              sx={{
                width: { xs: 120, sm: 120, md: 140 },
                height: { xs: 120, sm: 120, md: 140 },
                bgcolor: 'primary.main',
                fontSize: { xs: '3rem', sm: '3rem', md: '3.5rem' },
                border: '3px solid',
                borderColor: 'divider',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                flexShrink: 0,
                order: { xs: 1, sm: 0 },
              }}
            >
              {formData.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ 
              flex: 1, 
              width: { xs: '100%', sm: 'auto' },
              order: { xs: 2, sm: 1 },
            }}>
              <FileUpload
                label="Upload Company Logo"
                multiple={false}
                accept="image/*"
                onFileSelect={handleLogoUpload}
              />
              {logoPreview && (
                <Button
                  size="small"
                  color="error"
                  onClick={handleRemoveLogo}
                  sx={{ mt: 1 }}
                >
                  Remove Logo
                </Button>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Legal Documents Section */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Legal Documents
          </Typography>
          <FileUpload
            label="Upload Legal Documents (PDF, Images)"
            multiple={true}
            accept=".pdf,image/*,.doc,.docx"
            onFileSelect={handleLegalDocumentUpload}
          />
          {legalDocumentPreviews.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                Uploaded Documents ({legalDocumentPreviews.length})
              </Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {legalDocumentPreviews.map((doc, index) => (
                  <Chip
                    key={index}
                    label={`Document ${index + 1}`}
                    onDelete={() => handleRemoveLegalDocument(index)}
                    deleteIcon={<DeleteIcon />}
                    color="primary"
                    variant="outlined"
                    sx={{
                      '& .MuiChip-deleteIcon': {
                        color: 'error.main',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Grid>

        {/* Company Information */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Company Information
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Company Name"
            value={formData.name}
            onChange={handleChange('name')}
            required
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email || ''}
            onChange={handleChange('email')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            value={formData.phone || ''}
            onChange={handleChange('phone')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Website"
            value={formData.website || ''}
            onChange={handleChange('website')}
            placeholder="https://www.example.com"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={formData.description || ''}
            onChange={handleChange('description')}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={formData.address || ''}
            onChange={handleChange('address')}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tax ID"
            value={formData.taxId || ''}
            onChange={handleChange('taxId')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Registration Number"
            value={formData.registrationNumber || ''}
            onChange={handleChange('registrationNumber')}
          />
        </Grid>

        {/* Action Buttons - Only show if onCancel is provided (standalone dialog mode) */}
        {onCancel && (
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button
                variant="outlined"
                onClick={onCancel}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                Save Company Profile
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

