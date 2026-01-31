'use client';

import React from 'react';
import { Box, Container, Paper, Button, Divider, useMediaQuery, useTheme, Grid, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

interface FullPageFormProps {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  sideNavItems?: Array<{ label: string; targetId: string }>;
}

export default function FullPageForm({
  title,
  children,
  onCancel,
  onSubmit,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  sideNavItems,
}: FullPageFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 2, sm: 3, md: 4 }, px: { xs: 1, sm: 2 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 } }}>
        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onCancel}
            sx={{ mb: { xs: 1, sm: 2 } }}
            size={isMobile ? 'small' : 'medium'}
          >
            Back
          </Button>
          <Box sx={{ typography: { xs: 'h5', sm: 'h4' }, fontWeight: 600 }}>{title}</Box>
        </Box>
        
        <Paper
          elevation={1}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 2,
          }}
        >
          <Box component="form" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {sideNavItems && sideNavItems.length > 0 && (
                <Grid item xs={12} md={3} lg={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Box sx={{ position: 'sticky', top: 24 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
                      Sections
                    </Typography>
                    <List sx={{ p: 0 }}>
                      {sideNavItems.map((item) => (
                        <ListItemButton
                          key={item.targetId}
                          sx={{ borderRadius: 1, mb: 0.5 }}
                          onClick={() => {
                            const el = document.getElementById(item.targetId);
                            if (el) {
                              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Box>
                </Grid>
              )}
              <Grid item xs={12} md={sideNavItems && sideNavItems.length > 0 ? 9 : 12} lg={sideNavItems && sideNavItems.length > 0 ? 9 : 12}>
                {children}
              </Grid>
            </Grid>
            
            <Divider sx={{ my: { xs: 3, sm: 4 } }} />
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column-reverse', sm: 'row' },
              justifyContent: 'flex-end', 
              gap: 2 
            }}>
              <Button
                variant="outlined"
                onClick={onCancel}
                color="inherit"
                fullWidth={isMobile}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                {cancelLabel}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth={isMobile}
                sx={{ 
                  minWidth: { xs: '100%', sm: 120 },
                  width: { xs: '100%', sm: 'auto' },
                }}
              >
                {submitLabel}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

