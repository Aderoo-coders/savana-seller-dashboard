'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  formId?: string;
}

export default function FormDialog({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  maxWidth = 'md',
  fullWidth = true,
  formId,
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Box sx={{ typography: 'h5', fontWeight: 600 }}>{title}</Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          {children}
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            borderTop: 1,
            borderColor: 'divider',
            gap: 2,
          }}
        >
          <Button onClick={onClose} variant="outlined" color="inherit">
            {cancelLabel}
          </Button>
          <Button
            type={formId ? 'submit' : 'button'}
            form={formId}
            variant="contained"
            color="primary"
            sx={{ minWidth: 100 }}
            onClick={() => {
              // Let the form handle submission if formId is provided
              if (!formId && onSubmit) {
                onSubmit();
              }
            }}
          >
            {submitLabel}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

