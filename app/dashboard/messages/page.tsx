'use client';

import React, { useState } from 'react';
import SidebarLayout from '@/components/SidebarLayout';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Badge,
  Divider,
  InputAdornment,
  Chip,
} from '@mui/material';
import {
  Send as SendIcon,
  Search as SearchIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon,
  MoreVert as MoreVertIcon,
  Check as CheckIcon,
  DoneAll as DoneAllIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isSent: boolean;
  isRead: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'John Smith',
    avatar: 'JS',
    lastMessage: 'Hey! I need help with my order #12345',
    timestamp: '2 min ago',
    unreadCount: 3,
    isOnline: true,
    messages: [
      {
        id: '1',
        text: 'Hi there! I placed an order yesterday.',
        timestamp: new Date(Date.now() - 3600000),
        isSent: false,
        isRead: true,
      },
      {
        id: '2',
        text: 'Hello! Thank you for reaching out. How can I help you today?',
        timestamp: new Date(Date.now() - 3540000),
        isSent: true,
        isRead: true,
      },
      {
        id: '3',
        text: 'I need help with my order #12345',
        timestamp: new Date(Date.now() - 3480000),
        isSent: false,
        isRead: true,
      },
      {
        id: '4',
        text: 'When will it be delivered?',
        timestamp: new Date(Date.now() - 3420000),
        isSent: false,
        isRead: true,
      },
      {
        id: '5',
        text: 'Let me check that for you right away. One moment please.',
        timestamp: new Date(Date.now() - 3360000),
        isSent: true,
        isRead: true,
      },
      {
        id: '6',
        text: 'Your order is scheduled to arrive on Friday, December 15th.',
        timestamp: new Date(Date.now() - 120000),
        isSent: true,
        isRead: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    lastMessage: 'Thank you for the quick response!',
    timestamp: '1 hour ago',
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: '1',
        text: 'Hi! I have a question about returns.',
        timestamp: new Date(Date.now() - 7200000),
        isSent: false,
        isRead: true,
      },
      {
        id: '2',
        text: 'Of course! I\'d be happy to help with that. What would you like to know?',
        timestamp: new Date(Date.now() - 7140000),
        isSent: true,
        isRead: true,
      },
      {
        id: '3',
        text: 'What\'s your return policy?',
        timestamp: new Date(Date.now() - 7080000),
        isSent: false,
        isRead: true,
      },
      {
        id: '4',
        text: 'We offer a 30-day return policy on all items. Items must be unused and in original packaging.',
        timestamp: new Date(Date.now() - 7020000),
        isSent: true,
        isRead: true,
      },
      {
        id: '5',
        text: 'Thank you for the quick response!',
        timestamp: new Date(Date.now() - 3600000),
        isSent: false,
        isRead: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Mike Wilson',
    avatar: 'MW',
    lastMessage: 'Can I change my shipping address?',
    timestamp: '3 hours ago',
    unreadCount: 1,
    isOnline: false,
    messages: [
      {
        id: '1',
        text: 'Hello, I just placed an order but need to change my shipping address.',
        timestamp: new Date(Date.now() - 10800000),
        isSent: false,
        isRead: true,
      },
      {
        id: '2',
        text: 'I can help you with that. What\'s your order number?',
        timestamp: new Date(Date.now() - 10740000),
        isSent: true,
        isRead: true,
      },
      {
        id: '3',
        text: 'Order #12346',
        timestamp: new Date(Date.now() - 10680000),
        isSent: false,
        isRead: true,
      },
      {
        id: '4',
        text: 'Can I change my shipping address?',
        timestamp: new Date(Date.now() - 10620000),
        isSent: false,
        isRead: false,
      },
    ],
  },
  {
    id: '4',
    name: 'Emma Davis',
    avatar: 'ED',
    lastMessage: 'Product looks great!',
    timestamp: '5 hours ago',
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: '1',
        text: 'Hi! I received my order today.',
        timestamp: new Date(Date.now() - 18000000),
        isSent: false,
        isRead: true,
      },
      {
        id: '2',
        text: 'That\'s wonderful! How is everything?',
        timestamp: new Date(Date.now() - 17940000),
        isSent: true,
        isRead: true,
      },
      {
        id: '3',
        text: 'Product looks great!',
        timestamp: new Date(Date.now() - 17880000),
        isSent: false,
        isRead: true,
      },
    ],
  },
  {
    id: '5',
    name: 'David Brown',
    avatar: 'DB',
    lastMessage: 'Is this item in stock?',
    timestamp: '1 day ago',
    unreadCount: 2,
    isOnline: true,
    messages: [
      {
        id: '1',
        text: 'Hi, I\'m interested in one of your products.',
        timestamp: new Date(Date.now() - 86400000),
        isSent: false,
        isRead: true,
      },
      {
        id: '2',
        text: 'Great! Which product are you interested in?',
        timestamp: new Date(Date.now() - 86340000),
        isSent: true,
        isRead: true,
      },
      {
        id: '3',
        text: 'The wireless headphones.',
        timestamp: new Date(Date.now() - 86280000),
        isSent: false,
        isRead: true,
      },
      {
        id: '4',
        text: 'Is this item in stock?',
        timestamp: new Date(Date.now() - 86220000),
        isSent: false,
        isRead: false,
      },
    ],
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    avatar: 'LA',
    lastMessage: 'Perfect, thanks!',
    timestamp: '2 days ago',
    unreadCount: 0,
    isOnline: false,
    messages: [
      {
        id: '1',
        text: 'Do you offer bulk discounts?',
        timestamp: new Date(Date.now() - 172800000),
        isSent: false,
        isRead: true,
      },
      {
        id: '2',
        text: 'Yes! We offer discounts on orders of 10+ items. What quantity are you looking at?',
        timestamp: new Date(Date.now() - 172740000),
        isSent: true,
        isRead: true,
      },
      {
        id: '3',
        text: 'I need about 15 units.',
        timestamp: new Date(Date.now() - 172680000),
        isSent: false,
        isRead: true,
      },
      {
        id: '4',
        text: 'Great! For 15 units, we can offer you a 15% discount. Would you like to proceed?',
        timestamp: new Date(Date.now() - 172620000),
        isSent: true,
        isRead: true,
      },
      {
        id: '5',
        text: 'Perfect, thanks!',
        timestamp: new Date(Date.now() - 172560000),
        isSent: false,
        isRead: true,
      },
    ],
  },
  {
    id: '7',
    name: 'Robert Taylor',
    avatar: 'RT',
    lastMessage: 'When do you restock?',
    timestamp: '3 days ago',
    unreadCount: 1,
    isOnline: false,
    messages: [
      {
        id: '1',
        text: 'I noticed an item is out of stock.',
        timestamp: new Date(Date.now() - 259200000),
        isSent: false,
        isRead: true,
      },
      {
        id: '2',
        text: 'When do you restock?',
        timestamp: new Date(Date.now() - 259140000),
        isSent: false,
        isRead: false,
      },
    ],
  },
  {
    id: '8',
    name: 'Jennifer White',
    avatar: 'JW',
    lastMessage: 'Great service!',
    timestamp: '1 week ago',
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: '1',
        text: 'Just wanted to say thank you for the excellent customer service!',
        timestamp: new Date(Date.now() - 604800000),
        isSent: false,
        isRead: true,
      },
      {
        id: '2',
        text: 'Thank you so much for the kind words! We really appreciate your business.',
        timestamp: new Date(Date.now() - 604740000),
        isSent: true,
        isRead: true,
      },
      {
        id: '3',
        text: 'Great service!',
        timestamp: new Date(Date.now() - 604680000),
        isSent: false,
        isRead: true,
      },
    ],
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add message logic here
      setMessageText('');
    }
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SidebarLayout>
      <Box sx={{ width: '100%', height: 'calc(100vh - 100px)', display: 'flex', gap: 0 }}>
        {/* Left Panel - Conversations List */}
        <Paper
          sx={{
            width: { xs: '100%', md: 380 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
            borderRight: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Search Header */}
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Messages
            </Typography>
            <TextField
              fullWidth
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
          </Box>

          {/* Conversations List */}
          <List sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>
            {filteredConversations.map((conversation) => (
              <ListItem key={conversation.id} disablePadding>
                <ListItemButton
                  selected={selectedConversation.id === conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  sx={{
                    py: 2,
                    px: 2,
                    '&.Mui-selected': {
                      bgcolor: 'action.selected',
                      borderLeft: '3px solid',
                      borderColor: 'primary.main',
                    },
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      sx={{
                        '& .MuiBadge-badge': {
                          bgcolor: conversation.isOnline ? 'success.main' : 'grey.400',
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          border: '2px solid',
                          borderColor: 'background.paper',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: 'primary.main',
                          fontWeight: 600,
                          width: 48,
                          height: 48,
                        }}
                      >
                        {conversation.avatar}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="body1" fontWeight={conversation.unreadCount > 0 ? 700 : 600}>
                          {conversation.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {conversation.timestamp}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography
                          variant="body2"
                          component="span"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontWeight: conversation.unreadCount > 0 ? 600 : 400,
                            flex: 1,
                          }}
                        >
                          {conversation.lastMessage}
                        </Typography>
                        {conversation.unreadCount > 0 && (
                          <Chip
                            label={conversation.unreadCount}
                            size="small"
                            sx={{
                              bgcolor: 'primary.main',
                              color: 'primary.contrastText',
                              height: 20,
                              minWidth: 20,
                              '& .MuiChip-label': {
                                px: 0.75,
                                fontSize: '0.75rem',
                                fontWeight: 700,
                              },
                            }}
                          />
                        )}
                      </Box>
                    }
                    sx={{ ml: 2 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Right Panel - Chat Area */}
        <Paper
          sx={{
            flex: 1,
            height: '100%',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {/* Chat Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: selectedConversation.isOnline ? 'success.main' : 'grey.400',
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: 'background.paper',
                  },
                }}
              >
                <Avatar sx={{ bgcolor: 'primary.main', fontWeight: 600 }}>
                  {selectedConversation.avatar}
                </Avatar>
              </Badge>
              <Box>
                <Typography variant="h6" fontWeight={700}>
                  {selectedConversation.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedConversation.isOnline ? 'Online' : 'Offline'}
                </Typography>
              </Box>
            </Box>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>

          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              overflowY: 'auto',
              bgcolor: 'grey.50',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            {selectedConversation.messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.isSent ? 'flex-end' : 'flex-start',
                  mb: 0.5,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: message.isSent ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      bgcolor: message.isSent ? 'primary.main' : 'background.paper',
                      color: message.isSent ? 'primary.contrastText' : 'text.primary',
                      borderRadius: 2,
                      borderTopRightRadius: message.isSent ? 0 : 2,
                      borderTopLeftRadius: message.isSent ? 2 : 0,
                      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                  </Paper>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                      {formatTime(message.timestamp)}
                    </Typography>
                    {message.isSent && (
                      message.isRead ? (
                        <DoneAllIcon sx={{ fontSize: 14, color: 'info.main' }} />
                      ) : (
                        <CheckIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      )
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Message Input */}
          <Box
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <IconButton size="small" sx={{ mb: 0.5 }}>
                <AttachFileIcon />
              </IconButton>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  },
                }}
              />
              <IconButton size="small" sx={{ mb: 0.5 }}>
                <EmojiIcon />
              </IconButton>
              <IconButton
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  mb: 0.5,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:disabled': {
                    bgcolor: 'action.disabledBackground',
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
    </SidebarLayout>
  );
}










