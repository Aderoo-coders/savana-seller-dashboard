'use client';

import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

interface FileUploadProps {
  label?: string;
  multiple?: boolean;
  accept?: string;
  onFileSelect?: (files: FileList | null) => void;
}

export default function FileUpload({
  label = 'Drop file here or click to upload',
  multiple = false,
  accept = 'image/*',
  onFileSelect,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      if (onFileSelect) {
        onFileSelect(files);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      if (onFileSelect) {
        onFileSelect(files);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'grey.300',
          borderRadius: 2,
          p: { xs: 3, sm: 4, md: 6 },
          textAlign: 'center',
          cursor: 'pointer',
          bgcolor: isDragging ? 'action.hover' : 'background.paper',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover',
          },
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        <CloudUploadIcon
          sx={{
            fontSize: { xs: 48, sm: 56, md: 64 },
            color: 'text.secondary',
            mb: { xs: 1.5, sm: 2 },
          }}
        />
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Select files
        </Typography>
        {selectedFiles.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="primary.main">
              {selectedFiles.length} file(s) selected
            </Typography>
            {selectedFiles.map((file, index) => (
              <Typography key={index} variant="caption" color="text.secondary">
                {file.name}
              </Typography>
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

