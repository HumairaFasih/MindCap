import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h6">
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => navigate('/')}
        >
          Home
        </Button>
      </Container>
    </Box>
  );
}

export default PageNotFound;
