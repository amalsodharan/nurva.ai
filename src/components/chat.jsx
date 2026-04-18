import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
  Paper,
  Fade,
  Slide,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import DOMPurify from 'dompurify';
import appIcon from '../assets/nurva.png';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chatCount, setChatCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultScreen, setDefaultScreen] = useState(true);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState("");

  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://olliebotai-2-o.onrender.com/api/me", {
          method: "GET",
          headers: {
            "Authorization": token
          }
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
          return;
        }

        if (response.ok) {
          const data = await response.json();
          if (data.userFetch && data.userFetch.name) {
            setUserName(data.userFetch.name);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const isUserScrolledUp = useRef(false);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      isUserScrolledUp.current = scrollHeight - scrollTop - clientHeight > 50;
    }
  };

  // Auto scroll to bottom only if not manually scrolled up
  useEffect(() => {
    if (chatContainerRef.current && !isUserScrolledUp.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading, typingText]);

  // Typing animation effect
  useEffect(() => {
    if (isTyping && typingText) {
      const text = typingText;
      let currentIndex = 0;
      const typingSpeed = 30; // milliseconds per character

      // Add empty message for typing
      setMessages((prev) => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1]?.isTyping) {
          return newMessages;
        }
        return [...newMessages, { sender: "bot", text: "", isTyping: true }];
      });

      const interval = setInterval(() => {
        currentIndex++;
        if (currentIndex <= text.length) {
          setMessages((prev) => {
            const newMessages = [...prev];
            if (newMessages[newMessages.length - 1]?.isTyping) {
              newMessages[newMessages.length - 1] = {
                sender: "bot",
                text: text.slice(0, currentIndex),
                isTyping: true
              };
            }
            return newMessages;
          });
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setMessages((prev) => {
            const newMessages = [...prev];
            if (newMessages[newMessages.length - 1]?.isTyping) {
              newMessages[newMessages.length - 1] = {
                sender: "bot",
                text: text,
                isTyping: false
              };
            }
            return newMessages;
          });
          setTypingText("");
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }
  }, [isTyping, typingText]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleMenuClose();
    navigate('/', { replace: true });
  };

  const sendMessage = async () => {
    const input = userInput.trim();
    if (!input) return;

    isUserScrolledUp.current = false;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setUserInput("");
    setIsLoading(true);
    setDefaultScreen(false);

    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch("https://olliebotai-2-o.onrender.com/api/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ input }),
      });

      if (res.status === 401 || res.status === 403) {
        // Token expired or invalid
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
        return;
      }

      const data = await res.json();

      setIsLoading(false);
      setTypingText(data.answer || data.response || "I'm here to help!");
      setIsTyping(true);
    } catch (err) {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 }
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          height: { xs: 'calc(100vh - 16px)', sm: '92vh' },
          display: "flex",
          flexDirection: "column",
          bgcolor: 'white',
          borderRadius: { xs: 3, sm: 5 },
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: { xs: 2, sm: 2.5, md: 3 },
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              background: "linear-gradient(135deg, #f3f0ff 0%, #e8dcff 100%)",
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              transition: 'all 0.3s ease',
              '&:hover': {
                background: "linear-gradient(135deg, #e8dcff 0%, #d9c8ff 100%)",
                transform: 'translateX(-4px)',
              }
            }}
          >
            <ArrowBackIcon sx={{ color: '#9f59ff' }} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              fontWeight="700"
              sx={{ color: 'text.primary' }}
            >
              Hi there, 
              <span style={{ color: 'var(--mui-palette-primary-main, #7c3aed)' }}> {userName}</span>
            </Typography>
            <Typography 
              variant={isMobile ? "body2" : "body1"} 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            >
              Your friendly AI assistant
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: 8, sm: 10 },
              height: { xs: 8, sm: 10 },
              borderRadius: '50%',
              bgcolor: '#4caf50',
              boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.2)',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.5 },
              }
            }}
          />
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              background: "linear-gradient(135deg, #f3f0ff 0%, #e8dcff 100%)",
              width: { xs: 40, sm: 48 },
              height: { xs: 40, sm: 48 },
              transition: 'all 0.3s ease',
              '&:hover': {
                background: "linear-gradient(135deg, #e8dcff 0%, #d9c8ff 100%)",
              }
            }}
          >
            <MoreVertIcon sx={{ color: '#9f59ff' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                minWidth: 180,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              }
            }}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: '#9f59ff' }} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Paper>

        {/* Messages Container */}
        <Box
          ref={chatContainerRef}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            p: { xs: 2, sm: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 2.5 },
            scrollBehavior: "smooth",
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#e2e8f0',
              borderRadius: '10px',
              '&:hover': {
                background: '#cbd5e1',
              }
            },
          }}
          onScroll={handleScroll}
        >
          {/* Default Screen */}
          {defaultScreen && (
            <Fade in={defaultScreen} timeout={800}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    animation: 'float 6s ease-in-out infinite',
                    '@keyframes float': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-20px)' }
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 120, sm: 180, md: 220 },
                      height: { xs: 120, sm: 180, md: 220 },
                      borderRadius: '50%',
                      bgcolor: 'primary.light',
                      opacity: 0.8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
                    }}
                  >
                    <img
                      src={appIcon}
                      alt="logo"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ maxWidth: { xs: '90%', sm: '80%', md: '70%' } }}>
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      fontWeight: 400,
                      px: 2,
                    }}
                  >
                    Experience fast, personalized, and secure conversations with our AI-driven chat assistant designed for work, personal tasks, and beyond.
                  </Typography>
                </Box>

                {/* Quick Suggestions */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 1.5, 
                    justifyContent: 'center',
                    mt: 2,
                    px: 2,
                  }}
                >
                  {['Help me brainstorm', 'Explain a concept', 'Write an email', 'Plan my day'].map((suggestion, idx) => (
                    <Paper
                      key={idx}
                      onClick={() => setUserInput(suggestion)}
                      sx={{
                        px: { xs: 2, sm: 3 },
                        py: { xs: 1, sm: 1.5 },
                        borderRadius: '50px',
                        cursor: 'pointer',
                        border: '1px solid',
                        borderColor: 'divider',
                        bgcolor: 'background.paper',
                        transition: 'all 0.3s ease',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        '&:hover': {
                          bgcolor: 'background.default',
                          borderColor: 'primary.main',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.primary', 
                          fontWeight: 500,
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                      >
                        {suggestion}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            </Fade>
          )}

          {/* Messages */}
          {messages.map((msg, index) => (
            <Fade
              key={index}
              in={true}
              timeout={500}
            >
              <Box
                display="flex"
                flexDirection={msg.sender === "user" ? "row-reverse" : "row"}
                alignItems="flex-start"
                gap={{ xs: 1, sm: 1.5 }}
              >
                <Avatar
                  sx={{
                    width: { xs: 36, sm: 44 },
                    height: { xs: 36, sm: 44 },
                    bgcolor: msg.sender === "user" 
                      ? "primary.main" 
                      : "primary.light",
                    color: msg.sender === "user" ? "#fff" : "primary.dark",
                    boxShadow: msg.sender === "user" 
                      ? '0 4px 12px rgba(159, 89, 255, 0.3)'
                      : '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  {msg.sender === "user" ? <PersonIcon /> : <SmartToyIcon />}
                </Avatar>

                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    px: { xs: 2, sm: 3 },
                    borderRadius: 4,
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    bgcolor: msg.sender === "user" 
                      ? "primary.main"
                      : "background.paper",
                    color: msg.sender === "user" ? "primary.contrastText" : "text.primary",
                    boxShadow: msg.sender === "user"
                      ? '0 8px 24px rgba(159, 89, 255, 0.3)'
                      : '0 8px 24px rgba(0, 0, 0, 0.08)',
                    maxWidth: { xs: '85%', sm: '75%', md: '70%' },
                    wordBreak: "break-word",
                    border: msg.sender === "bot" ? '1px solid #f5f5f5' : 'none',
                  }}
                >
                  {msg.sender === "bot" ? (
                    <>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(msg.text, { USE_PROFILES: { html: true } })
                        }}
                      />
                      {msg.isTyping && (
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-block',
                            width: 2,
                            height: 16,
                            bgcolor: '#9f59ff',
                            ml: 0.5,
                            animation: 'blink 1s step-end infinite',
                            '@keyframes blink': {
                              '0%, 100%': { opacity: 1 },
                              '50%': { opacity: 0 },
                            }
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <div>{msg.text}</div>
                  )}
                </Paper>
              </Box>
            </Fade>
          ))}

          {/* Loading */}
          {isLoading && (
            <Fade in={isLoading}>
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: "#f3f0ff", 
                    color: "#9f59ff",
                    width: { xs: 36, sm: 44 },
                    height: { xs: 36, sm: 44 },
                  }}
                >
                  <SmartToyIcon />
                </Avatar>
                <Paper
                  sx={{
                    px: 3,
                    py: 2,
                    borderRadius: 4,
                    bgcolor: 'white',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Typography 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                  >
                    Thinking
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: '#9f59ff',
                        animation: 'bounce 1.4s ease-in-out infinite',
                        '@keyframes bounce': {
                          '0%, 80%, 100%': { transform: 'scale(0)' },
                          '40%': { transform: 'scale(1)' },
                        }
                      }}
                    />
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: '#9f59ff',
                        animation: 'bounce 1.4s ease-in-out 0.2s infinite',
                      }}
                    />
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        bgcolor: '#9f59ff',
                        animation: 'bounce 1.4s ease-in-out 0.4s infinite',
                      }}
                    />
                  </Box>
                </Paper>
              </Box>
            </Fade>
          )}
        </Box>

        {/* Input Section */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            gap: { xs: 1, sm: 1.5 },
            p: { xs: 2, sm: 2.5, md: 3 },
            borderTop: '2px solid #f5f5f5',
            background: 'white',
            position: 'sticky',
            bottom: 0,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              borderRadius: '50px',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.default',
              px: { xs: 2, sm: 3 },
              py: { xs: 0.5, sm: 1 },
              transition: 'all 0.3s ease',
              '&:focus-within': {
                borderColor: 'primary.main',
                bgcolor: 'background.paper',
              }
            }}
          >
            <TextField
              variant="standard"
              placeholder="Type something cute and clever..."
              fullWidth
              multiline
              maxRows={4}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  color: '#333',
                  '&::placeholder': {
                    color: '#999',
                  }
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  '&:focus': {
                    outline: 'none',
                  },
                  '&:focus-visible': {
                    outline: 'none',
                  }
                },
                '& textarea': {
                  '&:focus': {
                    outline: 'none !important',
                  },
                  '&:focus-visible': {
                    outline: 'none !important',
                  }
                }
              }}
            />
          </Box>

          <IconButton
            onClick={sendMessage}
            disabled={!userInput.trim()}
            sx={{
              bgcolor: userInput.trim() 
                ? "primary.main"
                : "action.disabledBackground",
              color: "white",
              width: { xs: 44, sm: 52 },
              height: { xs: 44, sm: 52 },
              transition: 'all 0.3s ease',
              boxShadow: userInput.trim() 
                ? '0 4px 12px rgba(124, 58, 237, 0.4)'
                : 'none',
              "&:hover": {
                bgcolor: userInput.trim() 
                  ? "primary.dark"
                  : "action.disabledBackground",
                transform: userInput.trim() ? 'scale(1.05)' : 'none',
                boxShadow: userInput.trim() 
                  ? '0 6px 16px rgba(124, 58, 237, 0.5)'
                  : 'none',
              },
              "&:disabled": {
                color: "white",
              },
              "&:focus": {
                outline: 'none',
              },
              "&:focus-visible": {
                outline: 'none',
              }
            }}
          >
            <SendIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
          </IconButton>
        </Paper>
      </Container>
    </Box>
  );
}

export default Chat;