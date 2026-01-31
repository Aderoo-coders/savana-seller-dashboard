'use client';

import React from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import { Box, Paper, Typography, Grid, Button } from '@mui/material';
import {
  Support as SupportIcon,
  Email as EmailIcon,
  Article as ArticleIcon,
  Book as BookIcon,
  Description as DescriptionIcon,
  ShoppingCart as OrderIcon,
  VideoLibrary as VideoIcon,
} from '@mui/icons-material';

export default function HelpPage() {
  const helpTopics = [
    {
      category: 'Getting Started',
      icon: BookIcon,
      items: [
        'Setting up your store',
        'Adding your first product',
        'Managing orders',
        'Setting up payment methods',
      ],
    },
    {
      category: 'Product Management',
      icon: DescriptionIcon,
      items: [
        'Creating product listings',
        'Managing inventory',
        'Product variants and options',
        'Bulk import/export',
      ],
    },
    {
      category: 'Order Management',
      icon: OrderIcon,
      items: [
        'Processing orders',
        'Shipping integration',
        'Order refunds',
        'Customer communication',
      ],
    },
    {
      category: 'Resources',
      icon: VideoIcon,
      items: [
        'Video tutorials',
        'API documentation',
        'Community forum',
        'Feature updates',
      ],
    },
  ];

  return (
    <SidebarLayout>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Help & Support
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2,
                bgcolor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <SupportIcon sx={{ fontSize: 32, color: 'primary.main' }} />
            </Box>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Live Chat
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Chat with our support team in real-time
            </Typography>
            <Button variant="contained" fullWidth>
              Start Chat
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2,
                bgcolor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <EmailIcon sx={{ fontSize: 32, color: 'success.main' }} />
            </Box>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Email Support
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Get help via email within 24 hours
            </Typography>
            <Button variant="contained" color="success" fullWidth>
              Send Email
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2,
                bgcolor: 'secondary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <ArticleIcon sx={{ fontSize: 32, color: 'secondary.main' }} />
            </Box>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Knowledge Base
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Browse articles and tutorials
            </Typography>
            <Button variant="contained" color="secondary" fullWidth>
              Browse Articles
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} mb={4}>
        {helpTopics.map((topic) => (
          <Grid item xs={12} md={6} key={topic.category}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <topic.icon sx={{ color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  {topic.category}
                </Typography>
              </Box>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                {topic.items.map((item, index) => (
                  <li key={index}>
                    <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
                      {item}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, boxShadow: 1 }}>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              How do I add a new product?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Go to the Products page and click the "Add Product" button. Fill in all the required
              information including name, description, price, and upload images.
            </Typography>
          </Box>
          <Box sx={{ pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              How long does it take to process an order?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Orders are typically processed within 1-2 business days. You can track the status of
              each order in the Orders section.
            </Typography>
          </Box>
          <Box sx={{ pb: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              Can I customize my dashboard?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Yes! Go to Settings and click on Appearance to customize your theme and display
              preferences.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              What payment methods do you support?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We support all major credit cards, PayPal, and bank transfers. You can configure
              payment methods in Settings {'>'} Billing.
            </Typography>
          </Box>
        </Box>
      </Paper>
    </SidebarLayout>
  );
}
