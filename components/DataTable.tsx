'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Tooltip,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Drawer,
  Button,
  Grid,
  Divider,
  Stack,
  Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import { Product, Order } from '@/lib/types';

type OrderBy = 'asc' | 'desc';

interface DataTableProps<T extends Product | Order> {
  data: T[];
  columns: {
    id: string;
    label: string;
    render: (row: T) => React.ReactNode;
    numeric?: boolean;
    sortable?: boolean;
    filterable?: boolean;
    filterType?: 'text' | 'select';
    filterOptions?: Array<{ label: string; value: string }>;
    getFilterValue?: (row: T) => string | number;
  }[];
  title: string;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  actionButton?: React.ReactNode;
  rowsPerPageOptions?: number[];
}

export default function DataTable<T extends Product | Order>({
  data,
  columns,
  title,
  searchPlaceholder = 'Search...',
  onRowClick,
  actionButton,
  rowsPerPageOptions = [10, 25, 50, 100],
}: DataTableProps<T>) {
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<OrderBy>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handleSort = (columnId: string) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const filteredAndSortedData = useMemo(() => {
    // Filter by search term
    let filtered = data;
    if (searchTerm) {
      filtered = data.filter((row) => {
        return columns.some((col) => {
          const value = col.render(row);
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }

    // Apply column filters
    Object.keys(filters).forEach((columnId) => {
      const filterValue = filters[columnId];
      if (filterValue && filterValue.trim() !== '') {
        const column = columns.find((col) => col.id === columnId);
        if (column && column.filterable) {
          filtered = filtered.filter((row) => {
            const getValue = column.getFilterValue || ((r: T) => {
              const rendered = column.render(r);
              return String(rendered).toLowerCase();
            });
            const rowValue = String(getValue(row)).toLowerCase();
            return rowValue.includes(filterValue.toLowerCase());
          });
        }
      }
    });

    // Sort data
    if (orderBy) {
      const column = columns.find((col) => col.id === orderBy);
      if (column && column.sortable) {
        filtered = [...filtered].sort((a, b) => {
          const aVal = column.render(a);
          const bVal = column.render(b);
          
          if (column.numeric) {
            return order === 'asc'
              ? Number(aVal) - Number(bVal)
              : Number(bVal) - Number(aVal);
          }
          
          const comparison = String(aVal).localeCompare(String(bVal));
          return order === 'asc' ? comparison : -comparison;
        });
      }
    }

    return filtered;
  }, [data, searchTerm, orderBy, order, columns, filters]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, page, rowsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
    setPage(1); // Reset to first page when changing rows per page
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
    setPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const activeFiltersCount = Object.values(filters).filter(v => v && v.trim() !== '').length;

  return (
    <Box sx={{ width: '100%' }}>
        <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: { xs: 2, sm: 0 },
          mb: { xs: 3, sm: 4, md: 6 },
          px: { xs: 1.5, sm: 2, md: 3 },
          mx: { md: 0 },
        }}
      >
        <TextField
          size="small"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="text-gray-400" />
              </InputAdornment>
            ),
          }}
          sx={{
            width: { xs: '100%', sm: 'auto' },
            minWidth: { xs: '100%', sm: 300 },
            bgcolor: 'background.paper',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#e5e7eb',
              },
              '&:hover fieldset': {
                borderColor: '#d1d5db',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2563eb',
              },
            },
          }}
        />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
          <Tooltip title="Filter">
            <Badge badgeContent={activeFiltersCount} color="error">
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setFilterOpen(true)}
                sx={{
                  borderColor: activeFiltersCount > 0 ? 'primary.main' : 'divider',
                  color: activeFiltersCount > 0 ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    borderColor: activeFiltersCount > 0 ? 'primary.dark' : 'divider',
                    bgcolor: activeFiltersCount > 0 ? 'primary.light' : 'action.hover',
                  },
                }}
              >
                Filter
              </Button>
            </Badge>
          </Tooltip>
          {activeFiltersCount > 0 && (
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
              {Object.entries(filters).map(([columnId, value]) => {
                if (!value || value.trim() === '') return null;
                const column = columns.find((col) => col.id === columnId);
                if (!column) return null;
                return (
                  <Chip
                    key={columnId}
                    label={`${column.label}: ${value}`}
                    onDelete={() => handleFilterChange(columnId, '')}
                    deleteIcon={<ClearIcon />}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                );
              })}
              {activeFiltersCount > 1 && (
                <Button
                  size="small"
                  onClick={clearFilters}
                  startIcon={<ClearIcon />}
                  sx={{ minWidth: 'auto', px: 1 }}
                >
                  Clear All
                </Button>
              )}
            </Stack>
          )}
          {actionButton && (
            <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
              {actionButton}
            </Box>
          )}
        </Box>
      </Box>
      
      <TableContainer 
        component={Paper} 
        elevation={1}
        sx={{
          width: '100%',
          overflowX: 'auto',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.100', '&:hover': { bgcolor: 'grey.200' } }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.numeric ? 'right' : 'left'}
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '0.875rem', sm: '0.938rem' },
                    color: 'text.primary',
                    whiteSpace: 'nowrap',
                    minWidth: { xs: 120, sm: 'auto' },
                    py: 1.5,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                    <Box sx={{ flex: 1, fontSize: { xs: '0.875rem', sm: 'inherit' } }}>{column.label}</Box>
                    {column.sortable && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
                        <Tooltip title="Sort">
                          <IconButton
                            size="small"
                            onClick={() => handleSort(column.id)}
                            sx={{
                              p: { xs: 0.25, sm: 0.5 },
                              '&:hover': { bgcolor: 'action.hover' },
                            }}
                          >
                            {orderBy === column.id ? (
                              order === 'asc' ? (
                                <ArrowUpwardIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: 'primary.main' }} />
                              ) : (
                                <ArrowDownwardIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: 'primary.main' }} />
                              )
                            ) : (
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                <ArrowUpwardIcon sx={{ fontSize: { xs: 10, sm: 12 }, color: 'text.secondary', opacity: 0.5 }} />
                                <ArrowDownwardIcon sx={{ fontSize: { xs: 10, sm: 12 }, color: 'text.secondary', opacity: 0.5, mt: -0.5 }} />
                              </Box>
                            )}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center" sx={{ py: 4 }}>
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  hover
                  onClick={() => onRowClick && onRowClick(row)}
                  sx={{ 
                    cursor: onRowClick ? 'pointer' : 'default',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                    '&:nth-of-type(even)': {
                      bgcolor: 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={column.id} 
                      align={column.numeric ? 'right' : 'left'}
                      sx={{
                        fontSize: { xs: '0.875rem', sm: '0.938rem' },
                        color: 'text.primary',
                        whiteSpace: 'nowrap',
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      {column.render(row)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredAndSortedData.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            gap: 2,
            mt: 3,
            px: { xs: 1.5, sm: 2, md: 3 },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {((page - 1) * rowsPerPage) + 1} to {Math.min(page * rowsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length}
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Rows per page</InputLabel>
              <Select
                value={rowsPerPage}
                label="Rows per page"
                onChange={handleRowsPerPageChange}
              >
                {rowsPerPageOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </Box>
      )}

      {/* Filter Drawer - Bazaar Style */}
      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            p: 3,
          }
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight={700}>
              Filter Options
            </Typography>
            <IconButton
              onClick={() => setFilterOpen(false)}
              size="small"
              sx={{
                bgcolor: 'action.hover',
                '&:hover': {
                  bgcolor: 'action.selected',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Filter Content */}
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            <Stack spacing={3}>
              {columns
                .filter((col) => col.filterable !== false)
                .map((column) => (
                  <Box key={column.id}>
                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5, color: 'text.secondary' }}>
                      {column.label}
                    </Typography>
                    {column.filterType === 'select' && column.filterOptions ? (
                      <FormControl fullWidth size="small">
                        <Select
                          value={filters[column.id] || ''}
                          onChange={(e) => handleFilterChange(column.id, e.target.value)}
                          displayEmpty
                          sx={{
                            bgcolor: 'background.paper',
                            '& .MuiSelect-select': {
                              py: 1.5,
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>All {column.label}</em>
                          </MenuItem>
                          {column.filterOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        fullWidth
                        size="small"
                        value={filters[column.id] || ''}
                        onChange={(e) => handleFilterChange(column.id, e.target.value)}
                        placeholder={`Search ${column.label.toLowerCase()}...`}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          bgcolor: 'background.paper',
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'divider',
                            },
                          },
                        }}
                      />
                    )}
                  </Box>
                ))}
            </Stack>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={clearFilters}
                variant="outlined"
                fullWidth
                disabled={activeFiltersCount === 0}
                startIcon={<ClearIcon />}
              >
                Clear All
              </Button>
              <Button
                onClick={() => setFilterOpen(false)}
                variant="contained"
                fullWidth
              >
                Done
              </Button>
            </Stack>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

