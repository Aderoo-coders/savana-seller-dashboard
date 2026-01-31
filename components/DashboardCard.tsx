import { Box, Paper, Typography, Chip } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: SvgIconComponent;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function DashboardCard({ title, value, icon: Icon, trend, className }: DashboardCardProps) {
  return (
    <Paper 
      sx={{ 
        p: { xs: 2.5, sm: 3 },
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2.5 }}>
        <Box sx={{ 
          width: { xs: 48, sm: 56 }, 
          height: { xs: 48, sm: 56 }, 
          borderRadius: 2, 
          bgcolor: 'primary.light',
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'primary.light',
        }}>
          <Icon sx={{ color: 'primary.main', fontSize: { xs: 26, sm: 30 }, fontWeight: 'bold' }} />
        </Box>
        {trend && (
          <Chip
            icon={trend.isPositive ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : <TrendingDownIcon sx={{ fontSize: 16 }} />}
            label={`${Math.abs(trend.value)}%`}
            size="small"
            sx={{
              bgcolor: trend.isPositive ? 'success.light' : 'error.light',
              color: trend.isPositive ? 'success.dark' : 'error.dark',
              fontWeight: 700,
              fontSize: '0.75rem',
              height: 24,
              '& .MuiChip-icon': {
                color: trend.isPositive ? 'success.dark' : 'error.dark',
              },
            }}
          />
        )}
      </Box>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          mb: 1, 
          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="h4" 
        fontWeight={700} 
        sx={{ 
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          color: 'text.primary',
          lineHeight: 1.2,
          mb: trend ? 1 : 0,
        }}
      >
        {value}
      </Typography>
      {trend && (
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: { xs: '0.6875rem', sm: '0.75rem' },
            mt: 0.5,
          }}
        >
          <Typography 
            component="span" 
            sx={{ 
              color: trend.isPositive ? 'success.main' : 'error.main',
              fontWeight: 600,
            }}
          >
            {trend.isPositive ? '+' : ''}{trend.value}%
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            vs last month
          </Typography>
        </Typography>
      )}
    </Paper>
  );
}
