'use client';

import { Box, Paper, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Paper sx={{ p: 6, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Logged Out
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          You have been successfully logged out of your seller account.
        </Typography>
        <Button variant="contained" fullWidth onClick={() => router.push('/dashboard')}>
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
}
