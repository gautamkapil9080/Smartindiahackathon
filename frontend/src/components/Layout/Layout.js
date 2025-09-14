import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { useDispatch } from 'react-redux';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' });
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Rural Healthcare - Nabha
          </Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/symptom-checker')}>Symptom Checker</Button>
          <Button color="inherit" onClick={() => navigate('/medicines')}>Medicines</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{ mt: 3 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;