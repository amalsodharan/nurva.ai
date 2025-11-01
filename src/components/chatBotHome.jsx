import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PublicIcon from '@mui/icons-material/Public';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import appIcon from '../assets/nurva.png';
import { useNavigate } from 'react-router-dom';

export default function ChatbotHome() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Lightning Fast',
      description: 'Get instant, intelligent responses powered by advanced AI algorithms. No waiting, just pure efficiency.'
    },
    {
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      title: 'Personalized Experience',
      description: 'Adaptive conversations that learn from your preferences and provide tailored solutions for your unique needs.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure & Private',
      description: 'Enterprise-grade encryption ensures your conversations remain completely confidential and protected.'
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 40 }} />,
      title: '24/7 Availability',
      description: 'Always ready to assist you, day or night. Your AI companion never sleeps.'
    },
    {
      icon: <PublicIcon sx={{ fontSize: 40 }} />,
      title: 'Multi-Purpose',
      description: 'From work tasks to personal queries, handle everything in one intelligent platform.'
    },
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
      title: 'Smart Insights',
      description: 'Get more than answers - receive actionable insights and recommendations.'
    }
  ];

  const useCases = [
    { title: 'Business & Productivity', desc: 'Streamline workflows, manage tasks, and boost efficiency' },
    { title: 'Content Creation', desc: 'Generate ideas, write content, and brainstorm creatively' },
    { title: 'Learning & Research', desc: 'Get explanations, summaries, and educational support' },
    { title: 'Customer Support', desc: 'Provide instant assistance and resolve queries effectively' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* Navigation */}
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          bgcolor: 'rgba(255, 255, 255, 0.9)', 
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Toolbar sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
            <Box
              sx={{
                width: { xs: 40, sm: 48 },
                height: { xs: 40, sm: 48 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)'
              }}
            >
               <img
                src={appIcon}
                alt="App Logo"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  zIndex: 1,
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                fontWeight: 500,
                background: 'linear-gradient(135deg, #9f59ff 0%, #2196F3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              nurva.ai
            </Typography>
          </Box>

          {!isMobile ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button color="inherit" sx={{ color: 'text.primary', fontWeight: 500 }}>Features</Button>
              <Button color="inherit" sx={{ color: 'text.primary', fontWeight: 500 }}>Use Cases</Button>
              <Button color="inherit" sx={{ color: 'text.primary', fontWeight: 500 }}>About</Button>
              <Button
                variant="contained"
                startIcon={<LoginIcon />}
                onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                }}
                sx={{
                  bgcolor: '#9f59ff',
                  color: 'white',
                  px: 3,
                  py: 1,
                  borderRadius: '50px',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(159, 89, 255, 0.4)',
                  '&:hover': {
                    bgcolor: '#8848e5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(159, 89, 255, 0.5)'
                  }
                }}
              >
                Login
              </Button>
            </Box>
          ) : (
            <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} sx={{ color: 'text.primary' }}>
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <List sx={{ width: 250, pt: 3 }}>
          <ListItem button>
            <ListItemText primary="Features" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Use Cases" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem>
            <Button
              variant="contained"
              fullWidth
              startIcon={<LoginIcon />}
              sx={{
                bgcolor: '#9f59ff',
                color: 'white',
                borderRadius: '50px',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Login
            </Button>
          </ListItem>
        </List>
      </Drawer>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(159, 89, 255, 0.05) 0%, rgba(33, 150, 243, 0.05) 100%)',
          py: { xs: 8, sm: 12, md: 16 },
          px: { xs: 2, sm: 3 }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: { xs: 140, sm: 200, md: 260 },
                height: { xs: 140, sm: 200, md: 260 },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                mb: 6,
                position: 'relative',
                animation: 'float 6s ease-in-out infinite',
                overflow: 'hidden', // ensures logo stays within circle
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                  opacity: 0.5,
                  zIndex: -1,
                },
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-20px)' },
                },
              }}
            >
              <img
                src={appIcon}
                alt="App Logo"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '50%',
                  zIndex: 1,
                }}
              />
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2
              }}
            >
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #9f59ff 0%, #2196F3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Your Intelligent
              </Box>
              <br />
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(135deg, #2196F3 0%, #9f59ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                AI Companion
              </Box>
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                mb: 6,
                maxWidth: '900px',
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                px: 2
              }}
            >
              Experience the future of conversation with <Box component="span" sx={{ fontWeight: 600, color: '#9f59ff' }}>nurva.ai</Box> - 
              a powerful AI-driven chat assistant designed to transform how you work, learn, and create. 
              Fast, personalized, and always secure.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, justifyContent: 'center', px: 2 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ChevronRightIcon />}
                onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                }}
                sx={{
                  bgcolor: '#9f59ff',
                  color: 'white',
                  px: 5,
                  py: 2.5,
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(159, 89, 255, 0.4)',
                  '&:hover': {
                    bgcolor: '#8848e5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(159, 89, 255, 0.5)'
                  }
                }}
              >
                Get Started Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ChatBubbleOutlineIcon />}
                onClick={() => {
                    navigate('/chat');
                    setMobileMenuOpen(false);
                }}
                sx={{
                  borderColor: '#9f59ff',
                  color: '#9f59ff',
                  px: 5,
                  py: 2.5,
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    bgcolor: 'rgba(159, 89, 255, 0.05)',
                    borderColor: '#8848e5'
                  }
                }}
              >
                Try Demo
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 8, sm: 12, md: 16 }, px: { xs: 2, sm: 3 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #9f59ff 0%, #2196F3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Powerful Features
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              Everything you need in an AI assistant, designed for maximum efficiency and ease of use
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{width:'100%' }}>
                <Card
                  sx={{
                    height: '100%',
                    width: '90%',
                    mx: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    background: 'linear-gradient(135deg, #ffffff 0%, rgba(159, 89, 255, 0.03) 100%)',
                    border: '1px solid rgba(159, 89, 255, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 40px rgba(159, 89, 255, 0.2)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #9f59ff 0%, #8848e5 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        color: 'white',
                        boxShadow: '0 8px 16px rgba(159, 89, 255, 0.3)'
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="700" sx={{ mb: 2, color: '#333' }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Use Cases Section */}
      <Box
        sx={{
          py: { xs: 8, sm: 12, md: 16 },
          px: { xs: 2, sm: 3 },
          background: 'linear-gradient(135deg, rgba(159, 89, 255, 0.05) 0%, rgba(33, 150, 243, 0.05) 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(135deg, #9f59ff 0%, #2196F3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Built for Every Need
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', mx: 'auto' }}>
              From professional work to personal projects, nurva.ai adapts to your requirements
            </Typography>
          </Box>

          <Grid container spacing={4} sx={{display:'flex', flexDirection: 'column'}}>
            {useCases.map((useCase, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  sx={{
                    p: 5,
                    borderRadius: 4,
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    borderLeft: '4px solid #9f59ff',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'rgba(159, 89, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <ChevronRightIcon sx={{ color: '#9f59ff' }} />
                    </Box>
                    <Typography variant="h5" fontWeight="700" sx={{ color: '#333' }}>
                      {useCase.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                    {useCase.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: { xs: 8, sm: 12, md: 16 }, px: { xs: 2, sm: 3 }, bgcolor: 'white' }}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: 6,
              textAlign: 'center',
              background: 'linear-gradient(135deg, #9f59ff 0%, #2196F3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Why Choose nurva.ai?
          </Typography>
          <Paper
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(159, 89, 255, 0.05) 0%, rgba(33, 150, 243, 0.05) 100%)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)'
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, lineHeight: 1.8, color: 'text.primary' }}>
              nurva.ai combines cutting-edge artificial intelligence with intuitive design to deliver 
              an unparalleled conversational experience. Whether you're managing complex work tasks, 
              seeking creative inspiration, or simply need a reliable assistant, our AI is here to help.
            </Typography>
            <Typography variant="h6" sx={{ lineHeight: 1.8, color: 'text.primary' }}>
              Built with privacy and security at its core, nurva.ai ensures your conversations remain 
              confidential while providing intelligent, context-aware responses that adapt to your unique needs.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, sm: 12, md: 16 },
          px: { xs: 2, sm: 3 },
          background: 'linear-gradient(135deg, #9f59ff 0%, #2196F3 100%)',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              color: 'white',
              mb: 3
            }}
          >
            Ready to Transform Your Workflow?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 5,
              fontSize: { xs: '1.2rem', sm: '1.5rem' }
            }}
          >
            Join thousands of users already experiencing the future of AI assistance
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ChevronRightIcon />}  
            onClick={() => {
                navigate('/chat');
                setMobileMenuOpen(false);
            }}
            sx={{
              bgcolor: 'white',
              color: '#9f59ff',
              px: 6,
              py: 2.5,
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(255, 255, 255, 0.3)',
              '&:hover': {
                bgcolor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 32px rgba(255, 255, 255, 0.4)'
              }
            }}
          >
            Start Your Journey
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, px: { xs: 2, sm: 3 }, bgcolor: '#1a1a1a', color: 'white', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
          <img
            src={appIcon}
            alt="App Logo"
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              zIndex: 1,
            }}
          />

          </Box>
          <Typography variant="h5" fontWeight="500">
            nurva.ai
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
          Powered by Advanced AI Technology • Available 24/7
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          © 2025 nurva.ai. All rights reserved. | Privacy Policy | Terms of Service
        </Typography>
      </Box>
    </Box>
  );
}